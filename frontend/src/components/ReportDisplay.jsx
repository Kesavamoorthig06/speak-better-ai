import React from 'react';
import { BarChart, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
import { Check, AlertTriangle, Info } from 'lucide-react';

// Helper function to get feedback based on metrics
const getFeedback = (metric, value) => {
  switch (metric) {
    case 'eyeContact':
      if (parseFloat(value) > 80) return { status: 'good', message: 'Excellent eye contact! You appear confident and engaged.' };
      if (parseFloat(value) > 60) return { status: 'average', message: 'Good eye contact. Try to maintain it more consistently.' };
      return { status: 'poor', message: 'Work on improving your eye contact to engage better with your audience.' };
      
    case 'fillerWords':
      if (parseInt(value) < 3) return { status: 'good', message: 'Minimal use of filler words. Your speech sounds clear and purposeful.' };
      if (parseInt(value) < 8) return { status: 'average', message: 'Moderate use of filler words. Try to reduce them for more impact.' };
      return { status: 'poor', message: 'High use of filler words. Practice speaking with more deliberate pauses instead.' };
      
    case 'wpm':
      if (parseInt(value) > 130 && parseInt(value) < 170) return { status: 'good', message: 'Ideal speaking pace that\'s easy to follow.' };
      if (parseInt(value) > 100 && parseInt(value) < 190) return { status: 'average', message: 'Your pace is reasonable but could be optimized for better comprehension.' };
      return { status: 'poor', message: parseInt(value) < 100 ? 'Your speaking pace is a bit slow. Try to be more dynamic.' : 'You\'re speaking too quickly. Slow down for better clarity.' };
      
    default:
      return { status: 'neutral', message: 'No specific feedback available for this metric.' };
  }
};

// Helper function for status icons
const StatusIcon = ({ status }) => {
  switch (status) {
    case 'good':
      return <Check className="text-green-500" />;
    case 'average':
      return <Info className="text-yellow-500" />;
    case 'poor':
      return <AlertTriangle className="text-red-500" />;
    default:
      return <Info className="text-blue-500" />;
  }
};

function ReportDisplay({ report }) {
  // Extract values and prepare for chart
  const eyeContactValue = report["Eye Contact"] ? parseFloat(report["Eye Contact"]) : 0;
  const fillerWordsValue = report["Filler Words"] || 0;
  const wpmValue = report["WPM"] || 0;
  
  // Get feedback
  const eyeContactFeedback = getFeedback('eyeContact', eyeContactValue);
  const fillerWordsFeedback = getFeedback('fillerWords', fillerWordsValue);
  const wpmFeedback = getFeedback('wpm', wpmValue);
  
  // Data for bar chart
  const barData = [
    { name: 'Eye Contact', value: eyeContactValue, fill: '#3b82f6' },
    { name: 'Ideal Speaking Rate', value: wpmValue > 200 ? 200 : wpmValue, fill: '#10b981' },
    { name: 'Filler Words', value: fillerWordsValue * 10, fill: '#ef4444' }  // Multiplied for visibility
  ];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white">Speaking Performance Analysis</h2>
      </div>
      
      {/* Metrics Summary */}
      <div className="grid md:grid-cols-3 gap-6 p-6">
        <MetricCard 
          title="Eye Contact" 
          value={`${eyeContactValue}%`} 
          status={eyeContactFeedback.status}
          message={eyeContactFeedback.message}
          icon={<StatusIcon status={eyeContactFeedback.status} />}
        />
        
        <MetricCard 
          title="Filler Words" 
          value={fillerWordsValue} 
          status={fillerWordsFeedback.status}
          message={fillerWordsFeedback.message}
          icon={<StatusIcon status={fillerWordsFeedback.status} />}
        />
        
        <MetricCard 
          title="Speaking Rate" 
          value={`${wpmValue} WPM`} 
          status={wpmFeedback.status}
          message={wpmFeedback.message}
          icon={<StatusIcon status={wpmFeedback.status} />}
        />
      </div>
      
      {/* Visualization */}
      <div className="p-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Performance Visualization</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value, name) => {
                if (name === 'Filler Words') return [value / 10, name];
                return [value, name];
              }} />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Transcript */}
      <div className="p-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold mb-2">Speech Transcript</h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-40 overflow-y-auto">
          <p className="text-gray-700">{report["Transcript"] || "No transcript available"}</p>
        </div>
      </div>
      
      {/* Recommendations */}
      <div className="p-6 bg-blue-50">
        <h3 className="text-lg font-semibold mb-4">Improvement Recommendations</h3>
        <ul className="space-y-2">
          <RecommendationItem status={eyeContactFeedback.status}>
            {eyeContactFeedback.message}
          </RecommendationItem>
          <RecommendationItem status={fillerWordsFeedback.status}>
            {fillerWordsFeedback.message}
          </RecommendationItem>
          <RecommendationItem status={wpmFeedback.status}>
            {wpmFeedback.message}
          </RecommendationItem>
        </ul>
      </div>
    </div>
  );
}

// Helper components
const MetricCard = ({ title, value, status, message, icon }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'good': return 'bg-green-50 border-green-200';
      case 'average': return 'bg-yellow-50 border-yellow-200';
      case 'poor': return 'bg-red-50 border-red-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };
  
  return (
    <div className={`p-4 rounded-lg border ${getStatusClass(status)}`}>
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-gray-900">{title}</h3>
        {icon}
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className="text-sm mt-2 text-gray-600">{message}</p>
    </div>
  );
};

const RecommendationItem = ({ children, status }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'good': return 'text-green-700 bg-green-100';
      case 'average': return 'text-yellow-700 bg-yellow-100';
      case 'poor': return 'text-red-700 bg-red-100';
      default: return 'text-blue-700 bg-blue-100';
    }
  };
  
  return (
    <li className={`flex items-start p-3 rounded-lg ${getStatusClass(status)}`}>
      <StatusIcon status={status} />
      <span className="ml-2">{children}</span>
    </li>
  );
};

export default ReportDisplay;