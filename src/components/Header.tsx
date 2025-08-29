"use client";
import Link from "next/link";
import { FaHome, FaBell, FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";

interface CartItem {
  productId: string;
  size: string;
  quantity: number;
}

const Header = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [notificationCount, setNotificationCount] = useState(2);

  // Listen for cart updates from product components
  useEffect(() => {
    const handleAddToCart = (event: CustomEvent) => {
      const newItem = event.detail as CartItem;
      setCartItems(prev => [...prev, newItem]);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('addToCart', handleAddToCart as EventListener);
      
      return () => {
        window.removeEventListener('addToCart', handleAddToCart as EventListener);
      };
    }
  }, []);

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <div className="absolute -inset-1 bg-black rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
            </div>
            <h1 className="text-xl font-bold text-black transform group-hover:scale-105 transition-transform duration-300">
              E-Commerce
            </h1>
          </div>

          <div className="flex-1 max-w-xl mx-8">
            <div className={`relative group transition-all duration-300 ${
              isSearchFocused ? 'transform scale-105' : ''
            }`}>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className={`h-4 w-4 transition-colors duration-300 ${
                  isSearchFocused ? 'text-black' : 'text-gray-400'
                }`} />
              </div>
              <input
                type="text"
                placeholder="Search for products..."
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 hover:shadow-md focus:shadow-lg"
              />
              <div className={`absolute inset-0 rounded-2xl bg-black opacity-0 transition-opacity duration-300 -z-10 blur ${
                isSearchFocused ? 'opacity-10' : ''
              }`}></div>
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-2">
            {/* Home */}
            <Link
              href="#"
              className="group relative p-3 text-gray-600 hover:text-black transition-all duration-300 rounded-xl hover:bg-gray-100"
            >
              <FaHome size={20} className="transform group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 rounded-xl bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            </Link>

            {/* Notifications */}
            <Link
              href="#"
              className="group relative p-3 text-gray-600 hover:text-black transition-all duration-300 rounded-xl hover:bg-gray-100"
            >
              <FaBell size={20} className="transform group-hover:scale-110 transition-transform duration-300" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-black text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {notificationCount}
                </span>
              )}
              <div className="absolute inset-0 rounded-xl bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            </Link>

            {/* Cart */}
            <Link
              href="#"
              className="group relative p-3 text-gray-600 hover:text-black transition-all duration-300 rounded-xl hover:bg-gray-100"
            >
              <FaShoppingCart size={20} className="transform group-hover:scale-110 transition-transform duration-300" />
              {getTotalCartItems() > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-black text-white text-xs rounded-full flex items-center justify-center animate-bounce">
                  {getTotalCartItems()}
                </span>
              )}
              <div className="absolute inset-0 rounded-xl bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            </Link>

            {/* Sign In Button */}
            <Link
              href="#"
              className="group relative ml-4 px-6 py-2.5 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center space-x-2">
                <FaUser size={16} className="transform group-hover:rotate-12 transition-transform duration-300" />
                <span>Sign In</span>
              </div>
              <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
