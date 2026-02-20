'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Car, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, Heart, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  product: [
    { label: 'Αναζήτηση', href: '/main/search' },
    { label: 'Δημοσίευση', href: '/main/listings/new' },
    { label: 'Πώς λειτουργεί', href: '/how-it-works' },
    { label: 'Τιμολόγηση', href: '/pricing' },
    { label: 'Ασφάλεια', href: '/safety' },
  ],
  company: [
    { label: 'Σχετικά με εμάς', href: '/about' },
    { label: 'Επικοινωνία', href: '/contact' },
    { label: 'Blog', href: '/blog' },
  ],
  support: [
    { label: 'Βοήθεια', href: '/help' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Όροι χρήσης', href: '/terms' },
    { label: 'Απόρρητο', href: '/privacy' },
    { label: 'Cookies', href: '/cookies' },
  ],
};

const socialLinks = [
  { label: 'Facebook', href: '#', icon: Facebook },
  { label: 'Instagram', href: '#', icon: Instagram },
  { label: 'Twitter', href: '#', icon: Twitter },
  { label: 'LinkedIn', href: '#', icon: Linkedin },
];

export function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Column - Takes 5 columns */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-shadow">
                <Car className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold">carpal</span>
                <span className="text-2xl font-bold text-gray-500">.gr</span>
              </div>
            </Link>
            
            <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-sm">
              Μοιραστείτε τη διαδρομή σας και κάντε τις καθημερινές σας μετακινήσεις 
              πιο οικονομικές, φιλικές προς το περιβάλλον και κοινωνικές.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <a 
                href="mailto:hello@carpal.gr" 
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span>hello@carpal.gr</span>
              </a>
              <a 
                href="tel:+302101234567" 
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <span>+30 210 123 4567</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <span>Θεσσαλονίκη, Ελλάδα</span>
              </div>
            </div>
          </div>

          {/* Links Columns - Takes 7 columns */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
              {/* Product */}
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
                  Προϊόν
                </h3>
                <ul className="space-y-4">
                  {footerLinks.product.map((link) => (
                    <li key={link.href}>
                      <Link 
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm inline-flex items-center gap-1 group"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
                  Εταιρεία
                </h3>
                <ul className="space-y-4">
                  {footerLinks.company.map((link) => (
                    <li key={link.href}>
                      <Link 
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm inline-flex items-center gap-1 group"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
                  Υποστήριξη
                </h3>
                <ul className="space-y-4">
                  {footerLinks.support.map((link) => (
                    <li key={link.href}>
                      <Link 
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm inline-flex items-center gap-1 group"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-gray-500 text-sm flex items-center gap-1">
              © {new Date().getFullYear()} carpal.gr — Μετακινήσεις με 
              <Heart className="w-4 h-4 text-red-500 fill-red-500 mx-1" /> 
              από Θεσσαλονίκη
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-900 hover:bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/terms" className="hover:text-white transition-colors">
                Όροι
              </Link>
              <span className="text-gray-700">|</span>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Απόρρητο
              </Link>
              <span className="text-gray-700">|</span>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
