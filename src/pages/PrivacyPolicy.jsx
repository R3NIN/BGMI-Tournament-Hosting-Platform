import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-richblack-800 text-richblack-5">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-base">
              This Privacy Policy describes how BGMI Tournaments collects, uses, and protects your personal information when you use our website and services. By using our services, you consent to the practices described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Personal Information (name, email, phone number)</li>
              <li>Payment Information (for tournament registrations)</li>
              <li>Game-related Information (tournament participation, scores)</li>
              <li>Device Information (browser type, IP address)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>To process tournament registrations and payments</li>
              <li>To communicate with you about tournaments and updates</li>
              <li>To improve our services and user experience</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
            <p className="text-base">
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. We use encryption for sensitive data and follow industry best practices for data security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Third-Party Services</h2>
            <p className="text-base">
              We may use third-party services for payment processing, analytics, and other functions. These services are subject to their own privacy policies, and we ensure they provide adequate data protection.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
            <p className="text-base">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
              <br />
              Email: support@bgmi-tournaments.com
              <br />
              Phone: +91 8898705513
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Changes to This Policy</h2>
            <p className="text-base">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the date of the last update will be indicated at the bottom of the policy.
            </p>
          </section>

          <p className="text-sm mt-8">Last Updated: April 29, 2025</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
