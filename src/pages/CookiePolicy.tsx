import React from 'react';
import PageTransition from '../components/PageTransition';

const CookiePolicy = () => {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
              <p className="text-gray-300">
                Cookies are small text files that are placed on your computer or mobile device when you visit our website. They help us make the site work better and improve our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Cookies</h2>
              <p className="text-gray-300 mb-4">We use cookies for several purposes, including:</p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Essential cookies for site functionality</li>
                <li>Analytics cookies to understand user behavior</li>
                <li>Authentication cookies to remember your login status</li>
                <li>Preference cookies to remember your settings</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
              <div className="space-y-4 text-gray-300">
                <p><strong className="text-white">Essential Cookies:</strong> Required for basic site functionality</p>
                <p><strong className="text-white">Performance Cookies:</strong> Help us improve site performance</p>
                <p><strong className="text-white">Functionality Cookies:</strong> Remember your preferences</p>
                <p><strong className="text-white">Analytics Cookies:</strong> Track site usage and behavior</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Managing Cookies</h2>
              <p className="text-gray-300">
                Most web browsers allow you to control cookies through their settings. You can usually find these settings in the "options" or "preferences" menu of your browser.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Third-Party Cookies</h2>
              <p className="text-gray-300">
                We may use third-party services that also set cookies. These services include analytics tools and payment processing systems.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Cookie Consent</h2>
              <p className="text-gray-300">
                By using our website, you consent to the use of cookies in accordance with this policy. You can withdraw your consent at any time by adjusting your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Updates to This Policy</h2>
              <p className="text-gray-300">
                We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
              <p className="text-gray-300">
                If you have any questions about our Cookie Policy, please contact us at{' '}
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

export default CookiePolicy;