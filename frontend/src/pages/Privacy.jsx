import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="bg-blue-600 p-8 text-white">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="mt-2 opacity-90">Last Updated: April 1, 2025</p>
        </div>
      </div>
      
      {/* Content */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <Link to="/" className="inline-flex items-center text-blue-600 mb-6 hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          
          <div className="prose max-w-none">
            <section className="mb-8">
              <h2>1. Introduction</h2>
              <p>
                Welcome to SpeakBetter AI. We are committed to protecting your privacy and ensuring 
                the security of your personal information. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our website and services.
              </p>
              <p>
                By using SpeakBetter AI, you agree to the collection and use of information in 
                accordance with this policy. We will not use or share your information with anyone 
                except as described in this Privacy Policy.
              </p>
            </section>
            
            <section className="mb-8">
              <h2>2. Information We Collect</h2>
              <p>We collect several different types of information for various purposes:</p>
              <h3>2.1 Personal Data</h3>
              <p>While using our Service, we may ask you to provide us with certain personally 
              identifiable information that can be used to contact or identify you ("Personal Data"). 
              Personally identifiable information may include, but is not limited to:</p>
              <ul>
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Video and audio recordings of your speeches</li>
                <li>Usage data</li>
              </ul>
              
              <h3>2.2 Usage Data</h3>
              <p>We may also collect information on how the Service is accessed and used ("Usage Data"). 
              This Usage Data may include information such as your computer's Internet Protocol address, 
              browser type, browser version, the pages of our Service that you visit, the time and date 
              of your visit, the time spent on those pages, unique device identifiers, and other diagnostic data.</p>
            </section>
            
            <section className="mb-8">
              <h2>3. Use of Data</h2>
              <p>SpeakBetter AI uses the collected data for various purposes:</p>
              <ul>
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so that we can improve our Service</li>
                <li>To monitor the usage of our Service</li>
                <li>To detect, prevent and address technical issues</li>
                <li>To provide you with personalized feedback on your speeches</li>
                <li>To train and improve our AI models</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2>4. Data Security</h2>
              <p>
                The security of your data is important to us, but remember that no method of transmission 
                over the Internet or method of electronic storage is 100% secure. While we strive to use 
                commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
            </section>
            
            <section className="mb-8">
              <h2>5. Your Data Protection Rights</h2>
              <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
              <ul>
                <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
                <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
                <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
                <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
              </ul>
            </section>
            
            <section>
              <h2>6. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;