import React, { useState, useRef, useEffect } from 'react';
import { DollarSign, Users, Calculator, Check, Zap, Shield, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';

const Pricing = () => {
  const [leads, setLeads] = useState(1);
  const pricePerThousand = 3;
  const totalPrice = leads * pricePerThousand;
  const rangeRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const updateRangeProgress = () => {
    const range = rangeRef.current;
    if (range) {
      const min = 1;
      const max = 50;
      const progress = ((leads - min) / (max - min)) * 100;
      range.style.setProperty('--range-progress', `${progress}%`);
    }
  };

  useEffect(() => {
    updateRangeProgress();
  }, [leads]);

  const handleLeadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLeads(Number(event.target.value));
  };

  const handleGetLeads = () => {
    navigate('/request-leads', { state: { initialLeads: leads } });
  };

  return (
    <PageTransition>
      <div className="pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="text-white">Simple </span>
              <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Transparent pricing with no hidden fees. Pay only for the leads you need.
            </p>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#cc73f8]/10 rounded-full blur-3xl transform -translate-y-1/2" />
              <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-[#b44fe0]/10 rounded-full blur-3xl transform -translate-y-1/2" />
            </div>

            <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-[2.5rem] border border-white/10 p-12 overflow-hidden">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#cc73f8]/5 to-transparent" />
              
              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <motion.div 
                    className="inline-flex items-center justify-center p-4 rounded-2xl bg-[#cc73f8]/10"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Calculator className="h-8 w-8 text-[#cc73f8]" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white">Calculate Your Price</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Move the slider to calculate the exact price for your desired number of leads. 
                    Our transparent pricing ensures you know exactly what you're paying for.
                  </p>

                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-3">
                        <label className="text-lg text-white">Number of Leads</label>
                        <span className="text-xl font-bold text-[#cc73f8]">{leads}k</span>
                      </div>
                      <input
                        ref={rangeRef}
                        type="range"
                        min="1"
                        max="50"
                        value={leads}
                        onChange={handleLeadChange}
                        className="w-full"
                      />
                      <div className="flex justify-between mt-2">
                        <span className="text-sm text-gray-400">1k leads</span>
                        <span className="text-sm text-gray-400">50k leads</span>
                      </div>
                    </div>

                    <motion.div 
                      className="bg-black/20 rounded-2xl p-6 space-y-4"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Price per 1k leads</span>
                        <span className="text-white font-semibold">${pricePerThousand}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Number of leads</span>
                        <span className="text-white font-semibold">{leads}k</span>
                      </div>
                      <div className="border-t border-white/10 pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-lg text-white">Total Price</span>
                          <span className="text-3xl font-bold text-[#cc73f8]">${totalPrice}</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="lg:pl-8">
                  <motion.div 
                    className="bg-gradient-to-br from-[#cc73f8]/20 to-[#b44fe0]/20 rounded-2xl p-8 border border-white/10"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="space-y-6">
                      <div className="inline-flex items-center space-x-2">
                        <DollarSign className="h-6 w-6 text-[#cc73f8]" />
                        <span className="text-2xl font-bold text-white">${pricePerThousand} per 1k leads</span>
                      </div>
                      <p className="text-gray-300">Everything you need to supercharge your lead generation:</p>
                      
                      <div className="space-y-4">
                        {[
                          { icon: Check, text: 'Verified email addresses' },
                          { icon: Shield, text: 'Complete contact information' },
                          { icon: Database, text: 'Company details included' },
                          { icon: Zap, text: 'Regular data updates' },
                          { icon: Users, text: 'Export in any format' }
                        ].map((feature, index) => (
                          <motion.div 
                            key={index} 
                            className="flex items-center space-x-3 text-gray-300"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <feature.icon className="h-5 w-5 text-[#cc73f8]" />
                            <span>{feature.text}</span>
                          </motion.div>
                        ))}
                      </div>

                      <motion.button 
                        onClick={handleGetLeads}
                        className="btn-primary w-full mt-8"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <Users className="h-5 w-5" />
                          <span>Get {leads}k Leads Now</span>
                        </div>
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Pricing;