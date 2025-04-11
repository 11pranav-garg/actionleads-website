import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Mail, Users, Link as LinkIcon, ArrowRight, CheckCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';

interface LocationState {
  apolloUrl: string;
  numberOfLeads: number;
  email: string;
}

const ThankYou = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  if (!state) {
    // Redirect to home if accessed directly without state
    window.location.href = '/';
    return null;
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-32 flex items-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-[2rem] border border-white/10 p-12 text-center relative overflow-hidden"
          >
            {/* Background Effects */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#cc73f8]/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#b44fe0]/10 rounded-full blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative">
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-20 h-20 rounded-full bg-[#cc73f8]/20 flex items-center justify-center mx-auto mb-8"
              >
                <CheckCircle className="w-12 h-12 text-[#cc73f8]" />
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold mb-6"
              >
                <span className="text-white">Request </span>
                <span className="gradient-text">Received!</span>
              </motion.h1>

              {/* Message */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-gray-300 mb-12"
              >
                Please check your email to complete the payment and start your request.
              </motion.p>

              {/* Details Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-black/20 rounded-xl p-8 mb-8 text-left space-y-6"
              >
                {/* Apollo URL */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <LinkIcon className="w-5 h-5 text-[#cc73f8]" />
                    <span className="text-gray-300">Apollo URL</span>
                  </div>
                  <a 
                    href={state.apolloUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#cc73f8] hover:text-[#b44fe0] transition-colors truncate max-w-sm"
                  >
                    {state.apolloUrl}
                  </a>
                </div>

                {/* Number of Leads */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-[#cc73f8]" />
                    <span className="text-gray-300">Number of Leads</span>
                  </div>
                  <span className="text-white">{state.numberOfLeads}k</span>
                </div>

                {/* Email */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#cc73f8]" />
                    <span className="text-gray-300">Email</span>
                  </div>
                  <span className="text-white">{state.email}</span>
                </div>
              </motion.div>

              {/* Next Steps */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-white">Next Steps</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#cc73f8]/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#cc73f8] text-sm">1</span>
                    </div>
                    <p className="text-gray-300">
                      Check your email for payment instructions
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#cc73f8]/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#cc73f8] text-sm">2</span>
                    </div>
                    <p className="text-gray-300">
                      Complete the payment to start the lead extraction process
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#cc73f8]/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#cc73f8] text-sm">3</span>
                    </div>
                    <p className="text-gray-300">
                      Once payment is confirmed, we'll begin processing your request
                    </p>
                  </div>
                </div>

                {/* Back to Home Button */}
                <Link
                  to="/"
                  className="btn-primary inline-flex items-center gap-2 mt-8"
                >
                  <span>Back to Home</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ThankYou;