import React, { useState, useEffect } from 'react';
import { PlusCircle, CheckCircle2 } from 'lucide-react';
import { Storage, showToast } from '../utils/storage';

export const ToolSubmissionSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    category: '',
    desc: '',
    pricing: '',
    price: '',
    email: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const { name, url, category, desc, pricing, price, email } = formData;

    if (!name.trim() || !url.trim() || !category || !desc.trim() || !pricing) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    if (!/^https?:\/\/.+/.test(url.trim())) {
      showToast('Please enter a valid URL (starting with http:// or https://)', 'error');
      return;
    }

    Storage.push('toolSubmissions', {
      name: name.trim(),
      url: url.trim(),
      category,
      desc: desc.trim(),
      pricing,
      price: price.trim(),
      email: email.trim(),
      date: new Date().toISOString()
    });

    setIsSuccess(true);
    setFormData({
      name: '',
      url: '',
      category: '',
      desc: '',
      pricing: '',
      price: '',
      email: ''
    });

    showToast('Thank you. Submission received for evaluation.');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).Thakaa = (window as any).Thakaa || {};
      (window as any).Thakaa.submitTool = () => handleSubmit();
    }
  }, [formData]);

  return (
    <section className="submit-section" id="submitSection">
      <div className="container">
        <div className="submit-form">
          <div className="flex items-center gap-2 mb-1">
            <PlusCircle className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Submit Software for Listing</h2>
          </div>
          <p className="text-sm text-secondary mb-6">Submit an AI tool to be reviewed and included in the directory.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="submitName">Tool Name *</label>
                <input
                  type="text"
                  id="submitName"
                  placeholder="e.g., ChatGPT"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="submitUrl">Product URL *</label>
                <input
                  type="url"
                  id="submitUrl"
                  placeholder="https://example.com"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="submitCategory">Category *</label>
              <select
                id="submitCategory"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">Select category...</option>
                <option value="writing">Writing</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="code">Code</option>
                <option value="audio">Audio</option>
                <option value="marketing">Marketing</option>
                <option value="productivity">Productivity</option>
                <option value="business">Business</option>
                <option value="education">Education</option>
                <option value="data">Data</option>
                <option value="design">Design</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="submitDesc">Short Description *</label>
              <textarea
                id="submitDesc"
                placeholder="Brief description of primary functionality and target user group"
                value={formData.desc}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="submitPricing">Pricing Model *</label>
                <select
                  id="submitPricing"
                  value={formData.pricing}
                  onChange={(e) => setFormData({ ...formData, pricing: e.target.value })}
                >
                  <option value="">Select...</option>
                  <option value="free">Free</option>
                  <option value="freemium">Freemium</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="submitPrice">Price Range (e.g., "Free / $20mo")</label>
                <input
                  type="text"
                  id="submitPrice"
                  placeholder="Free / $20mo"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="submitEmail">Contact Email</label>
              <input
                type="email"
                id="submitEmail"
                placeholder="contact@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
              Submit Application
            </button>
          </form>

          <div className={`submit-success ${isSuccess ? 'visible' : ''}`} id="submitSuccess">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <div style={{ fontWeight: 700, marginBottom: '4px' }}>Submission Received</div>
            <div>Your submission will be evaluated by our team within 48 hours.</div>
          </div>
        </div>
      </div>
    </section>
  );
};
