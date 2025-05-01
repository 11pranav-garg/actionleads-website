import React from 'react';
import PageTransition from '../components/PageTransition';

const RefundPolicy = () => {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Refund Eligibility</h2>
              <p className="text-gray-300">
                We offer refunds in specific circumstances where our service does not meet the agreed-upon deliverables or quality standards.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Refund Conditions</h2>
              <p className="text-gray-300 mb-4">Refunds may be issued in the following cases:</p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Technical issues preventing data delivery</li>
                <li>Significant discrepancy in lead quality or quantity</li>
                <li>Service unavailability or extended delays</li>
                <li>Duplicate charges or billing errors</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Refund Process</h2>
              <div className="space-y-4 text-gray-300">
                <p><strong className="text-white">Request Timeline:</strong> Submit refund requests within 7 days of delivery</p>
                <p><strong className="text-white">Documentation:</strong> Provide order details and reason for refund</p>
                <p><strong className="text-white">Processing Time:</strong> Refunds are processed within 5-7 business days</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Non-Refundable Cases</h2>
              <p className="text-gray-300 mb-4">Refunds are not available for:</p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Requests cancelled after data extraction has begun</li>
                <li>Changes in business requirements after order placement</li>
                <li>Issues arising from incorrect information provided</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
              <p className="text-gray-300">
                For refund requests or questions about our refund policy, please contact us at{' '}
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

export default RefundPolicy;