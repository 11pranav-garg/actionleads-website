import React from 'react';
import { Link } from 'react-router-dom';
import { Database, Target, Zap, BarChart, Users, Shield, DollarSign } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const Home = () => {
  return (
    <PageTransition>
      <div className="w-full">
        {/* Hero Section */}
        <section className="min-h-screen relative flex items-center">
          <div className="relative max-w-7xl mx-auto px-6 py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                animate="show"
                variants={staggerContainer}
              >
                <motion.h1 variants={fadeInUp} className="text-6xl font-bold mb-6 tracking-tight">
                  <span className="text-white">Apollo Data</span>
                  <br />
                  <span className="gradient-text">Made Affordable</span>
                  <br />
                  <span className="text-white">For Everyone</span>
                </motion.h1>
                <motion.p variants={fadeInUp} className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Get high-quality Apollo data at a fraction of the cost. Access millions of verified business contacts and company information without breaking the bank.
                </motion.p>
                <motion.div variants={fadeInUp} className="flex space-x-4">
                  <Link to="/request-leads" className="btn-primary">
                    Request Leads
                  </Link>
                  <Link to="/pricing" className="btn-secondary">
                    Compare Pricing
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="card-hover p-8">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { icon: DollarSign, label: 'Cost Savings', value: '80%' },
                      { icon: Users, label: 'Contacts', value: '200M+' },
                      { icon: Database, label: 'Companies', value: '60M+' },
                      { icon: BarChart, label: 'Success Rate', value: '99%' }
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                        className="card-hover p-6 text-center"
                      >
                        <div className="feature-icon-wrapper mx-auto w-fit">
                          <stat.icon className="h-8 w-8 text-[#cc73f8] feature-icon" />
                        </div>
                        <div className="text-2xl font-bold mb-1 text-white">{stat.value}</div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl font-bold mb-6">
                <span className="text-white">Why Choose </span>
                <span className="gradient-text">ActionLeads</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Get all the benefits of Apollo's extensive database at a price that makes sense for your business.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: DollarSign,
                  title: 'Cost-Effective',
                  description: 'Access Apollo data at up to 80% less than standard pricing, making enterprise-grade data accessible to businesses of all sizes.'
                },
                {
                  icon: Zap,
                  title: 'Fast Delivery',
                  description: 'Get your data within minutes of your request, with our high-performance scraping infrastructure.'
                },
                {
                  icon: Target,
                  title: 'Custom Filters',
                  description: 'Use the same powerful Apollo filters to target exactly the leads you need for your business.'
                },
                {
                  icon: Shield,
                  title: 'Quality Assured',
                  description: 'Every record is verified and matched against Apollo\'s database for maximum accuracy.'
                },
                {
                  icon: Users,
                  title: 'Complete Profiles',
                  description: 'Get full contact information, including email, phone, job title, and social profiles.'
                },
                {
                  icon: BarChart,
                  title: 'Flexible Plans',
                  description: 'Choose from various packages or request custom volumes to match your exact needs.'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="card-hover p-8 group"
                >
                  <div className="feature-icon-wrapper">
                    <feature.icon className="h-12 w-12 text-[#cc73f8] feature-icon" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Home;