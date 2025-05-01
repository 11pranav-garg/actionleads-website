import React, { useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('https://automate.chillreach.online/webhook/apollo-contact-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setNotification({
        type: 'success',
        message: 'Thank you for your message. We will get back to you soon!'
      });
      
      setTimeout(() => {
        setNotification(null);
      }, 3000);

      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setNotification({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      });
      
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  return (
    <PageTransition>
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="card-base p-8 md:p-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h2 className="text-4xl font-bold mb-4">
                <span className="text-white">Get in </span>
                <span className="gradient-text">Touch</span>
              </h2>
              <p className="text-xl text-gray-300">Let's discuss how we can transform your lead generation</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <h3 className="text-2xl font-semibold mb-6 text-white">Contact Information</h3>
                <div className="space-y-6">
                  <motion.a 
                    href="mailto:support@actionleads.io"
                    className="flex items-center space-x-4 group cursor-pointer"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-3 rounded-lg bg-[#cc73f8]/10 group-hover:bg-[#cc73f8]/20 transition-all duration-300">
                      <Mail className="h-6 w-6 text-[#cc73f8]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-white group-hover:text-[#cc73f8] transition-colors">support@actionleads.io</p>
                    </div>
                  </motion.a>

                  <div className="space-y-3">
                    <motion.a 
                      href="tel:+919267951769"
                      className="flex items-center space-x-4 group cursor-pointer"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-3 rounded-lg bg-[#cc73f8]/10 group-hover:bg-[#cc73f8]/20 transition-all duration-300">
                        <Phone className="h-6 w-6 text-[#cc73f8]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Phone</p>
                        <p className="text-white group-hover:text-[#cc73f8] transition-colors">+91 92679 51769</p>
                      </div>
                    </motion.a>

                    <motion.a 
                      href="tel:+919392274091"
                      className="flex items-center space-x-4 group cursor-pointer"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-3 rounded-lg bg-[#cc73f8]/10 group-hover:bg-[#cc73f8]/20 transition-all duration-300">
                        <Phone className="h-6 w-6 text-[#cc73f8]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Phone</p>
                        <p className="text-white group-hover:text-[#cc73f8] transition-colors">+91 93922 74091</p>
                      </div>
                    </motion.a>
                  </div>
                </div>
              </motion.div>

              <motion.form 
                className="space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                onSubmit={handleSubmit}
              >
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    className="form-input"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  className="btn-primary w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </motion.form>
            </div>
          </motion.div>
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
                <p>{notification.message}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default Contact;