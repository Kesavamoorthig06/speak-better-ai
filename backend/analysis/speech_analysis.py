import speech_recognition as sr
from pydub import AudioSegment
import librosa
import numpy as np
import os

def analyze_speech(audio_path, provided_transcript=None):
    recognizer = sr.Recognizer()
    temp_audio = "temp.wav"
    
    # Convert input to WAV
    try:
        audio = AudioSegment.from_file(audio_path)
        audio.export(temp_audio, format="wav")
    except Exception as e:
        return {
            "error": f"Audio conversion failed: {str(e)}",
            "transcript": "",
            "filler_count": 0,
            "words_per_minute": 0
        }

    # Use provided transcript or perform STT
    if provided_transcript:
        text = provided_transcript.strip()
    else:
        try:
            with sr.AudioFile(temp_audio) as source:
                audio_data = recognizer.record(source)
                text = recognizer.recognize_google(audio_data)
        except sr.UnknownValueError:
            text = ""
        except sr.RequestError:
            text = "[Error: Could not connect to Google STT]"
        except Exception as e:
            text = f"[Transcription Error: {str(e)}]"

    # Filler words count
    filler_words = ["um", "uh", "like", "you know"]
    words = text.lower().split()
    filler_count = sum(words.count(w) for w in filler_words)

    # Duration & Words per Minute
    try:
        y, sr_val = librosa.load(temp_audio, sr=None)
        if y.size == 0 or not np.any(y):
            raise ValueError("Empty audio signal detected.")
        duration = librosa.get_duration(y=y, sr=sr_val)
    except Exception as e:
        os.remove(temp_audio)
        return {
            "error": f"Audio processing error: {str(e)}",
            "transcript": text,
            "filler_count": filler_count,
            "words_per_minute": 0
        }

    os.remove(temp_audio)

    wpm = round((len(words) / duration) * 60, 2) if duration > 0 else 0

    return {
        "transcript": text,
        "filler_count": filler_count,
        "words_per_minute": wpm
    }
