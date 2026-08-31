import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="bg-blue-600 p-8 text-white">
          <h1 className="text-3xl font-bold">Terms of Service</h1>
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
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using SpeakBetter AI ("the Service"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </section>
            
            <section className="mb-8">
              <h2>2. Use License</h2>
              <p>
                Permission is granted to temporarily use the Service for personal, educational, or commercial purposes, subject to the following restrictions:
              </p>
              <ol>
                <li>The Service may not be used for any illegal purpose or in any manner that could damage, disable, overburden, or impair the Service.</li>
                <li>You may not attempt to gain unauthorized access to any portion of the Service, other accounts, computer systems, or networks connected to the Service.</li>
                <li>You may not reproduce, duplicate, copy, sell, resell, or exploit any portion of the Service without express written permission.</li>
                <li>Your use of the Service must comply with all applicable laws and regulations.</li>
              </ol>
            </section>
            
            <section className="mb-8">
              <h2>3. User Content</h2>
              <p>
                By submitting content to the Service (including video and audio recordings), you grant SpeakBetter AI a worldwide, non-exclusive, royalty-free license to use, reproduce, adapt, publish, and distribute your content for the purpose of providing and improving the Service.
              </p>
              <p>
                You represent and warrant that you own or have the necessary rights to the content you submit, and that the content does not infringe upon the rights of any third party.
              </p>
            </section>
            
            <section className="mb-8">
              <h2>4. Service Modifications</h2>
              <p>
                SpeakBetter AI reserves the right to modify or discontinue, temporarily or permanently, the Service with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the Service.
              </p>
            </section>
            
            <section className="mb-8">
              <h2>5. Accounts</h2>
              <p>
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
              </p>
              <p>
                You are responsible for safeguarding the password you use to access the Service and for any activities or actions under your password. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>
            </section>
            
            <section className="mb-8">
              <h2>6. Disclaimer</h2>
              <p>
                The Service is provided on an "AS IS" and "AS AVAILABLE" basis. SpeakBetter AI makes no warranties, expressed or implied, regarding the operation of the Service or the information, content, materials, or products included.
              </p>
              <p>
                SpeakBetter AI does not warrant that the Service will be uninterrupted or error-free, that defects will be corrected, or that the Service or the server that makes it available are free of viruses or other harmful components.
              </p>
            </section>
            
            <section className="mb-8">
              <h2>7. Limitation of Liability</h2>
              <p>
                SpeakBetter AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Service.
              </p>
            </section>
            
            <section>
              <h2>8. Changes to Terms</h2>
              <p>
                SpeakBetter AI reserves the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page.
                Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;