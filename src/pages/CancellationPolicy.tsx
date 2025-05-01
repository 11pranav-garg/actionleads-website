import React from 'react';
import PageTransition from '../components/PageTransition';

const CancellationPolicy = () => {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8">Cancellation Policy</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Cancellation Terms</h2>
              <p className="text-gray-300">
                You can cancel your lead request at any time before the data extraction process begins. Once the process has started, cancellations are subject to our refund policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Cancellation Process</h2>
              <p className="text-gray-300 mb-4">To cancel your request:</p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Contact our support team at support@actionleads.io</li>
                <li>Provide your tracking ID and email address</li>
                <li>State your reason for cancellation</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Cancellation Timeline</h2>
              <div className="space-y-4 text-gray-300">
                <p><strong className="text-white">Before Processing:</strong> Full cancellation available with no fees</p>
                <p><strong className="text-white">During Processing:</strong> Partial cancellation may be possible, subject to work completed</p>
                <p><strong className="text-white">After Completion:</strong> Cancellation not available for completed orders</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Automatic Cancellations</h2>
              <p className="text-gray-300">
                Requests may be automatically cancelled if payment is not received within 24 hours of submission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
              <p className="text-gray-300">
                For any questions about our cancellation policy, please contact us at{' '}
                <a href="mailto:support@actionleads.io" className="text-[#cc73f8] hover:text-[#b44fe0] transition-colors">
                  support@actionleads.io
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CancellationPolicy;