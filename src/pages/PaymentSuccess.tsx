import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle, Clock, Mail, ExternalLink } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';

const PaymentSuccess = () => {
  const location = useLocation();
  const [email, setEmail] = useState<string>('');
  const [trackingId, setTrackingId] = useState<string>('');

  useEffect(() => {
    // Get email and tracking ID from URL parameters
    const params = new URLSearchParams(location.search);
    setEmail(params.get('email') || '');
    setTrackingId(params.get('tracking_id') || '');
  }, [location]);

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
                <span className="text-white">Payment </span>
                <span className="gradient-text">Successful!</span>
              </motion.h1>

              {/* Message */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-gray-300 mb-12"
              >
                Thank you for your purchase. We're processing your request now.
              </motion.p>

              {/* Details Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-black/20 rounded-xl p-8 mb-8 text-left space-y-6"
              >
                {/* Email */}
                {email && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-[#cc73f8]" />
                      <span className="text-gray-300">Delivery Email</span>
                    </div>
                    <span className="text-white">{email}</span>
                  </div>
                )}

                {/* Tracking ID */}
                {trackingId && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-[#cc73f8]" />
                      <span className="text-gray-300">Tracking ID</span>
                    </div>
                    <span className="text-white font-mono">{trackingId}</span>
                  </div>
                )}
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
                      Check your email for confirmation and tracking details
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#cc73f8]/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#cc73f8] text-sm">2</span>
                    </div>
                    <p className="text-gray-300">
                      We'll start processing your request immediately
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#cc73f8]/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#cc73f8] text-sm">3</span>
                    </div>
                    <p className="text-gray-300">
                      You can track your request status using the tracking ID
                    </p>
                  </div>
                </div>

                {/* Track Status Button */}
                <motion.a
                  href={`/check-status?tracking_id=${trackingId}`}
                  className="btn-primary inline-flex items-center gap-2 mt-8"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Track Your Request</span>
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default PaymentSuccess;