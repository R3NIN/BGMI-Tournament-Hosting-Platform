import React from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-white">Terms and Conditions</h1>
        <p className="text-white">Last Updated: April 29, 2025</p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">1. Acceptance of Terms</h2>
          <p className="text-white">
            By accessing or using the BGMI Tournament Hosting Platform ("Service"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">2. User Eligibility</h2>
          <p className="text-white">
            You must be at least 13 years old to use our Service. By using the Service, you represent that you are of legal age to form a binding contract.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">3. Account Registration</h2>
          <p className="text-white">
            To use certain features of the Service, you may need to create an account. You agree to provide accurate and complete information during the registration process and to update this information as needed.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">4. Tournament Rules</h2>
          <ul className="list-disc list-inside text-white space-y-2">
            <li>Tournament Participation: All participants must comply with official BGMI game rules and regulations.</li>
            <li>Sportsmanship: Players must maintain good sportsmanship and respect other participants.</li>
            <li>Cheating: Any form of cheating, including but not limited to hacks, cheats, or exploits, is strictly prohibited.</li>
            <li>Eligibility: Tournament organizers must ensure all participants meet the eligibility criteria specified in their tournament rules.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">5. Payments and Fees</h2>
          <ul className="list-disc list-inside text-white space-y-2">
            <li>Tournament Fees: Tournament organizers may charge entry fees as specified in their tournament rules.</li>
            <li>Payment Processing: We use secure payment processing systems to handle all financial transactions.</li>
            <li>Refunds: Refunds will be processed according to our refund policy and the specific tournament rules.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">6. Intellectual Property</h2>
          <p className="text-white">
            All content, trademarks, and intellectual property rights in the Service belong to BGMI Tournament Hosting Platform or its licensors. You may not use our intellectual property without prior written permission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">7. Disclaimer of Warranties</h2>
          <p className="text-white">
            The Service is provided "as is" without warranty of any kind, express or implied. We do not guarantee continuous, uninterrupted access to the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">8. Limitation of Liability</h2>
          <p className="text-white">
            In no event shall BGMI Tournament Hosting Platform be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">9. Modifications to Terms</h2>
          <p className="text-white">
            We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on this page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">10. Termination</h2>
          <p className="text-white">
            We reserve the right to terminate or suspend your access to the Service at any time, with or without cause, and without prior notice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">11. Governing Law</h2>
          <p className="text-white">
            These Terms and Conditions shall be governed by and construed in accordance with the laws of [Your Jurisdiction].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">12. Contact Information</h2>
          <p className="text-white">
            If you have any questions about these Terms and Conditions, please contact us at [Your Contact Information].
          </p>
        </section>
      </div>

      <div className="mt-8">
        <Link to="/" className="text-blue-500 hover:text-blue-700">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Terms;
