"use client";
import Link from "next/link";
import { useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaPaperPlane,
  FaHeart,
} from "react-icons/fa";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const Footer = () => {
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    setContactForm({ name: "", email: "", message: "" });
    
    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const quickLinks = [
    { title: "About Us", href: "/about" },
    { title: "Contact", href: "/contact" },
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
    { title: "FAQ", href: "/faq" },
    { title: "Support", href: "/support" },
  ];

  const categories = [
    { title: "Electronics", href: "/category/electronics" },
    { title: "Fashion", href: "/category/fashion" },
    { title: "Home & Living", href: "/category/home" },
    { title: "Gaming", href: "/category/gaming" },
    { title: "Books", href: "/category/books" },
    { title: "Health & Beauty", href: "/category/health" },
  ];

  const customerService = [
    { title: "Shipping Info", href: "/shipping" },
    { title: "Returns", href: "/returns" },
    { title: "Size Guide", href: "/size-guide" },
    { title: "Track Your Order", href: "/track" },
    { title: "Gift Cards", href: "/gift-cards" },
    { title: "Wishlist", href: "/wishlist" },
  ];

  return (
    <footer className="bg-black text-white border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Company Info & Contact Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Logo & Description */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-2xl">
                    <span className="text-black font-bold text-xl">E</span>
                  </div>
                  <div className="absolute -inset-1 bg-white rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
                </div>
                <h2 className="text-2xl font-bold text-white transform group-hover:scale-105 transition-transform duration-300">
                  E-Commerce
                </h2>
              </div>
              
              <p className="text-gray-300 leading-relaxed max-w-md">
                Discover amazing products at unbeatable prices. We're committed to providing you with the best shopping experience with quality products and exceptional customer service.
              </p>

              {/* Contact Information */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300">
                  <FaMapMarkerAlt className="w-5 h-5" />
                  <span>123 Commerce Street, Business District, City 12345</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300">
                  <FaPhone className="w-5 h-5" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300">
                  <FaEnvelope className="w-5 h-5" />
                  <span>support@ecommerce.com</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-900 rounded-2xl p-8 space-y-6 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-4">Get in Touch</h3>
              
              {isSubmitted && (
                <div className="bg-white text-black p-4 rounded-xl flex items-center space-x-3 animate-pulse">
                  <FaHeart className="w-5 h-5" />
                  <span>Thank you! We'll get back to you soon.</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 hover:shadow-md focus:shadow-lg"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 hover:shadow-md focus:shadow-lg"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 hover:shadow-md focus:shadow-lg resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full bg-white text-black py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <FaPaperPlane className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 transform inline-block"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-6">
              <h4 className="text-lg font-bold text-white mb-4">Categories</h4>
              <ul className="space-y-3">
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link
                      href={category.href}
                      className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 transform inline-block"
                    >
                      {category.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">Customer Service</h3>
            <ul className="space-y-3">
              {customerService.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 transform inline-block"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Media */}
            <div className="pt-6">
              <h4 className="text-lg font-bold text-white mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {[
                  { icon: FaFacebook, href: "#", label: "Facebook" },
                  { icon: FaTwitter, href: "#", label: "Twitter" },
                  { icon: FaInstagram, href: "#", label: "Instagram" },
                  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
                ].map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <Link
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-xl flex items-center justify-center text-gray-300 hover:bg-white hover:text-black transform hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <IconComponent className="w-5 h-5" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-300 text-sm">
              © 2024 E-Commerce. All rights reserved. Made with{" "}
              <FaHeart className="inline w-4 h-4 text-red-500 mx-1" /> for our customers.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-white transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-300 hover:text-white transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;