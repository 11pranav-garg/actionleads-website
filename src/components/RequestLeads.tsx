import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LinkIcon, Users, Mail, ArrowRight, AlertCircle, XCircle, ClipboardList, CreditCard, Clock, FileSpreadsheet, Search, ListIcon, DivideIcon as LucideIcon, Info, Key, HelpCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ... (keep all existing interfaces and type definitions)

const RequestLeads = () => {
  // ... (keep all existing state and refs)
  
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email) {
      setEmailError('Email is required');
      return;
    }

    if (activeTab === 'lists' && !formData.credId) {
      setCredIdError('Cred ID is required');
      return;
    }

    if (isValidUrl && isValidEmail && (activeTab === 'search' || isValidCredId)) {
      try {
        const endpoint = activeTab === 'search' 
          ? 'https://automate.chillreach.online/webhook/apollo-request'
          : 'https://automate.chillreach.online/webhook/apollo-request-list';

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            apolloUrl: formData.apolloUrl,
            numberOfLeads: formData.numberOfLeads * 1000, // Convert to actual number of leads
            email: formData.email,
            ...(activeTab === 'lists' && { credId: formData.credId }),
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to submit request');
        }

        // Clear form after successful submission
        setFormData({
          apolloUrl: activeTab === 'search' 
            ? 'https://app.apollo.io/#/people?page=1&contactEmailStatus[]=verified'
            : '',
          numberOfLeads: 1,
          email: '',
          credId: '',
        });

        showNotification('success', 'Request sent successfully! Please check your email.');
      } catch (error) {
        console.error('Error submitting form:', error);
        showNotification('error', 'Failed to submit request. Please try again later.');
      }
    }
  };

  // ... (keep all other existing functions)

  return (
    <div className="w-full pt-24 pb-32">
      {/* ... (keep existing JSX until the end) ... */}

      {/* Add notification popup */}
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
  );
};

export default RequestLeads;