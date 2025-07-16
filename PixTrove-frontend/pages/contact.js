import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the form to an API or email service
  }

  return (
    <>
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 pt-16">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="max-w-lg text-lg mb-8 text-gray-300 text-center">
          We'd love to hear from you! For support, feedback, or partnership inquiries, fill out the form below.
        </p>
        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-lg p-6 shadow-lg max-w-md w-full flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={4}
            required
          />
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded transition">
            Send Message
          </button>
          {submitted && <div className="text-green-400 text-center mt-2">Thank you! We'll get back to you soon.</div>}
        </form>
      </main>

    </>
  );
}
