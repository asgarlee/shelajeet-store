'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../providers';
import { getRandomProductImage } from '../utils/imageUtils';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [showNotification, setShowNotification] = useState(false);
  
  // Get image based on product ID for consistent display
  const productImage = getRandomProductImage(product.id);
  
  const handleAddToCart = () => {
    addToCart(product);
    setShowNotification(true);
    
    // Hide notification after 2 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };
  
  return (
    <div className="card group relative">
      {/* Product Image */}
      <div className="relative aspect-square bg-gradient-to-br from-purple-50 to-purple-100 p-6 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
          <Image 
            src={productImage} 
            alt={`${product.name} - ${product.weight}`}
            width={200}
            height={200}
            className="object-cover rounded-lg"
          />
        </div>
        
        {/* Quick Add Button */}
        <button 
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-purple-700"
          aria-label="Add to cart"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
      
      {/* Product Details */}
      <div className="p-4">
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="font-semibold text-lg text-gray-800 hover:text-purple-600 mb-1 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mb-2">
            {product.weight}
          </p>
          <p className="font-bold text-purple-700 text-xl">
            ₹{product.price.toLocaleString('en-IN')}
          </p>
        </Link>
        
        <button
          onClick={handleAddToCart}
          className="w-full mt-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors add-to-cart-btn"
        >
          Add to Cart
        </button>
      </div>
      
      {/* Add to Cart Notification - Updated with slide-in/slide-out animation and light green color */}
      <div 
        className={`fixed top-5 right-5 bg-green-50 border border-green-200 text-gray-800 p-3 rounded-md text-sm shadow-lg z-50 max-w-xs w-96 
          transition-all duration-500 ease-in-out transform 
          ${showNotification ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="font-medium">Added to cart!</p>
            <p className="text-xs text-gray-600 mt-1">Item: {product.name} - {product.weight}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
