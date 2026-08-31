import React from 'react';
import { ArrowRight, Video, Mic, Brain, BarChart, Users, Award, TrendingUp } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="bg-white rounded-2xl shadow-md overflow-hidden mb-12 fade-in">
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About SpeakBetter AI</h1>
            <p className="text-xl opacity-95 leading-relaxed">
              Your personal AI-powered public speaking coach that delivers data-driven feedback to elevate your communication skills
            </p>
          </div>
        </div>
        
        <div className="p-8 md:p-12">
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              SpeakBetter AI was created to democratize access to high-quality public speaking coaching. 
              Our application leverages advanced machine learning to analyze your speech patterns, body language, 
              and presentation style, providing personalized, actionable feedback.
            </p>
            
            <p className="text-gray-700 text-lg leading-relaxed">
              Whether you're preparing for an important presentation, job interview, or simply want to 
              improve your communication skills, SpeakBetter AI provides the insights and guidance you 
              need to speak with confidence and clarity.
            </p>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="bg-white rounded-2xl shadow-md overflow-hidden mb-12 fade-in" style={{animationDelay: "0.2s"}}>
        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
            <TrendingUp className="text-blue-600 mr-3" />
            How It Works
          </h2>
          
          <div className="space-y-8 md:space-y-12">
            <Step 
              number="1" 
              title="Record Your Speech" 
              description="Position yourself in front of your camera and record your speech or presentation in a comfortable environment."
              icon={<Video size={24} />}
            />
            
            <Step 
              number="2" 
              title="AI Analysis" 
              description="Our sophisticated AI analyzes your voice modulation, facial expressions, gestures, and speech content with precision."
              icon={<Brain size={24} />}
            />
            
            <Step 
              number="3" 
              title="Comprehensive Report" 
              description="Receive detailed feedback on your performance with specific, actionable suggestions for immediate improvement."
              icon={<BarChart size={24} />}
            />
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="bg-white rounded-2xl shadow-md overflow-hidden mb-12 fade-in" style={{animationDelay: "0.4s"}}>
        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
            <Award className="text-blue-600 mr-3" />
            Key Features
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Feature 
              title="Speech Analysis" 
              description="Detailed analytics of your pace, tone, volume, and clarity of speech with customized improvement strategies."
              icon={<Mic size={22} />}
            />
            
            <Feature 
              title="Body Language Feedback" 
              description="Comprehensive assessment of your posture, gestures, and facial expressions that impact audience engagement."
              icon={<Users size={22} />}
            />
            
            <Feature 
              title="Content Evaluation" 
              description="In-depth analysis of your message structure, clarity, persuasiveness, and overall impact."
              icon={<Brain size={22} />}
            />
            
            <Feature 
              title="Improvement Tracking" 
              description="Monitor your progress over time with visual representations of your improvement in key speaking areas."
              icon={<BarChart size={22} />}
            />
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="bg-white rounded-2xl shadow-md overflow-hidden mb-12 fade-in" style={{animationDelay: "0.6s"}}>
        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
            <Users className="text-blue-600 mr-3" />
            Our Team
          </h2>
          
          <p className="text-gray-700 text-lg leading-relaxed mb-8 max-w-3xl">
            SpeakBetter AI was developed by a passionate team of enthusiastic students of Information Technology Department , St' Josephs college Of Engineering 
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <TeamMember 
              name="Joshua Moses" 
              role="Founder & AI Lead"
              bio="Speech recognition expert with 10+ years of experience developing cutting-edge AI solutions."
            />
            
            <TeamMember 
              name="Joel" 
              role="Speech Coach"
              bio="Professional public speaking coach with extensive background in communications and performance psychology."
            />
            
            <TeamMember 
              name="Kesavamoorthi" 
              role="UX Designer"
              bio="Dedicated to designing intuitive interfaces for learning and self-improvement with human-centered approaches."
            />

            <TeamMember 
              name="Akash" 
              role="UX Designer"
              bio="Dedicated to designing intuitive interfaces for learning and self-improvement with human-centered approaches."
            />
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-2xl shadow-lg overflow-hidden text-white text-center p-10 fade-in" style={{animationDelay: "0.8s"}}>
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Speaking Skills?</h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Start using SpeakBetter AI today and unlock your full communication potential.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-md"
        >
          Try It Now <ArrowRight className="ml-2 h-5 w-5" />
        </a>
      </section>
    </div>
  );
};

// Helper Components
const Step = ({ number, title, description, icon }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 mr-6">
      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center shadow-sm">
        <div className="text-blue-600">
          {icon}
        </div>
      </div>
    </div>
    <div>
      <h3 className="text-xl font-semibold text-gray-800 flex items-center">
        <span className="text-blue-600 mr-2">{number}.</span> {title}
      </h3>
      <p className="mt-2 text-gray-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

const Feature = ({ title, description, icon }) => (
  <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow bg-white">
    <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4 shadow-sm">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const TeamMember = ({ name, role, bio }) => (
  <div className="border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow bg-white">
    <div className="h-24 w-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center shadow-sm">
      <span className="text-blue-600 text-2xl font-bold">{name.charAt(0)}</span>
    </div>
    <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
    <p className="text-blue-600 font-medium mb-3">{role}</p>
    <p className="text-gray-600">{bio}</p>
  </div>
);

export default About;