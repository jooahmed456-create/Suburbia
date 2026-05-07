import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Message sent! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="bg-brand-gray bg-texture min-h-[80dvh]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <h1 className="font-sans text-3xl md:text-4xl lg:text-5xl text-zinc-800">Get in Touch</h1>
          <p className="mt-4 text-lg font-mono text-zinc-600">
            Have a question? We would love to hear from you. Send us a message and we will respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-zinc-100 space-y-5">
              <div>
                <label className="block text-sm font-mono text-zinc-600 mb-1.5">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border-2 border-zinc-200 rounded-lg font-mono text-sm focus:outline-none focus:border-brand-purple"
                />
              </div>
              <div>
                <label className="block text-sm font-mono text-zinc-600 mb-1.5">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border-2 border-zinc-200 rounded-lg font-mono text-sm focus:outline-none focus:border-brand-purple"
                />
              </div>
              <div>
                <label className="block text-sm font-mono text-zinc-600 mb-1.5">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full px-4 py-3 border-2 border-zinc-200 rounded-lg font-mono text-sm focus:outline-none focus:border-brand-purple"
                />
              </div>
              <div>
                <label className="block text-sm font-mono text-zinc-600 mb-1.5">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-zinc-200 rounded-lg font-mono text-sm focus:outline-none focus:border-brand-purple resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-brand-lime text-zinc-800 rounded-xl font-mono text-sm hover:bg-brand-lime/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-zinc-400/30 border-t-zinc-800 rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-zinc-100">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-purple/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-brand-purple" />
                </div>
                <div>
                  <h3 className="font-sans text-base text-zinc-800">Visit Us</h3>
                  <p className="mt-1 text-sm font-mono text-zinc-600 leading-relaxed">
                    1234 Sport Avenue<br />
                    Portland, OR 97201<br />
                    United States
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-zinc-100">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-lime/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-zinc-800" />
                </div>
                <div>
                  <h3 className="font-sans text-base text-zinc-800">Call Us</h3>
                  <p className="mt-1 text-sm font-mono text-zinc-600">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-zinc-100">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-brand-blue" />
                </div>
                <div>
                  <h3 className="font-sans text-base text-zinc-800">Email Us</h3>
                  <p className="mt-1 text-sm font-mono text-zinc-600">hello@suburbia.com</p>
                  <p className="text-sm font-mono text-zinc-600">support@suburbia.com</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-zinc-100">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <h3 className="font-sans text-base text-zinc-800">Business Hours</h3>
                  <p className="mt-1 text-sm font-mono text-zinc-600">
                    Monday - Friday: 9AM - 6PM PST<br />
                    Saturday: 10AM - 4PM PST<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-brand-navy rounded-xl p-6 text-white">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-brand-lime" />
                </div>
                <div>
                  <h3 className="font-sans text-base text-brand-lime">Live Chat</h3>
                  <p className="mt-1 text-sm font-mono text-white/70">
                    Our AI assistant is available 24/7. Click the chat bubble in the bottom right corner.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
