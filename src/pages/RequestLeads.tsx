import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LinkIcon, Users, Mail, ArrowRight, AlertCircle, XCircle, ClipboardList, CreditCard, Clock, FileSpreadsheet, Search, ListIcon, DivideIcon as LucideIcon, Info, Key, HelpCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type TabType = 'search' | 'lists';

interface TabContent {
  title: string;
  description: string;
  Icon: LucideIcon;
  submitUrl: string;
  maxLeads: number;
  pricePerLead: number;
  steps: {
    icon: LucideIcon;
    title: string;
    description: string | JSX.Element;
  }[];
}

interface FormData {
  apolloUrl: string;
  numberOfLeads: number;
  email: string;
  credId?: string;
}

const RequestLeads = () => {
  const [activeTab, setActiveTab] = useState<TabType>('search');
  const [formData, setFormData] = useState<FormData>({
    apolloUrl: 'https://app.apollo.io/#/people?page=1&contactEmailStatus[]=verified',
    numberOfLeads: 1,
    email: '',
    credId: '',
  });
  const [urlError, setUrlError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [credIdError, setCredIdError] = useState<string | null>(null);
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidCredId, setIsValidCredId] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const rangeRef = useRef<HTMLInputElement>(null);

  const tabContent: Record<TabType, TabContent> = {
    search: {
      title: 'Get Leads from Search',
      description: 'Use Apollo.io search filters to find and extract your target audience.',
      Icon: Search,
      submitUrl: '/api/request-search-leads',
      maxLeads: 50,
      pricePerLead: 3,
      steps: [
        {
          icon: Search,
          title: 'Set up search filters',
          description: 'Use Apollo.io search filters to define your target audience and copy the search URL.',
        },
        {
          icon: CreditCard,
          title: 'Make payment',
          description: 'Complete the payment process through our secure payment gateway.',
        },
        {
          icon: Clock,
          title: 'Receive leads',
          description: 'Your leads will be delivered to your email within 24 hours.',
        },
      ]
    },
    lists: {
      title: 'Get Leads from Lists',
      description: 'Extract leads from your saved Apollo.io lists quickly and efficiently.',
      Icon: FileSpreadsheet,
      submitUrl: '/api/request-list-leads',
      maxLeads: 10,
      pricePerLead: 3,
      steps: [
        {
          icon: ListIcon,
          title: 'Prepare Apollo List',
          description: 'Go to Apollo.io, select your list and copy the list URL.',
        },
        {
          icon: Key,
          title: 'Get Cred ID',
          description: (
            <div className="space-y-3">
              <p>Follow these steps to get your Cred ID:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Go to apollo.io and ensure you're logged into the account you want to extract leads from</li>
                <li>
                  Install the ActionLeads Extension from:
                  <a 
                    href="https://chromewebstore.google.com/detail/actionleads-extension/aefdbjdfoocpodoakekjilemfanocfko"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-1 text-[#cc73f8] hover:underline"
                  >
                    Chrome Web Store
                  </a>
                </li>
                <li>Open a new tab and run the extension</li>
                <li>Click the "Start" button and copy the ID it returns</li>
              </ol>
              <p className="text-sm text-gray-400">Note: Installing the extension is a one-time task</p>
            </div>
          ),
        },
        {
          icon: CreditCard,
          title: 'Complete Payment',
          description: 'Fill out the form, make the payment, and wait for your data.',
        }
      ]
    }
  };

  useEffect(() => {
    const updateRangeProgress = () => {
      const range = rangeRef.current;
      if (range) {
        const min = 1;
        const max = tabContent[activeTab].maxLeads;
        const progress = ((formData.numberOfLeads - min) / (max - min)) * 100;
        range.style.setProperty('--range-progress', `${progress}%`);
      }
    };

    updateRangeProgress();

    return () => {
      if (rangeRef.current) {
        rangeRef.current.style.removeProperty('--range-progress');
      }
    };
  }, [formData.numberOfLeads, activeTab]);

  useEffect(() => {
    const maxLeads = tabContent[activeTab].maxLeads;
    if (formData.numberOfLeads > maxLeads) {
      setFormData(prev => ({ ...prev, numberOfLeads: maxLeads }));
    }
  }, [activeTab]);

  useEffect(() => {
    if (formData.apolloUrl) {
      try {
        const url = new URL(formData.apolloUrl);
        
        if (url.hash.startsWith('#/companies')) {
          setUrlError('We only support Apollo People search URLs. Company search is not supported.');
          setIsValidUrl(false);
          return;
        }

        if (activeTab === 'search') {
          if (url.hash.startsWith('#/people')) {
            const searchParams = new URLSearchParams(url.hash.split('?')[1]);
            const hasContactLabelIds = searchParams.has('contactLabelIds[]');
            const hasProspectedParam = searchParams.has('prospectedByCurrentTeam[]');

            if (hasContactLabelIds || hasProspectedParam) {
              setShowPopup(true);
              setTimeout(() => {
                setActiveTab('lists');
                setShowPopup(false);
              }, 3000);
              return;
            }

            const prospectedParam = searchParams.get('prospectedByCurrentTeam[]');
            if (prospectedParam === 'yes' || prospectedParam === 'no') {
              setUrlError(
                <div className="space-y-3">
                  <p>The URL might be on "net new" or "saved" tab, so make sure you copy it from the total tab.</p>
                  <img src="/src/pages/total.gif" alt="How to select total tab" className="rounded-lg border border-white/10" />
                </div>
              );
              setIsValidUrl(false);
            } else {
              setUrlError(null);
              setIsValidUrl(true);
            }
          } else {
            setUrlError('Please enter a valid Apollo People search URL');
            setIsValidUrl(false);
          }
        } 
        else {
          if (!url.hash.startsWith('#/people')) {
            setUrlError('Please enter a valid Apollo People URL');
            setIsValidUrl(false);
          } else {
            setUrlError(null);
            setIsValidUrl(true);
          }
        }
      } catch {
        setUrlError('Please enter a valid Apollo URL');
        setIsValidUrl(false);
      }
    }
  }, [activeTab, formData.apolloUrl]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      setIsValidEmail(false);
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      setIsValidEmail(false);
    } else {
      setEmailError(null);
      setIsValidEmail(true);
    }
  };

  useEffect(() => {
    validateEmail(formData.email);
  }, [formData.email]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const validateCredId = (credId: string) => {
    if (activeTab === 'lists') {
      if (!credId) {
        setCredIdError('Cred ID is required');
        setIsValidCredId(false);
      } else if (credId.length < 5) {
        setCredIdError('Invalid Cred ID format');
        setIsValidCredId(false);
      } else {
        setCredIdError(null);
        setIsValidCredId(true);
      }
    }
  };

  useEffect(() => {
    if (activeTab === 'lists') {
      validateCredId(formData.credId);
    }
  }, [formData.credId, activeTab]);

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

    const isFormValid = isValidUrl && isValidEmail && 
      (activeTab === 'search' || (activeTab === 'lists' && isValidCredId));

    if (isFormValid) {
      try {
        const endpoint = activeTab === 'search' 
          ? 'https://automate.chillreach.online/webhook/apollo-request'
          : 'https://automate.chillreach.online/webhook/apollo-request-list';

        const requestBody = {
          apolloUrl: formData.apolloUrl,
          numberOfLeads: formData.numberOfLeads * 1000,
          email: formData.email,
          ...(activeTab === 'lists' && { credId: formData.credId }),
        };

        console.log('Sending request to:', endpoint);
        console.log('Request body:', requestBody);

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error('Failed to submit request');
        }

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
    } else {
      if (activeTab === 'lists' && !isValidCredId) {
        showNotification('error', 'Please provide a valid Cred ID');
      } else {
        showNotification('error', 'Please fill in all required fields correctly');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'numberOfLeads') {
      const numValue = parseInt(value);
      const maxLeads = tabContent[activeTab].maxLeads;
      setFormData(prev => ({
        ...prev,
        [name]: Math.min(numValue, maxLeads)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleTabChange = (tab: TabType) => {
    if (tab === activeTab) return;
    
    setActiveTab(tab);
    setFormData({
      apolloUrl: tab === 'search' 
        ? 'https://app.apollo.io/#/people?page=1&contactEmailStatus[]=verified'
        : '',
      numberOfLeads: 1,
      email: '',
      credId: '',
    });
    setUrlError(null);
    setEmailError(null);
    setCredIdError(null);
    setIsValidUrl(true);
    setIsValidEmail(false);
    setIsValidCredId(false);
  };

  const ActiveIcon = tabContent[activeTab].Icon;
  const maxLeads = tabContent[activeTab].maxLeads;
  const pricePerLead = tabContent[activeTab].pricePerLead;
  const totalPrice = formData.numberOfLeads * pricePerLead;

  return (
    <div className="w-full pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-gradient-to-r from-[#cc73f8] to-[#b44fe0] text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
              <Info className="h-5 w-5" />
              <p>It looks like you want to use your account's leads. Use the "Get Leads with Lists" form instead.</p>
            </div>
          </motion.div>
        )}

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            <span className="text-white">Request Your </span>
            <span className="gradient-text">Leads</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Choose your preferred method to get started
          </p>
        </div>

        <div className="flex justify-center mb-16">
          <div className="inline-flex p-1 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10">
            {(['search', 'lists'] as const).map((tab) => (
              <motion.button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`relative px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#cc73f8] to-[#b44fe0] rounded-lg"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  {tab === 'search' ? <Search className="h-4 w-4" /> : <FileSpreadsheet className="h-4 w-4" />}
                  {tab === 'search' ? 'Get Leads' : 'Get Leads with Lists'}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-[#cc73f8]/10 mb-6">
            <ActiveIcon className="h-8 w-8 text-[#cc73f8]" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">{tabContent[activeTab].title}</h3>
          <p className="text-gray-300 max-w-2xl mx-auto">{tabContent[activeTab].description}</p>
        </motion.div>

        <div className="flex flex-col-reverse lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <div className="sticky top-24">
              <h3 className="text-2xl font-bold text-white mb-8 lg:text-left text-center">How it works</h3>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {tabContent[activeTab].steps.map((step, index) => (
                  <div key={index} className="relative">
                    {index < tabContent[activeTab].steps.length - 1 && (
                      <div className="absolute left-8 top-16 h-12 w-0.5 bg-gradient-to-b from-[#cc73f8]/20 to-[#cc73f8]/5" />
                    )}
                    
                    <div className="card-hover p-6 flex items-start gap-6">
                      <div className="relative">
                        <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-[#cc73f8] flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <div className="p-4 rounded-xl bg-[#cc73f8]/10">
                          <step.icon className="h-6 w-6 text-[#cc73f8]" />
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">{step.title}</h4>
                        <div className="text-gray-300">{step.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <motion.div 
              className="bg-black/40 backdrop-blur-lg rounded-[2rem] border border-white/10 p-8 md:p-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="apolloUrl" className="block text-lg font-medium text-white mb-3">
                        Apollo {activeTab === 'search' ? 'Search' : 'List'} URL
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <LinkIcon className="h-5 w-5 text-[#cc73f8]" />
                        </div>
                        <input
                          type="url"
                          id="apolloUrl"
                          name="apolloUrl"
                          value={formData.apolloUrl}
                          onChange={handleChange}
                          placeholder={activeTab === 'search' 
                            ? "https://app.apollo.io/#/people?page=1&contactEmailStatus[]=verified"
                            : "https://app.apollo.io/#/people?page=1&contactEmailStatus[]=verified"
                          }
                          className={`form-input pl-11 ${urlError ? 'border-red-500 focus:ring-red-500' : ''}`}
                          required
                        />
                      </div>
                      {urlError ? (
                        <div className="mt-2 text-sm text-red-400">
                          <div className="flex items-center">
                            <XCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                            {typeof urlError === 'string' ? urlError : urlError.props.children[0]}
                          </div>
                          {typeof urlError !== 'string' && urlError.props.children[1]}
                        </div>
                      ) : (
                        <p className="mt-2 text-sm text-gray-400 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {activeTab === 'search'
                            ? 'Use Apollo filters to refine your search and paste the URL here'
                            : 'Copy and paste the URL of your Apollo list'
                          }
                        </p>
                      )}
                    </div>

                    {activeTab === 'lists' && (
                      <div className="relative">
                        <label htmlFor="credId" className="block text-lg font-medium text-white mb-3">
                          Cred ID <span className="text-[#cc73f8]">*</span>
                          <div className="group inline-block relative ml-2">
                            <HelpCircle className="h-4 w-4 text-[#cc73f8] inline cursor-help" />
                            <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 absolute left-0 mt-2 w-80 p-4 rounded-xl bg-black/90 backdrop-blur-sm border border-[#cc73f8]/20 text-sm text-gray-300 z-50 shadow-xl">
                              <div className="space-y-3">
                                <p className="font-semibold text-white">How to get your Cred ID:</p>
                                <ol className="list-decimal list-inside space-y-2">
                                  <li>Go to apollo.io and ensure you're logged into the account you want to extract leads from</li>
                                  <li>Install the ActionLeads Extension from:
                                    <a 
                                      href="https://chromewebstore.google.com/detail/actionleads-extension/aefdbjdfoocpodoakekjilemfanocfko"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="block mt-1 text-[#cc73f8] hover:underline truncate"
                                    >
                                      Chrome Web Store
                                    </a>
                                  </li>
                                  <li>Open a new tab and run the extension</li>
                                  <li>Click the "Start" button</li>
                                  <li>Copy the value it returns</li>
                                </ol>
                                <p className="text-xs text-gray-400 mt-2">Note: Installing the extension is a one-time task</p>
                              </div>
                              <div className="absolute left-4 -top-2 w-3 h-3 bg-black/90 border-l border-t border-[#cc73f8]/20 transform rotate-45"></div>
                            </div>
                          </div>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Key className="h-5 w-5 text-[#cc73f8]" />
                          </div>
                          <input
                            type="text"
                            id="credId"
                            name="credId"
                            value={formData.credId}
                            onChange={handleChange}
                            placeholder="Enter your Cred ID"
                            className={`form-input pl-11 ${credIdError ? 'border-red-500 focus:ring-red-500' : ''}`}
                            required
                            aria-required="true"
                          />
                        </div>
                        {credIdError && (
                          <div className="mt-2 text-sm text-red-400 flex items-center">
                            <XCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                            <span>{credIdError}</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div>
                      <label htmlFor="numberOfLeads" className="block text-lg font-medium text-white mb-3">
                        Number of Leads
                      </label>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-[#cc73f8]">
                            {formData.numberOfLeads}k
                          </span>
                          <span className="text-gray-400">leads</span>
                        </div>
                        <input
                          ref={rangeRef}
                          type="range"
                          id="numberOfLeads"
                          name="numberOfLeads"
                          value={formData.numberOfLeads}
                          onChange={handleChange}
                          min="1"
                          max={maxLeads}
                          step="1"
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-400">
                          <span>1k leads</span>
                          <span>{maxLeads}k leads</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-lg font-medium text-white mb-3">
                        Your Email <span className="text-[#cc73f8]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-[#cc73f8]" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className={`form-input pl-11 ${emailError ? 'border-red-500 focus:ring-red-500' : ''}`}
                          required
                          aria-required="true"
                        />
                      </div>
                      {emailError ? (
                        <div className="mt-2 text-sm text-red-400 flex items-center">
                          <XCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                          <span>{emailError}</span>
                        </div>
                      ) : (
                        <p className="mt-2 text-sm text-gray-400">
                          We'll send the payment link and {activeTab === 'search' ? 'delivery details' : 'your list data'} to this email
                        </p>
                      )}
                    </div>

                    <div className="bg-black/20 rounded-xl p-6">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Price</span>
                        <span className="text-2xl font-bold text-[#cc73f8]">
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="flex flex-col sm:flex-row gap-4">
                  {isValidUrl && (
                    <motion.button
                      type="submit"
                      className={`btn-primary flex-1 ${!isValidEmail ? 'opacity-50 cursor-not-allowed' : ''}`}
                      whileHover={isValidEmail ? { scale: 1.02 } : {}}
                      whileTap={isValidEmail ? { scale: 0.98 } : {}}
                      disabled={!isValidEmail}
                    >
                      <span className="flex items-center justify-center gap-2">
                        Request Leads
                        <ArrowRight className="h-5 w-5" />
                      </span>
                    </motion.button>
                  )}
                  <Link to="/pricing" className="btn-secondary text-center">
                    View Pricing
                  </Link>
                </div>
              </form>
            </motion.div>
          </div>
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
  );
};

export default RequestLeads;