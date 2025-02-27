'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../providers';

export default function AboutPage() {
  const { itemCount } = useCart();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-purple-800">
            Shilajeet Store
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-purple-800">
              Home
            </Link>
            <Link href="/product" className="text-gray-700 hover:text-purple-800">
              Product
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-purple-800">
              About
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-purple-800 relative">
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[40vh] bg-purple-800">
        <div className="absolute inset-0">
          <Image
            src="/images/mountain-bg.jpg"
            alt="Ladakh Mountains"
            fill
            priority
            className="object-cover object-center opacity-30"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white text-center">About Our Shilajeet</h1>
        </div>
      </div>

      {/* About Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-10">
          <h2 className="text-3xl font-bold text-purple-800 mb-6">Our Story</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Founded with a passion for Ayurvedic traditions and natural healing, Shilajeet Store began as a small family endeavor to share the incredible benefits of pure Ladakhi Shilajeet with health-conscious individuals worldwide.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our journey started in the remote mountains of Ladakh, where we discovered the rare mineral exudate known as Shilajeet. Impressed by its remarkable properties and the traditional knowledge surrounding its use, we committed ourselves to bringing this natural wonder to those seeking holistic wellness solutions.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, we pride ourselves on providing the highest quality, ethically sourced Shilajeet, carefully harvested from pristine mountain locations and processed according to ancient Ayurvedic principles to preserve its potent medicinal properties.
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We are dedicated to the responsible sourcing and ethical distribution of authentic Shilajeet, maintaining the highest standards of quality and purity in every product we offer.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our mission is to bridge ancient Ayurvedic wisdom with modern wellness needs, educating our community about the benefits of Shilajeet while ensuring sustainable harvesting practices that respect and preserve the natural environments from which this precious substance originates.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We strive to empower individuals on their wellness journey by providing not just a product, but knowledge, support, and a connection to nature's extraordinary healing potential.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-10">
          <h2 className="text-3xl font-bold text-purple-800 mb-6">What is Shilajeet?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Shilajeet (also spelled Shilajit) is a rare exudate that oozes from cracks in the mountains in the Himalayas and other mountain ranges across Asia. It forms over centuries from the decomposition of plant matter and minerals.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                In ancient Ayurvedic texts, Shilajeet is regarded as one of the most powerful and rejuvenating substances known to mankind, often referred to as "Destroyer of Weakness" and "Conqueror of Mountains."
              </p>
              <p className="text-gray-700 leading-relaxed">
                The dark, resinous substance contains over 84 minerals in their ionic form, as well as fulvic acid, humic acid, and various beneficial compounds that work synergistically to support overall health and vitality.
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">Traditional Uses</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Enhancing energy and stamina</li>
                <li>Supporting cognitive function and mental clarity</li>
                <li>Promoting healthy aging and longevity</li>
                <li>Balancing hormones and supporting reproductive health</li>
                <li>Strengthening the immune system</li>
                <li>Aiding in detoxification processes</li>
                <li>Supporting healthy metabolism</li>
                <li>Promoting cellular regeneration</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-purple-800 mb-6">Our Sourcing & Quality</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-purple-800 mb-4">Ethical Harvesting</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We work directly with experienced collectors who follow traditional methods to harvest Shilajeet from the high-altitude regions of Ladakh, ensuring minimal environmental impact and sustainable practices.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our harvesters respect the delicate mountain ecosystems and only collect Shilajeet during specific seasons when it naturally exudes from the rocks, maintaining the balance of these precious environments.
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">Quality Assurance</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Each batch of our Shilajeet undergoes rigorous testing for purity, potency, and authenticity. We verify the presence of key beneficial compounds and ensure the absence of contaminants or adulterants.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our processing methods follow traditional Ayurvedic principles, carefully preserving the bioactive compounds that make Shilajeet such a powerful wellness ally. We never use fillers, additives, or artificial ingredients in our products.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-purple-900 text-purple-100 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Shilajeet Store</h3>
              <p className="mb-4">Bringing the purest Ladakhi Shilajeet directly to your doorstep.</p>
              <p>&copy; 2025 Shilajeet Store. All rights reserved.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/product" className="hover:text-white">Products</Link></li>
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/cart" className="hover:text-white">Cart</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p className="mb-2">Email: info@shilajeetstore.com</p>
              <p className="mb-2">Phone: +91 9876543210</p>
              <p className="text-purple-200">Customer service hours: 10 AM - 6 PM IST</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
