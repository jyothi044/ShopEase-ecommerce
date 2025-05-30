import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import { validateEmail } from '../utils/validation';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setErrors({
        submit: 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-gray-600 mb-8">
            Have questions about our products or services? We're here to help!
            Reach out to us using any of the following methods or fill out the
            contact form.
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <Mail className="h-6 w-6 text-indigo-600 mt-1" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Email</h3>
                <p className="text-gray-600">support@shopease.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="h-6 w-6 text-indigo-600 mt-1" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
                <p className="text-sm text-gray-500">Mon-Fri 9am-6pm EST</p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-indigo-600 mt-1" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Address</h3>
                <p className="text-gray-600">
                  123 Commerce Street<br />
                  Suite 100<br />
                  New York, NY 10001
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-sm">
          {submitSuccess ? (
            <div className="text-center py-12">
              <div className="mb-4 text-green-600">
                <svg
                  className="h-16 w-16 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Message Sent!
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for contacting us. We'll get back to you shortly.
              </p>
              <Button
                onClick={() => setSubmitSuccess(false)}
                variant="outline"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormInput
                id="name"
                label="Your Name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
              />

              <FormInput
                id="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
              />

              <FormInput
                id="subject"
                label="Subject"
                value={formData.subject}
                onChange={handleChange}
                error={errors.subject}
                required
              />

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  required
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              {errors.submit && (
                <div className="text-red-500 text-sm">{errors.submit}</div>
              )}

              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;