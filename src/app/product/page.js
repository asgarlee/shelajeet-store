'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { getRandomProductImage } from '../utils/imageUtils';

// Product data
const products = [
  {
    id: "shilajeet-20g",
    name: "Pure Ladakhi Shilajeet",
    weight: "20g",
    price: 1299,
    description: "Perfect starter size for first-time users. Experience the benefits of pure Ladakhi Shilajeet with this compact 20g jar.",
    highlight: "Most Popular",
    specifications: {
      weight: "20g",
      packaging: "Premium glass jar with airtight seal",
      shelfLife: "24 months",
      storage: "Store in a cool, dry place",
      usage: "Dissolve a pea-sized amount (250-500mg) in warm water or milk"
    }
  },
  {
    id: "shilajeet-100g",
    name: "Pure Ladakhi Shilajeet",
    weight: "100g",
    price: 4999,
    description: "Family size jar containing 100g of premium quality Shilajeet. Perfect for regular users or small families.",
    highlight: "Best Value",
    specifications: {
      weight: "100g",
      packaging: "Premium glass jar with airtight seal",
      shelfLife: "24 months",
      storage: "Store in a cool, dry place",
      usage: "Dissolve a pea-sized amount (250-500mg) in warm water or milk"
    }
  },
  {
    id: "shilajeet-500g",
    name: "Pure Ladakhi Shilajeet",
    weight: "500g",
    price: 21999,
    description: "Large 500g jar perfect for practitioners, clinics or long-term personal use. Significant savings on bulk purchase.",
    specifications: {
      weight: "500g",
      packaging: "Premium glass jar with airtight seal",
      shelfLife: "24 months",
      storage: "Store in a cool, dry place",
      usage: "Dissolve a pea-sized amount (250-500mg) in warm water or milk"
    }
  },
  {
    id: "shilajeet-1kg",
    name: "Pure Ladakhi Shilajeet",
    weight: "1kg",
    price: 39999,
    description: "Professional-grade 1kg container of our finest Shilajeet. Ideal for wellness centers, Ayurvedic practitioners, or sharing.",
    specifications: {
      weight: "1kg",
      packaging: "Premium air-tight container",
      shelfLife: "24 months",
      storage: "Store in a cool, dry place",
      usage: "Dissolve a pea-sized amount (250-500mg) in warm water or milk"
    }
  },
  {
    id: "shilajeet-gold-50g",
    name: "Premium Gold Shilajeet",
    weight: "50g",
    price: 5999,
    description: "Our premium gold-grade Shilajeet with enhanced potency and higher mineral content. The purest form available.",
    highlight: "Premium",
    specifications: {
      weight: "50g",
      packaging: "Luxury glass jar with wooden case",
      shelfLife: "36 months",
      storage: "Store in a cool, dry place",
      usage: "Dissolve a pea-sized amount (250-500mg) in warm water or milk"
    }
  },
  {
    id: "shilajeet-starter-kit",
    name: "Shilajeet Starter Kit",
    weight: "30g + Accessories",
    price: 2499,
    description: "Complete starter kit including 30g Shilajeet, measuring spoon, information booklet, and mixing jar.",
    highlight: "For Beginners",
    specifications: {
      weight: "30g",
      packaging: "Gift box with glass jar and accessories",
      shelfLife: "24 months",
      storage: "Store in a cool, dry place",
      usage: "Follow the included guidebook for proper measurement and consumption"
    }
  }
];

export default function ProductPage() {
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const filteredProducts = categoryFilter === 'all'
    ? products
    : products.filter(product => {
        if (categoryFilter === 'small' && ['20g', '30g', '50g'].includes(product.weight.replace(/[^\d]/g, '') + 'g')) return true;
        if (categoryFilter === 'medium' && ['100g'].includes(product.weight.replace(/[^\d]/g, '') + 'g')) return true;
        if (categoryFilter === 'large' && ['500g', '1kg'].includes(product.weight.replace(/[^\dkg]/g, ''))) return true;
        if (categoryFilter === 'premium' && product.id.includes('gold')) return true;
        return false;
      });
  
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative py-16 bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Pure Ladakhi Shilajeet
            </h1>
            <p className="text-lg md:text-xl text-purple-100 mb-8">
              100% natural mineral compound from the pristine mountains of Ladakh.
              Rich in fulvic acid and over 84 minerals beneficial for your health.
            </p>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#F9FAFB">
            <path d="M0,64L60,64C120,64,240,64,360,74.7C480,85,600,107,720,106.7C840,107,960,85,1080,74.7C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
          </svg>
        </div>
      </div>
      
      {/* Product Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-4 py-2 rounded-full transition-colors ${
              categoryFilter === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => setCategoryFilter('small')}
            className={`px-4 py-2 rounded-full transition-colors ${
              categoryFilter === 'small'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Small Size (20g-50g)
          </button>
          <button
            onClick={() => setCategoryFilter('medium')}
            className={`px-4 py-2 rounded-full transition-colors ${
              categoryFilter === 'medium'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Medium Size (100g)
          </button>
          <button
            onClick={() => setCategoryFilter('large')}
            className={`px-4 py-2 rounded-full transition-colors ${
              categoryFilter === 'large'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Large Size (500g+)
          </button>
          <button
            onClick={() => setCategoryFilter('premium')}
            className={`px-4 py-2 rounded-full transition-colors ${
              categoryFilter === 'premium'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Premium Products
          </button>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-600">No products found in this category</h3>
            <button
              onClick={() => setCategoryFilter('all')}
              className="mt-4 text-purple-600 hover:text-purple-800 font-medium"
            >
              View all products
            </button>
          </div>
        )}
      </div>

      {/* Product Benefits Section */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Health Benefits of Shilajeet
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-purple-700 mb-4">Physical Benefits</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-purple-500 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Enhances energy and vitality</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-purple-500 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Supports immune system function</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-purple-500 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Improves nutrient absorption</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-purple-500 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Supports joint health and mobility</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-purple-700 mb-4">Mental Benefits</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-purple-500 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Promotes cognitive function</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-purple-500 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Enhances focus and concentration</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-purple-500 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Supports stress management</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-purple-500 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Improves mood and mental clarity</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-purple-900 text-purple-100 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Shilajeet Store</h3>
              <p className="mb-4">Bringing the purest Ladakhi Shilajeet directly to your doorstep.</p>
              <p> 2025 Shilajeet Store. All rights reserved.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/product" className="hover:text-white">Products</Link></li>
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/cart" className="hover:text-white">Cart</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p className="mb-2">Email: info@shilajeetstore.com</p>
              <p>Phone: +91 98765 43210</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
