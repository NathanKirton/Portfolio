import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PhoneIcon from '../Icons/phone-svgrepo-com.svg?raw';
import EmailIcon from '../Icons/email-1572-svgrepo-com.svg?raw';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // open mail client as a fallback
    const subject = encodeURIComponent(`Contact from ${name || 'Portfolio'}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:nkirton2005@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="relative z-10 py-28 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* LinkedIn Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="relative w-64 h-64">
            <a
              href="https://www.linkedin.com/in/nathan-kirton-473621352/"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <img
                src="/Icons/LinkedIn Image.jpg"
                alt="Nathan Kirton LinkedIn"
                className="w-full h-full object-cover rounded-lg border-4 border-primary shadow-lg group-hover:shadow-2xl transition-all transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 rounded-lg transition-all flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white font-black text-sm">VISIT PROFILE</span>
              </div>
            </a>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-black mb-2">Nathan Kirton</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">Full-Stack Developer | React | Node.js | TypeScript</p>
            <a
              href="https://www.linkedin.com/in/nathan-kirton-473621352/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 font-black rounded hover:shadow-lg transition-all transform hover:-rotate-1"
            >
              <span className="material-symbols-outlined">person_add</span>
              CONNECT ON LINKEDIN
            </a>
          </div>
        </motion.div>

        {/* Contact Form Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-black mb-2">Get in Touch</h1>
          <p className="text-slate-700 dark:text-slate-300 mb-8">Have a project in mind? I'd love to hear about it. Fill out the form below or connect on LinkedIn.</p>
          
          <form className="bg-white dark:bg-neutral-900 border-4 border-black p-8 rounded" onSubmit={handleSubmit}>
            <label className="block mb-4">
              <span className="text-sm font-black uppercase tracking-wider text-white">Full Name</span>
              <input
                type="text"
                className="mt-2 block w-full border-2 border-black/20 dark:border-white/20 p-3 dark:bg-neutral-800 dark:text-white focus:outline-none focus:border-primary transition-colors"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </label>
            
            <label className="block mb-4">
              <span className="text-sm font-black uppercase tracking-wider text-white">Email Address</span>
              <input
                type="email"
                className="mt-2 block w-full border-2 border-black/20 dark:border-white/20 p-3 dark:bg-neutral-800 dark:text-white focus:outline-none focus:border-primary transition-colors"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </label>
            
            <label className="block mb-6">
              <span className="text-sm font-black uppercase tracking-wider text-white">Message</span>
              <textarea
                className="mt-2 block w-full border-2 border-black/20 dark:border-white/20 p-3 h-32 dark:bg-neutral-800 dark:text-white focus:outline-none focus:border-primary transition-colors resize-none"
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
              />
            </label>
            
            <button
              type="submit"
              className="w-full bg-primary text-white px-6 py-4 font-black text-lg rounded hover:shadow-xl transition-all transform hover:-rotate-1 border-2 border-primary"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info Below Form */}
          <div className="mt-8 flex gap-8 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 flex items-center justify-center" style={{ filter: 'brightness(0) invert(1)' }} dangerouslySetInnerHTML={{ __html: PhoneIcon }} />
              <p className="text-xs font-black text-white">+44 7910-744234</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 flex items-center justify-center" style={{ filter: 'brightness(0) invert(1)' }} dangerouslySetInnerHTML={{ __html: EmailIcon }} />
              <p className="text-xs font-black text-white">nkirton2005@gmail.com</p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Contact;
