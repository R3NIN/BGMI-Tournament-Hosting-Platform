import React from 'react';
import { Link } from 'react-router-dom';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-richblack-800 text-richblack-5">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-base">
              This Cookie Policy explains how BGMI Tournaments uses cookies and similar technologies to enhance your experience on our website. By using our website, you consent to our use of cookies as described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. What are Cookies?</h2>
            <p className="text-base">
              Cookies are small text files that are stored on your device when you visit a website. They help us remember your preferences, improve website functionality, and analyze how our website is used.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly. They enable basic features like page navigation and access to secure areas.
              </li>
              <li>
                <strong>Performance Cookies:</strong> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
              </li>
              <li>
                <strong>Functionality Cookies:</strong> These cookies enable the website to remember your preferences (e.g., language, region) to provide a more personalized experience.
              </li>
              <li>
                <strong>Targeting Cookies:</strong> These cookies may be used to deliver advertisements that are more relevant to you and your interests.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Managing Cookies</h2>
            <p className="text-base">
              Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Most browsers allow you to block, delete, or disable cookies</li>
              <li>You can set your browser to notify you before accepting cookies</li>
              <li>You can clear cookies from your browser</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Third-Party Cookies</h2>
            <p className="text-base">
              Our website may use third-party services that set their own cookies. These cookies are subject to their own privacy policies. We use third-party cookies for:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Analytics and tracking services</li>
              <li>Payment processing services</li>
              <li>Social media sharing features</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Changes to This Policy</h2>
            <p className="text-base">
              We may update this Cookie Policy from time to time. Any changes will be posted on this page, and the date of the last update will be indicated at the bottom of the policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
            <p className="text-base">
              If you have any questions about this Cookie Policy or our use of cookies, please contact us at:
              <br />
              Email: support@bgmi-tournaments.com
              <br />
              Phone: +91 8898705513
            </p>
          </section>

          <p className="text-sm mt-8">Last Updated: April 29, 2025</p>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
