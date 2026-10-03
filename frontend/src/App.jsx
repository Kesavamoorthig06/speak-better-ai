import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebcamRecorder from './components/recorder/WebcamRecorder';
import UploadForm from './components/UploadForm';
import ReportDisplay from './components/ReportDisplay';
import Layout from './components/Layout';
import LandingHero from './components/LandingHero';
import DottedOrb from './components/orb/DottedOrb';
import About from './pages/About';
import Tutorials from './pages/Tutorials';
import Settings from './pages/Settings';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import './App.css';

function HomePage() {
  const [videoBlob, setVideoBlob] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [report, setReport] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [started, setStarted] = useState(false);

  const handleRecordingComplete = (blob) => {
    if (blob) {
      setVideoBlob(blob);
      setAudioBlob(blob);
      setActiveStep(2);
    }
  };

  const handleReportGenerated = (reportData) => {
    setReport(reportData);
    setActiveStep(3);
    setIsProcessing(false);
  };

  const startNewSession = () => {
    setVideoBlob(null);
    setAudioBlob(null);
    setReport(null);
    setActiveStep(1);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 p-6 text-white">
        <h1 className="text-3xl font-bold">SpeakBetter AI</h1>
        <p className="mt-2 opacity-90">Your friendly public speaking coach</p>
        <DottedOrb size={84} className="header-orb" />
      </div>

      {/* Progress Steps */}
      {(started || activeStep > 1) && (
      <div className="flex justify-center p-4 border-b">
        <div className="flex items-center">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <div 
                className={`rounded-full h-10 w-10 flex items-center justify-center ${
                  activeStep >= step 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div 
                  className={`w-16 h-1 ${
                    activeStep > step ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      )}

      <div className="p-6">
        {/* Landing */}
        {activeStep === 1 && !started && <LandingHero onStart={() => setStarted(true)} />}

        {/* Step 1: Record */}
        {activeStep === 1 && started && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Record Your <span className="pill">Speech</span></h2>
              <p className="text-gray-600 mt-2">Take a breath, look at the camera, and speak the way you normally would.</p>
            </div>
            <WebcamRecorder setVideoBlob={handleRecordingComplete} />
          </div>
        )}

        {/* Step 2: Upload */}
        {activeStep === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Generate Your <span className="pill">Report</span></h2>
              <p className="text-gray-600 mt-2">Nicely done. Let's see how it went.</p>
            </div>
            <UploadForm 
              videoBlob={videoBlob} 
              audioBlob={audioBlob}
              setReport={handleReportGenerated}
              setIsProcessing={setIsProcessing}
            />
            {isProcessing && (
              <div className="text-center py-8">
                <div className="flex justify-center"><DottedOrb size={72} speed={2.2} glow="var(--cy)" /></div>
                <p className="mt-4 text-gray-600">Listening carefully to your speech... this takes a moment.</p>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Report */}
        {activeStep === 3 && report && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Your Speaking <span className="pill">Analysis</span></h2>
              <p className="text-gray-600 mt-2">Here is what we noticed, with a few gentle tips.</p>
            </div>
            <ReportDisplay report={report} />
            <div className="text-center mt-8">
              <button 
                onClick={startNewSession}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Practice again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;