import React, { useState } from 'react';
import axios from 'axios';

function UploadForm({ videoBlob, audioBlob, setReport, setIsProcessing }) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    setIsProcessing(true);
    setError(null);
    setUploadProgress(0);

    try {
      if (!videoBlob || !audioBlob) {
        setError("Please record both video and audio before analyzing.");
        setIsProcessing(false);
        return;
      }

      const formData = new FormData();
      formData.append('video', videoBlob, 'recording.webm');
      formData.append('audio', audioBlob, 'audio.webm');

      const res = await axios.post('http://127.0.0.1:8000/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });

      console.log("✅ Real Report from Backend:", res.data.report);
      setReport(res.data.report);
    } catch (err) {
      console.error("❌ Upload/Analysis failed:", err);
      setError("Something went wrong while processing your speech. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const renderVideoPreview = () => {
    if (!videoBlob) return null;
    const videoUrl = URL.createObjectURL(videoBlob);
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Preview:</h3>
        <video 
          src={videoUrl} 
          controls 
          className="w-full rounded-lg shadow-sm border border-gray-200"
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {renderVideoPreview()}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={handleGenerate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all"
        >
          Analyze My Speech
        </button>
      </div>

      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-200" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">{uploadProgress}% uploaded</p>
        </div>
      )}
    </div>
  );
}

export default UploadForm;
