import React, { useRef, useState, useEffect } from 'react';
import MicWave from './MicWave';
import DottedOrb from '../orb/DottedOrb';
import { Video, Mic, StopCircle, Camera, AlertCircle, RefreshCw } from 'lucide-react';

function WebcamRecorder({ setVideoBlob, theme = "dark" }) {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);
  const timerRef = useRef(null);
  const glowRef = useRef(null);

  const [mediaStream, setMediaStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(true);
  const [countdownActive, setCountdownActive] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    let stream;
    const initCamera = async () => {
      setCameraLoading(true);
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setMediaStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsReady(true);
        setPermissionDenied(false);
      } catch (err) {
        console.error('Camera access denied:', err);
        setPermissionDenied(true);
      } finally {
        setCameraLoading(false);
      }
    };

    initCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  useEffect(() => {
    let countdownTimer;
    if (countdownActive && countdown > 0) {
      countdownTimer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdownActive && countdown === 0) {
      setCountdownActive(false);
      startRecordingProcess();
    }
    return () => clearTimeout(countdownTimer);
  }, [countdown, countdownActive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const startRecordingProcess = () => {
    if (!mediaStream) return;

    recordedChunks.current = [];
    const options = { mimeType: 'video/webm' };
    const mediaRecorder = new MediaRecorder(mediaStream, options);

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) recordedChunks.current.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
      setVideoBlob(blob);
    };

    setRecordingTime(0);
    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setIsRecording(true);
  };

  const initiateRecording = () => {
    setCountdown(3);
    setCountdownActive(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const themeClasses = {
    dark: {
      container: "bg-gray-900 text-white",
      videoContainer: "border-gray-700",
      buttonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white",
      buttonStop: "bg-red-600 hover:bg-red-700 text-white",
      recordingIndicator: "bg-red-500 text-white",
      statusText: "text-gray-400",
      permissionError: "bg-gray-800 border-gray-700 text-red-400"
    },
    light: {
      container: "bg-white text-gray-800",
      videoContainer: "border-gray-200",
      buttonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
      buttonStop: "bg-red-500 hover:bg-red-600 text-white",
      recordingIndicator: "bg-red-500 text-white",
      statusText: "text-gray-500",
      permissionError: "bg-red-50 border-red-200 text-red-700"
    }
  };

  const currentTheme = themeClasses[theme] || themeClasses.dark;

  return (
    <div className={`p-6 rounded-xl ${currentTheme.container} shadow-lg`}>
      <div className="flex items-center justify-center mb-4">
        <Camera className="mr-2" size={24} />
        <h2 className="text-xl font-bold">Video Recorder</h2>
      </div>

      {cameraLoading && (
        <div className="flex flex-col items-center justify-center p-8">
          <DottedOrb size={72} speed={2.2} glow="var(--cy)" />
          <p className="mt-3">Getting your camera ready...</p>
        </div>
      )}

      {permissionDenied && (
        <div className={`text-center p-6 rounded-lg border ${currentTheme.permissionError}`}>
          <AlertCircle className="mx-auto mb-2" size={48} />
          <h3 className="font-semibold text-lg">We can't see your camera yet</h3>
          <p className="mt-2">No worries. Allow camera and microphone access in your browser, then try again.</p>
          <button
            onClick={() => window.location.reload()}
            className={`mt-4 ${currentTheme.buttonPrimary} py-2 px-4 rounded-lg`}
          >
            Try again
          </button>
        </div>
      )}

      {!cameraLoading && !permissionDenied && (
        <>
          <div ref={glowRef} className={`rec-glow ${isRecording ? 'on' : ''}`}>
          <div className={`relative rounded-lg overflow-hidden border-4 ${isRecording ? 'border-red-500 pulse-border' : currentTheme.videoContainer}`}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="rounded w-full max-w-xl bg-black"
            />

            {countdownActive && countdown > 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="text-white text-6xl font-bold animate-pulse">
                  {countdown}
                </div>
              </div>
            )}

            {isRecording && (
              <div className={`absolute top-4 right-4 ${currentTheme.recordingIndicator} px-3 py-1 rounded-full flex items-center shadow-lg`}>
                <div className="w-2 h-2 rounded-full bg-white mr-2 animate-pulse"></div>
                {formatTime(recordingTime)}
              </div>
            )}
          </div>
          </div>

          <MicWave stream={mediaStream} recording={isRecording} glowRef={glowRef} />

          <div className="flex justify-center mt-6 space-x-4">
            {!isRecording ? (
              <button
                onClick={initiateRecording}
                disabled={!isReady || countdownActive}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${isReady && !countdownActive ? currentTheme.buttonPrimary : 'bg-gray-400 cursor-not-allowed'}`}
              >
                <Mic size={20} />
                I'm ready
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${currentTheme.buttonStop}`}
              >
                <StopCircle size={20} />
                Finish
              </button>
            )}
          </div>

          <div className={`mt-4 text-sm text-center ${currentTheme.statusText}`}>
            {isRecording ? `Recording ${formatTime(recordingTime)}. You are doing great.` : (isReady ? 'Ready when you are. Take your time.' : 'Getting your camera ready...')}
          </div>
        </>
      )}

      <style jsx>{`
        .pulse-border {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            border-color: rgba(239, 68, 68, 0.7);
          }
          50% {
            border-color: rgba(239, 68, 68, 1);
          }
          100% {
            border-color: rgba(239, 68, 68, 0.7);
          }
        }
      `}</style>
    </div>
  );
}

export default WebcamRecorder;