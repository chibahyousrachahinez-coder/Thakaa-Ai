import React, { useState } from 'react';
import { Shield, FileText, Mail, Info, CheckCircle2, ArrowLeft, Send, Sparkles, Building2, HelpCircle } from 'lucide-react';
import { showToast, Storage } from '../utils/storage';

interface LegalPagesProps {
  type: 'privacy' | 'terms' | 'contact' | 'about';
  onBackHome: () => void;
}

export const LegalPages: React.FC<LegalPagesProps> = ({ type, onBackHome }) => {
  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [category, setCategory] = useState('general');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!contactName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contactEmail || !emailRegex.test(contactEmail.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (!message.trim() || message.trim().length < 10) {
      setErrorMsg('Please enter a detailed message (at least 10 characters).');
      return;
    }

    setIsSubmitting(true);

    try {
      const entry = {
        id: Date.now().toString(),
        name: contactName.trim(),
        email: contactEmail.trim(),
        category,
        message: message.trim(),
        date: new Date().toISOString()
      };

      // Save to localStorage contact messages array
      const raw = localStorage.getItem('contact_messages');
      const list = raw ? JSON.parse(raw) : [];
      list.push(entry);
      localStorage.setItem('contact_messages', JSON.stringify(list));

      // Also record in internal storage utility
      Storage.push('contactSubmissions' as any, entry);

      setIsSubmitting(false);
      setFormSubmitted(true);
      showToast('Thank you! Your message has been received.');
    } catch (err) {
      console.error('Contact submission error:', err);
      setIsSubmitting(false);
      setErrorMsg('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <button
        onClick={onBackHome}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors mb-6"
        aria-label="Back to home page"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Directory
      </button>

      {/* PRIVACY POLICY PAGE */}
      {type === 'privacy' && (
        <article className="prose dark:prose-invert max-w-none rounded-2xl p-6 md:p-10 border border-slate-800 bg-slate-900/40 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-800">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white mb-0">Privacy Policy</h1>
              <p className="text-xs text-slate-400 mt-1">Last Updated: July 2026 • Policy Version 2.1</p>
            </div>
          </div>

          <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-white mb-2">1. Introduction</h2>
              <p>
                At <strong>Thakaa AI Directory</strong> ("we", "our", or "us"), we respect your personal privacy and are committed to protecting the information of visitors utilizing our independent AI tools directory and comparison platform. This Privacy Policy outlines the types of data we collect, how it is processed, and your rights under applicable privacy laws including GDPR and CCPA.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-2">2. Information We Collect</h2>
              <p className="mb-2">We collect minimal data necessary to provide a personalized browsing and discovery experience:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-300">
                <li><strong>Local Storage Preferences:</strong> User settings such as active theme preferences (dark/light mode), bookmarked tools, quiz results, and newsletter prompt dismissal states are saved locally in your web browser.</li>
                <li><strong>Newsletter Subscriptions:</strong> If you voluntarily subscribe to our Weekly Intelligence Brief, we store your email address securely to transmit updates and benchmark reports.</li>
                <li><strong>Contact & Tool Submissions:</strong> Form inputs provided during software submissions or support inquiries.</li>
                <li><strong>Technical & Analytics Data:</strong> Standard server logs including anonymized IP addresses, browser types, operating systems, referring URLs, and pages viewed for security and site optimization.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-2">3. Cookies, Local Storage & Advertising (Google AdSense)</h2>
              <p className="mb-2">
                Our application utilizes standard web storage APIs (localStorage) and cookie technologies.
              </p>
              <p>
                Third-party vendors, including Google AdSense, use cookies to serve ads based on a user's prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.
              </p>
              <p className="mt-2">
                Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Google Ads Settings</a>. Alternatively, you may opt out of third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">aboutads.info</a>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-2">4. Affiliate Links & Financial Disclosure</h2>
              <p>
                Thakaa AI participates in affiliate referral programs with select software vendors. When you click outbound referral links to explore or purchase software listed in our directory, we may receive a commission at no additional cost to you. Affiliate partnerships do not influence our objective benchmark ratings or editorial rankings.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-2">5. Data Retention & Your Rights</h2>
              <p>
                You retain complete control over data stored in your browser. You can clear your browser storage or cookie history at any time to reset your stored bookmarks and preferences. To request deletion of a newsletter email subscription or contact inquiry, please contact us at <span className="font-mono text-blue-400">privacy@thakaa.ai</span>.
              </p>
            </section>
          </div>
        </article>
      )}

      {/* TERMS OF SERVICE PAGE */}
      {type === 'terms' && (
        <article className="prose dark:prose-invert max-w-none rounded-2xl p-6 md:p-10 border border-slate-800 bg-slate-900/40 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-800">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white mb-0">Terms of Service</h1>
              <p className="text-xs text-slate-400 mt-1">Effective Date: July 2026</p>
            </div>
          </div>

          <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-white mb-2">1. Acceptance of Terms</h2>
              <p>
                By accessing and using <strong>Thakaa AI</strong>, you agree to comply with and be bound by these Terms of Service. If you do not agree with any portion of these terms, you should discontinue use of the directory immediately.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-2">2. Directory & Comparison Content Disclaimer</h2>
              <p>
                Thakaa AI provides software listings, feature summaries, pricing estimates, benchmark scores, and user evaluations for informational purposes only. While we make every effort to maintain verified and current data, software pricing and feature specifications are subject to change by third-party vendors without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-2">3. User Submissions & Code of Conduct</h2>
              <p>
                When submitting software products or user reviews to Thakaa AI:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-300">
                <li>You guarantee that all information provided is accurate and non-misleading.</li>
                <li>You agree not to submit malicious code, fraudulent software, or copyrighted materials without authorization.</li>
                <li>We reserve the right to review, edit, or reject any software listing or user comment that fails our quality standards.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-2">4. Intellectual Property</h2>
              <p>
                All editorial articles, benchmark matrices, custom code, graphics, and branding assets on Thakaa AI are protected by copyright laws. Product logos and trademarks belong to their respective corporate owners and are utilized under fair-use commentary guidelines.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-2">5. Limitation of Liability</h2>
              <p>
                Thakaa AI shall not be held liable for any indirect, incidental, or consequential damages arising from the use of third-party AI tools or services discovered through our directory.
              </p>
            </section>
          </div>
        </article>
      )}

      {/* ABOUT US PAGE */}
      {type === 'about' && (
        <article className="rounded-2xl p-6 md:p-10 border border-slate-800 bg-slate-900/40 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white mb-0">About Thakaa AI</h1>
              <p className="text-xs text-slate-400 mt-1">Independent AI Software Benchmark & Directory</p>
            </div>
          </div>

          <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
            <section className="bg-slate-950/50 p-6 rounded-xl border border-slate-800/80">
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400" /> Our Core Mission
              </h2>
              <p>
                Thakaa AI was founded to bring clarity, empirical evaluation, and algorithmic transparency to the rapidly expanding landscape of Artificial Intelligence software. With thousands of new tools launching every month, professionals, developers, and businesses need an objective index to compare models, latency, pricing tiers, and regional dialect capabilities.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                <Building2 className="w-6 h-6 text-blue-400 mb-2" />
                <h3 className="font-bold text-white text-base mb-1">Empirical Testing</h3>
                <p className="text-xs text-slate-400">
                  Every software tool undergoes standardized testing across contextual accuracy, response latency, and pricing clarity.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                <Shield className="w-6 h-6 text-emerald-400 mb-2" />
                <h3 className="font-bold text-white text-base mb-1">Editorial Independence</h3>
                <p className="text-xs text-slate-400">
                  Our evaluation benchmarks remain uninfluenced by sponsorships. Higher ranks are earned through user satisfaction.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                <HelpCircle className="w-6 h-6 text-purple-400 mb-2" />
                <h3 className="font-bold text-white text-base mb-1">Regional Insight</h3>
                <p className="text-xs text-slate-400">
                  We explicitly track Arabic NLP model capabilities and regional language support across global platforms.
                </p>
              </div>
            </div>

            <section>
              <h2 className="text-lg font-bold text-white mb-3">Our Evaluation Methodology</h2>
              <p className="mb-3">
                Our editorial research team evaluates tools across five core pillars:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-slate-300">
                <li><strong>Output Quality & Context Handling:</strong> Evaluating token windows, prompt adherence, and hallucination rates.</li>
                <li><strong>Pricing Transparency:</strong> Verifying free tier limits, hidden subscription clauses, and enterprise API rates.</li>
                <li><strong>API & Developer Readiness:</strong> Checking webhook integrations, SDK maturity, and speed benchmarks.</li>
                <li><strong>Security & Privacy Controls:</strong> Confirming compliance standards (SOC2, GDPR, data retention rules).</li>
                <li><strong>Multilingual Support:</strong> Assessing non-English dialect handling and translation accuracy.</li>
              </ol>
            </section>
          </div>
        </article>
      )}

      {/* CONTACT US PAGE */}
      {type === 'contact' && (
        <article className="rounded-2xl p-8 bg-slate-900 text-white shadow-xl border border-slate-800">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Contact & Support</h1>
              <p className="text-slate-300 text-sm">Have a question? Send us a direct message.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700">
                <h3 className="font-bold text-white text-base mb-2">Direct Communications</h3>
                <p className="text-xs text-slate-300 mb-3">
                  Have a question about a software listing, advertising inquiry, or press question? Send us a direct message.
                </p>
                <div className="space-y-2 text-xs">
                  <div className="text-slate-200">
                    <strong className="text-slate-300">Support Email:</strong><br />
                    <a href="mailto:support@thakaa.ai" className="text-blue-400 hover:underline font-mono">support@thakaa.ai</a>
                  </div>
                  <div className="text-slate-200">
                    <strong className="text-slate-300">Partnership Desk:</strong><br />
                    <a href="mailto:partners@thakaa.ai" className="text-blue-400 hover:underline font-mono">partners@thakaa.ai</a>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-800/40 border border-slate-700/80 text-xs text-slate-300">
                <strong className="text-white block mb-1">Response Time Guarantee:</strong>
                Our team reviews inquiries Monday through Friday and typically responds within 24–48 business hours.
              </div>
            </div>

            <div className="lg:col-span-2">
              {formSubmitted ? (
                <div className="p-8 rounded-2xl bg-slate-800 border border-emerald-500/40 text-center flex flex-col items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-3 animate-bounce" />
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent Successfully!</h3>
                  <p className="text-sm text-slate-300 max-w-md mb-6">
                    Thank you for reaching out to Thakaa AI. Your inquiry has been logged and assigned ticket reference <span className="font-mono text-emerald-400 font-bold">#TK-{Math.floor(1000 + Math.random() * 9000)}</span>.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setContactName('');
                      setContactEmail('');
                      setMessage('');
                    }}
                    className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white mb-1.5">
                        Full Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="John Doe"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white mb-1.5">
                        Email Address <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="john@company.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      disabled={isSubmitting}
                    >
                      <option value="general" className="bg-slate-800 text-white">General Inquiry</option>
                      <option value="listing" className="bg-slate-800 text-white">Software Listing / Update Request</option>
                      <option value="partnership" className="bg-slate-800 text-white">Sponsorship & AdSense Partnership</option>
                      <option value="bug" className="bg-slate-800 text-white">Technical Bug / Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white mb-1.5">
                      Message <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      rows={5}
                      required
                      className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Please describe your question or inquiry in detail..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-xs text-rose-400 font-medium">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30"
                  >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? 'Sending Message...' : 'Submit Inquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </article>
      )}
    </div>
  );
};
