import React from 'react';
import { PlayCircle, Book, FileText, ArrowRight } from 'lucide-react';
import '../styles/tutorials.css'; // Import the CSS file

const Tutorials = () => {
  return (
    <div className="tutorials-container">
      {/* Hero Section */}
      <div className="hero-section animated-item delay-1">
        <div className="p-10 text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Speech Tutorials</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Learn how to become a better public speaker with our expert guides and tutorials
          </p>
        </div>
      </div>
      
      {/* Featured Tutorial */}
      <div className="featured-tutorial mt-8 mb-8 animated-item delay-2">
        <div className="md:flex">
          <div className="md:w-1/3 icon-container">
            <PlayCircle size={60} className="text-blue-600" />
          </div>
          <div className="p-6 md:w-2/3">
            <span className="inline-block bg-blue-100 text-blue-600 px-2 py-1 text-xs font-semibold rounded-full mb-2">
              FEATURED
            </span>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Mastering Your Speaking Voice</h2>
            <p className="text-gray-600 mb-4">
              Learn techniques to project confidence, clarity, and authority in your speaking voice.
              This comprehensive guide covers pitch, tone, volume, and how to avoid common vocal issues.
            </p>
            <a 
              href="#" 
              className="link-primary"
            >
              Watch Tutorial <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Tutorial Categories */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <CategoryCard 
          title="Voice & Delivery" 
          description="Master your voice projection, pace, and tone" 
          count={8}
          icon={<FileText className="text-blue-600" />}
          delay="delay-3"
        />
        
        <CategoryCard 
          title="Body Language" 
          description="Learn effective gestures and posture techniques" 
          count={6}
          icon={<FileText className="text-blue-600" />}
          delay="delay-4"
        />
        
        <CategoryCard 
          title="Content Structure" 
          description="Craft compelling stories and arguments" 
          count={5}
          icon={<FileText className="text-blue-600" />}
          delay="delay-5"
        />
      </div>
      
      {/* Tutorial List */}
      <div className="tutorials-list mb-8 bg-white animated-item delay-3">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Tutorials</h2>
          
          <div className="space-y-0">
            {[
              {
                title: "Eliminating Filler Words",
                description: "Learn how to reduce 'um', 'uh', and other filler words from your speech",
                duration: "12 min",
                level: "Beginner"
              },
              {
                title: "Eye Contact Techniques",
                description: "Master the art of engaging your audience with effective eye contact",
                duration: "15 min",
                level: "Intermediate"
              },
              {
                title: "Storytelling in Presentations",
                description: "Use narrative techniques to make your presentations more compelling",
                duration: "20 min",
                level: "Advanced"
              },
              {
                title: "Handling Q&A Sessions",
                description: "Prepare for and confidently manage audience questions",
                duration: "18 min",
                level: "Intermediate"
              },
              {
                title: "Managing Speech Anxiety",
                description: "Practical techniques to overcome nervousness before and during speeches",
                duration: "25 min",
                level: "Beginner"
              }
            ].map((tutorial, index) => (
              <TutorialItem key={index} {...tutorial} />
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <button className="btn-primary">
              Load More Tutorials
            </button>
          </div>
        </div>
      </div>
      
      {/* Testimonial */}
      <div className="testimonial mb-8 animated-item delay-4">
        <div className="testimonial-content max-w-2xl mx-auto text-center">
          <p className="text-xl italic text-gray-700 mb-6">
            "These tutorials transformed my public speaking skills. I went from nervous and unsure to confident and engaging in just a few months."
          </p>
          <p className="font-semibold text-gray-800">Sarah Johnson</p>
          <p className="text-gray-600">Marketing Director</p>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const CategoryCard = ({ title, description, count, icon, delay }) => (
  <div className={`category-card animated-item ${delay}`}>
    <div className="p-6">
      <div className="icon-wrapper">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{count} tutorials</span>
        <a href="#" className="link-primary text-sm">View All</a>
      </div>
    </div>
  </div>
);

const TutorialItem = ({ title, description, duration, level }) => (
  <div className="tutorial-item px-4">
    <div className="md:flex md:justify-between md:items-start">
      <div className="mb-2 md:mb-0">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="tutorial-meta md:ml-4 md:flex-shrink-0">
        <div className="text-sm text-gray-500 flex items-center">
          <Book className="inline h-4 w-4 mr-1" />
          {duration}
        </div>
        <div className={`tutorial-level ${
          level === 'Beginner' ? 'level-beginner' :
          level === 'Intermediate' ? 'level-intermediate' :
          'level-advanced'
        }`}>
          {level}
        </div>
        <a 
          href="#" 
          className="link-primary text-sm"
        >
          Watch <ArrowRight className="ml-1 h-4 w-4" />
        </a>
      </div>
    </div>
  </div>
);

export default Tutorials;