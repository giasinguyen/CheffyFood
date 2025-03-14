import React from 'react';
import dataFooter from '../data/dataFooter.json';
import logo from '../assets/logo.png';
import { Mail, Send, Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-lg font-bold mb-4 text-pink-400">About Us</h3>
            <p className="text-gray-300 mb-6 text-sm">
              Welcome to Cheffy, your culinary destination where we transform everyday ingredients 
              into extraordinary meals. Learn to cook like a professional with our collection of recipes.
            </p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent placeholder-gray-500 pr-12"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-pink-500 hover:text-pink-400 transition-colors">
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-pink-400">Learn More</h3>
            <ul className="space-y-2">
              {['Our Chefs', 'Cooking Classes', 'Premium Features', 'FAQ'].map((item) => (
                <li key={item} className="group">
                  <a href="#" className="text-gray-300 hover:text-white text-sm flex items-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-pink-400" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3 text-gray-400">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-pink-600 transition-colors">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-pink-600 transition-colors">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-pink-600 transition-colors">
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-pink-400">Shop</h3>
            <ul className="space-y-2">
              {['Kitchen Tools', 'Cookbooks', 'Gift Cards', 'Premium Subscriptions', 'Send Us Feedback'].map((item) => (
                <li key={item} className="group">
                  <a href="#" className="text-gray-300 hover:text-white text-sm flex items-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-pink-400" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-pink-400">Popular Recipes</h3>
            <ul className="space-y-2">
              {Object.keys(dataFooter).map((key, index) => (
                <li key={index} className="group">
                  <a 
                    href={dataFooter[key]} 
                    className="text-gray-300 hover:text-white text-sm flex items-center group-hover:translate-x-1 transition-transform"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-pink-400" />
                    {key}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-700 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold text-white mb-2">Join Our Newsletter</h3>
              <p className="text-gray-300 text-sm">Get weekly recipes and cooking tips delivered to your inbox</p>
            </div>
            <div className="w-full md:w-auto">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full md:w-64 px-4 py-2 rounded-l-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button className="bg-gradient-to-r from-pink-600 to-rose-500 text-white px-4 py-2 rounded-r-lg hover:from-pink-700 hover:to-rose-600 transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <img src={logo} alt="Cheffy Logo" className="h-8 w-auto mr-2" />
            <span className="text-xl font-bold text-pink-500">Cheffy</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center">
            <p className="text-gray-400 text-sm mb-2 md:mb-0 md:mr-6">
              © {new Date().getFullYear()} Cheffy. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;