import React, { useState, useCallback } from 'react';
import { ClipboardList, AlertCircle, XCircle, CheckCircle, Loader2, ArrowRight, Clock, Cog, Link as LinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';

type RequestStatus = 'in queue' | 'in progress' | 'failed' | 'completed';

interface RequestDetails {
  trackingId: string;
  email: string;
  apolloUrl: string;
  numberOfLeads: number;
  date: string;
  status: RequestStatus;
  downloadUrl?: string;
  filename?: string;
}

const statusConfig: Record<RequestStatus, { color: string; icon: React.ReactNode }> = {
  'in queue': {
    color: 'yellow',
    icon: <Clock className="h-5 w-5" />,
  },
  'in progress': {
    color: 'blue',
    icon: <Cog className="h-5 w-5 animate-spin" />,
  },
  'failed': {
    color: 'red',
    icon: <XCircle className="h-5 w-5" />,
  },
  'completed': {
    color: 'green',
    icon: <CheckCircle className="h-5 w-5" />,
  },
};

const CheckStatus = () => {
  const [trackingId, setTrackingId] = useState('');
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [trackingRequest, setTrackingRequest] = useState<RequestDetails | null>(null);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const showNotification = useCallback((type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }, []);

  const handleCheckStatus = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      showNotification('error', 'Please enter a tracking ID');
      return;
    }

    if (isCheckingStatus) return; // Prevent multiple simultaneous requests

    setIsCheckingStatus(true);
    try {
      const response = await fetch('https://automate.chillreach.online/webhook/check-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ trackingId: trackingId.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to check status');
      }

      const data = await response.json();
      setTrackingRequest(data);
      
      if (data.status === 'completed') {
        showNotification('success', 'Your request has been completed!');
      } else if (data.status === 'failed') {
        showNotification('error', 'Your request has failed. Please try again.');
      }
    } catch (error) {
      console.error('Error checking status:', error);
      showNotification('error', 'Failed to check request status');
    } finally {
      setIsCheckingStatus(false);
    }
  }, [trackingId, isCheckingStatus, showNotification]);

  const getStatusColor = useCallback((status: RequestStatus) => {
    const config = statusConfig[status];
    return {
      bg: `bg-${config.color}-500/20`,
      text: `text-${config.color}-400`,
      icon: config.icon,
    };
  }, []);

  const RequestDetailsCard = useCallback(({ request }: { request: RequestDetails }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/20 rounded-xl p-6 space-y-4"
    >
      <div className="flex items-center justify-between">
        <span className="text-gray-300">Email</span>
        <span className="text-white">{request.email}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-300">Apollo URL</span>
        <a
          href={request.apolloUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#cc73f8] hover:text-[#b44fe0] transition-colors flex items-center gap-1"
        >
          View URL
          <LinkIcon className="h-4 w-4" />
        </a>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-300">Date</span>
        <span className="text-white">{new Date(request.date).toLocaleDateString()}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-300">Leads</span>
        <span className="text-white">{request.numberOfLeads.toLocaleString()}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-300">Status</span>
        <div className="flex items-center gap-2">
          {statusConfig[request.status].icon}
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            getStatusColor(request.status).bg
          } ${getStatusColor(request.status).text}`}>
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
          </span>
        </div>
      </div>
      {request.status === 'completed' && (
        <div className="flex flex-col space-y-4">
          {request.filename && (
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Filename</span>
              <span className="text-white">{request.filename}</span>
            </div>
          )}
          {request.downloadUrl && (
            <div className="flex justify-end">
              <a
                href={request.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#cc73f8] hover:text-[#b44fe0] transition-colors flex items-center gap-1"
              >
                Download Results
                <LinkIcon className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      )}
    </motion.div>
  ), [getStatusColor]);

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="text-white">Check Request </span>
              <span className="gradient-text">Status</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Track the progress of your lead request using your tracking ID
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <form onSubmit={handleCheckStatus} className="space-y-8">
                <div className="bg-black/40 backdrop-blur-lg rounded-[2rem] border border-white/10 p-8 md:p-12">
                  <h3 className="text-2xl font-bold mb-6">Check by Tracking ID</h3>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="trackingId" className="block text-lg font-medium text-white mb-3">
                        Tracking ID
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <ClipboardList className="h-5 w-5 text-[#cc73f8]" />
                        </div>
                        <input
                          type="text"
                          id="trackingId"
                          value={trackingId}
                          onChange={(e) => setTrackingId(e.target.value)}
                          placeholder="Enter your tracking ID"
                          className="form-input pl-11"
                          required
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-400 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        You can find the tracking ID in the email we sent you
                      </p>
                    </div>

                    {trackingRequest && <RequestDetailsCard request={trackingRequest} />}

                    <motion.button
                      type="submit"
                      className="btn-primary w-full"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isCheckingStatus}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {isCheckingStatus ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Checking Status...
                          </>
                        ) : (
                          <>
                            Check Status
                            <ArrowRight className="h-5 w-5" />
                          </>
                        )}
                      </span>
                    </motion.button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
            >
              <div className={`flex items-center gap-2 px-6 py-3 rounded-lg shadow-lg ${
                notification.type === 'success' 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                  : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
              }`}>
                {notification.type === 'success' ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <XCircle className="h-5 w-5" />
                )}
                <p>{notification.message}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default CheckStatus;