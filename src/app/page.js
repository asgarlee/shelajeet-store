'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from './components/Navbar';
import { getRandomProductImage } from './utils/imageUtils';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [drops, setDrops] = useState([]);
  const requestRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });

        // Create new drop
        if (Math.random() < 0.1) { // Control drop frequency
          const newDrop = {
            id: Date.now(),
            startX: e.clientX - rect.left,
            startY: e.clientY - rect.top,
            currentY: e.clientY - rect.top,
            size: Math.random() * 10 + 5,
            speed: Math.random() * 2 + 1
          };
          setDrops(prev => [...prev.slice(-20), newDrop]); // Keep last 20 drops
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop for drops
  useEffect(() => {
    const animate = () => {
      setDrops(prevDrops => 
        prevDrops
          .map(drop => ({
            ...drop,
            currentY: drop.currentY + drop.speed
          }))
          .filter(drop => drop.currentY < window.innerHeight)
      );
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <main className="min-h-screen pt-16">
      <Navbar />

      {/* Hero Section with Background Image */}
      <section className="relative h-[90vh] overflow-hidden" ref={containerRef}>
        {/* Mountain Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/mountain-bg.jpg"
            alt="Ladakh Mountains"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-indigo-900/70"></div>
        </div>
        
        {/* Water Drop Effect */}
        <div className="absolute inset-0 pointer-events-none">
          {drops.map(drop => (
            <div
              key={drop.id}
              className="absolute rounded-full bg-white opacity-70"
              style={{
                left: `${drop.startX}px`,
                top: `${drop.currentY}px`,
                width: `${drop.size}px`,
                height: `${drop.size}px`,
              }}
            ></div>
          ))}
          <div
            className="absolute w-20 h-20 rounded-full bg-white opacity-0"
            style={{
              left: `${mousePosition.x - 40}px`,
              top: `${mousePosition.y - 40}px`,
              background: 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)',
            }}
          ></div>
        </div>

        {/* Hero Content */}
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Pure Ladakhi <span className="text-yellow-400">Shilajeet</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl">
            Experience the power of nature's miracle mineral compound, sourced from the pristine Himalayan mountains of Ladakh
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/product" className="btn-primary">
              Shop Now
            </Link>
            <Link href="/about" className="btn-outline text-white border-white hover:bg-white hover:text-purple-900">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Nature's Ultimate Health Mineral
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Discover the ancient Ayurvedic superfood known as the "Conqueror of Mountains" and "Destroyer of Weakness"
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Energy & Vitality</h3>
              <p className="text-gray-600">
                Supports natural energy production and enhances stamina without the crash of caffeine or stimulants.
              </p>
            </div>
            
            <div className="card p-8 text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Immune Support</h3>
              <p className="text-gray-600">
                Rich in fulvic acid and over 84 minerals that support your body's natural defenses and overall health.
              </p>
            </div>
            
            <div className="card p-8 text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mental Clarity</h3>
              <p className="text-gray-600">
                Enhances cognitive function, focus, and memory while helping to manage stress and promote calm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Premium Ladakhi Shilajeet, carefully harvested and processed to preserve its potency
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card overflow-hidden group">
              <div className="aspect-square bg-gradient-to-br from-purple-50 to-purple-100 p-6 flex items-center justify-center">
                <div className="relative w-48 h-48 transform group-hover:scale-105 transition-transform duration-300">
                  <Image 
                    src="/images/products/product1.jpg" 
                    alt="Pure Ladakhi Shilajeet - 20g"
                    width={200}
                    height={200}
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-gray-900">Pure Ladakhi Shilajeet</h3>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">Popular</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">Perfect starter size for first-time users</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-purple-600">₹1,299</span>
                  <Link href="/product" className="py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="card overflow-hidden group">
              <div className="aspect-square bg-gradient-to-br from-purple-50 to-purple-100 p-6 flex items-center justify-center">
                <div className="relative w-48 h-48 transform group-hover:scale-105 transition-transform duration-300">
                  <Image 
                    src="/images/products/product2.jpg" 
                    alt="Premium Gold Shilajeet - 50g"
                    width={200}
                    height={200}
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-gray-900">Premium Gold Shilajeet</h3>
                  <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">Premium</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">Enhanced potency with higher mineral content</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-purple-600">₹5,999</span>
                  <Link href="/product" className="py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="card overflow-hidden group">
              <div className="aspect-square bg-gradient-to-br from-purple-50 to-purple-100 p-6 flex items-center justify-center">
                <div className="relative w-48 h-48 transform group-hover:scale-105 transition-transform duration-300">
                  <Image 
                    src="/images/products/product3.jpg" 
                    alt="Pure Ladakhi Shilajeet - 100g"
                    width={200}
                    height={200}
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-gray-900">Shilajeet Starter Kit</h3>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">New</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">Complete kit with measuring tools and guide</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-purple-600">₹2,499</span>
                  <Link href="/product" className="py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/product" className="btn-outline inline-block">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-purple-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            What Our Customers Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-purple-800/50 p-6 rounded-lg">
              <div className="flex text-yellow-400 mb-4">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <p className="italic mb-6">
                "I've been using this Shilajeet for 3 months now and the difference in my energy levels is remarkable. I feel more focused and productive throughout the day."
              </p>
              <div className="font-semibold">- Rajesh S.</div>
            </div>
            
            <div className="bg-purple-800/50 p-6 rounded-lg">
              <div className="flex text-yellow-400 mb-4">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <p className="italic mb-6">
                "The quality of this Shilajeet is excellent. It dissolves easily and has a clean taste. I've noticed improvements in my overall well-being and recovery after workouts."
              </p>
              <div className="font-semibold">- Priya M.</div>
            </div>
            
            <div className="bg-purple-800/50 p-6 rounded-lg">
              <div className="flex text-yellow-400 mb-4">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <p className="italic mb-6">
                "As someone who practices Ayurveda, I'm very particular about the quality of herbs I use. This Shilajeet meets all my expectations - pure, potent, and effective."
              </p>
              <div className="font-semibold">- Dr. Anand K.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Experience the Power of Pure Ladakhi Shilajeet
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers who have transformed their health and vitality with our premium Shilajeet products.
          </p>
          <Link href="/product" className="btn-primary inline-block">
            Shop Now
          </Link>
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
    </main>
  );
}
