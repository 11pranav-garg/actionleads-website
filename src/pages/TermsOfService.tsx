import React from 'react';
import PageTransition from '../components/PageTransition';

const TermsOfService = () => {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-300">
                By accessing or using ActionLeads services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
              <p className="text-gray-300">
                ActionLeads provides lead generation services using Apollo.io data. We help users extract and process business contact information through our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
              <p className="text-gray-300 mb-4">You agree to:</p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Provide accurate information when using our services</li>
                <li>Use the service in compliance with all applicable laws</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Not misuse or attempt to manipulate our services</li>
                <li>Respect the intellectual property rights of others</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Payment Terms</h2>
              <p className="text-gray-300">
                All payments are processed securely through our payment providers. Refunds are handled on a case-by-case basis according to our refund policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
              <p className="text-gray-300">
                ActionLeads is not liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Changes to Terms</h2>
              <p className="text-gray-300">
                We reserve the right to modify these terms at any time. Continued use of our services after such modifications constitutes acceptance of the updated terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Governing Law</h2>
              <p className="text-gray-300">
                These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in India.
              </p>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default TermsOfService;