import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import contactImage from '../../assets/contactus.png'; // make sure it exists
import NavBar from '../../components/navigationBar';
import Footer from '../../components/footer';

const ContactUs = () => {
  return (
    <>
    <NavBar/>
    <div className="w-full font-sans text-[#1e2b77] bg-white">

      {/* Top Hero Section */}
      <div className="bg-[#e6f2fd] px-6 md:px-24 py-20 grid md:grid-cols-2 items-center gap-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-snug">Contact ZenPath</h1>
          <p className="text-lg text-[#3b4c9a]">
            We're here to support you every step of your mental wellness journey. 
            Reach out for help, partnerships, or just to say hi.
          </p>
        </div>
        <div className="w-full max-w-md mx-auto items-endn">
          <img src={contactImage} alt="Contact ZenPath" className="w-full" />
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="px-6 md:px-24 py-16 bg-white grid md:grid-cols-3 gap-8 text-center">
        {[
          {
            icon: <Mail className="mx-auto mb-2 text-blue-600" size={32} />,
            title: 'Email Us',
            desc: 'support@zenpath.lk',
          },
          {
            icon: <Phone className="mx-auto mb-2 text-blue-600" size={32} />,
            title: 'Call Us',
            desc: '+94 76 123 4567',
          },
          {
            icon: <MapPin className="mx-auto mb-2 text-blue-600" size={32} />,
            title: 'Visit Us',
            desc: 'Colombo 01, Sri Lanka',
          },
        ].map((item, i) => (
          <div
            key={i}
            className="border p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-[#f8fbff]"
          >
            {item.icon}
            <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
            <p className="text-gray-700">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Contact Form */}
      <div className="bg-[#f3f7ff] px-6 md:px-24 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
          <p className="text-lg text-[#3a4b99] mb-12">
            Fill in the form below and we’ll get back to you as soon as possible.
          </p>
          <form className="space-y-6 text-left">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-blue-300 resize-none"
            ></textarea>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Social Media & Follow Section */}
      <div className="bg-white px-6 md:px-24 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Follow ZenPath</h2>
        <p className="text-lg text-[#3a4b99] mb-6 max-w-2xl mx-auto">
          Join our community for updates, mental health tips, and support.
        </p>
        <div className="flex justify-center gap-6 text-blue-600 text-2xl">
          <a href="#" target="_blank" aria-label="Facebook" className="hover:text-indigo-600 transition"><Facebook /></a>
          <a href="#" target="_blank" aria-label="Instagram" className="hover:text-indigo-600 transition"><Instagram /></a>
          <a href="#" target="_blank" aria-label="LinkedIn" className="hover:text-indigo-600 transition"><Linkedin /></a>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ContactUs;