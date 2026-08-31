from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import shutil
import os

from pydub import AudioSegment
import speech_recognition as sr

# Import your analysis modules
from analysis.eye_contact import analyze_eye_contact
from analysis.speech_analysis import analyze_speech
from analysis.report_generator import generate_report

app = FastAPI()

# ---------- CORS SETUP ----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- CREATE UPLOAD DIRECTORY ----------
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# ---------- ROUTE 1: File Upload ----------
@app.post("/upload/")
async def upload_files(video: UploadFile = File(...), audio: UploadFile = File(...)):
    try:
        video_path = os.path.join(UPLOAD_DIR, video.filename)
        audio_path = os.path.join(UPLOAD_DIR, audio.filename)
        wav_path = os.path.join(UPLOAD_DIR, "converted_audio.wav")

        # Save the video file
        with open(video_path, "wb") as vf:
            shutil.copyfileobj(video.file, vf)

        # Save the audio file
        with open(audio_path, "wb") as af:
            shutil.copyfileobj(audio.file, af)

        # ✅ Convert webm audio to wav
        try:
            audio_segment = AudioSegment.from_file(audio_path, format="webm")
            audio_segment.export(wav_path, format="wav")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Audio conversion failed: {e}")

        # ✅ Speech transcription using wav
        transcript = ""
        try:
            recognizer = sr.Recognizer()
            with sr.AudioFile(wav_path) as source:
                audio_data = recognizer.record(source)
                transcript = recognizer.recognize_google(audio_data)
        except Exception as e:
            print("⚠️ Speech recognition error:", e)

        # Analyze both files
        eye_data = analyze_eye_contact(video_path)
        speech_data = analyze_speech(wav_path)  # If this uses audio.wav

        # You can inject the transcript into the final report if needed
        if "transcript" in speech_data:
            speech_data["transcript"] = transcript
        else:
            speech_data.update({"transcript": transcript})

        # Generate report
        report = generate_report(eye_data, speech_data)

        return {"report": report}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process files: {e}")
