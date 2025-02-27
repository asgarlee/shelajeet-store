'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../providers';

// Custom icon components
const CheckCircleIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>
);

const XCircleIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
  </svg>
);

const PhoneIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);

const ChevronDownIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

export default function PaymentConfirmation() {
  const router = useRouter();
  const { clearCart } = useCart();
  const [orderDetails, setOrderDetails] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [showUtrInput, setShowUtrInput] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState('pending'); // 'pending', 'processing', 'confirmed', 'failed'
  const [statusMessage, setStatusMessage] = useState('');
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);

  useEffect(() => {
    // Get order details from localStorage
    const storedOrder = localStorage.getItem('currentOrder');
    if (storedOrder) {
      setOrderDetails(JSON.parse(storedOrder));
    } else {
      // Redirect to home if no order details found
      router.push('/');
    }
    
    // Set up timer
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowUtrInput(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleSubmitUTR = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setOrderStatus('confirming');
      setStatusMessage('Our team is verifying your payment. This usually takes 2-24 hours.');
    }, 2000);
  };

  const toggleOrderDetails = () => {
    setIsOrderDetailsOpen(!isOrderDetailsOpen);
  };

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-purple-800">Loading order details...</p>
        </div>
      </div>
    );
  }

  // Create QR code content
  const qrContent = `
    Order: ${orderDetails.orderNumber}
    Amount: ₹${orderDetails.total}
    Date: ${new Date(orderDetails.orderDate).toLocaleDateString()}
    Customer: ${orderDetails.customer.name}
    UPI: yourcompany@upi
  `;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="w-full bg-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <Link href="/" className="text-2xl font-bold text-purple-800">
            Shilajeet Store
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Payment Confirmation</h1>
            
            {isSubmitted ? (
              <p className="text-green-600 font-medium mb-6">Order #{orderDetails.orderNumber} placed successfully!</p>
            ) : (
              <p className="text-purple-600 font-medium mb-6">Complete your payment to confirm order #{orderDetails.orderNumber}</p>
            )}

            {/* Collapsible Order Details */}
            <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
              <button 
                onClick={toggleOrderDetails}
                className="w-full flex items-center justify-between bg-purple-50 p-4 text-left font-medium text-purple-800 focus:outline-none"
              >
                <span>Order Details</span>
                <ChevronDownIcon 
                  className={`h-5 w-5 transform transition-transform duration-200 ${isOrderDetailsOpen ? 'rotate-180' : ''}`} 
                />
              </button>
              
              {isOrderDetailsOpen && (
                <div className="p-4 border-t border-gray-200">
                  {/* Customer Information */}
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-800 mb-2">Customer Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div className="flex">
                        <p className="text-gray-600 w-24 font-medium">Name:</p>
                        <p className="text-gray-800">{orderDetails.customer.name}</p>
                      </div>
                      <div className="flex">
                        <p className="text-gray-600 w-24 font-medium">Email:</p>
                        <p className="text-gray-800">{orderDetails.customer.email}</p>
                      </div>
                      <div className="flex">
                        <p className="text-gray-600 w-24 font-medium">Phone:</p>
                        <p className="text-gray-800">{orderDetails.customer.phone}</p>
                      </div>
                      <div className="flex col-span-1 md:col-span-2">
                        <p className="text-gray-600 w-24 font-medium">Address:</p>
                        <p className="text-gray-800">{orderDetails.customer.address}, {orderDetails.customer.city}, {orderDetails.customer.state}, {orderDetails.customer.pincode}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Order Items */}
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-800 mb-2">Order Items</h3>
                    <div className="space-y-3">
                      {orderDetails.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-2">
                          <div>
                            <p className="font-medium text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <p className="font-medium text-purple-700">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Order Totals */}
                  <div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600 font-medium">Subtotal</span>
                      <span className="text-gray-800">₹{orderDetails.subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600 font-medium">Shipping</span>
                      <span className="text-gray-800">₹{orderDetails.shipping.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between py-2 font-bold">
                      <span className="text-purple-800">Total</span>
                      <span className="text-purple-800">₹{orderDetails.total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {!isSubmitted ? (
              <div className="text-center">
                <div className="border-2 border-purple-100 rounded-lg p-6 mb-6 mx-auto w-full max-w-xs">
                  <div className="w-full aspect-square relative bg-white mb-4 flex items-center justify-center">
                    {/* Placeholder for QR code image. In a real app, this would be a generated QR code */}
                    <div className="border-4 border-purple-200 rounded-lg p-4 w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-800 mb-2">QR Code</div>
                        <div className="text-sm text-gray-600 mb-1">UPI: yourcompany@upi</div>
                        <div className="text-sm text-gray-600 mb-1">Amount: ₹{orderDetails.total}</div>
                        <div className="text-sm text-gray-600">Reference: {orderDetails.orderNumber}</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">Scan this QR code to make payment</p>
                </div>

                {!showUtrInput ? (
                  <div className="mb-6">
                    <p className="text-gray-700 mb-2">UTR input will be enabled in:</p>
                    <div className="text-2xl font-bold text-purple-700">{secondsLeft} seconds</div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitUTR} className="max-w-md mx-auto">
                    <div className="mb-4">
                      <label htmlFor="utr" className="block text-gray-700 mb-2">
                        Enter UTR Number/Reference ID
                      </label>
                      <input
                        type="text"
                        id="utr"
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value)}
                        required
                        placeholder="Enter UTR number after payment"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading || !utrNumber}
                      className={`w-full py-3 rounded-full transition duration-300 ${
                        isLoading || !utrNumber
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-purple-600 hover:bg-purple-700 text-white'
                      }`}
                    >
                      {isLoading ? 'Processing...' : 'Submit Payment Reference'}
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="mb-4 w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                  {/* Loading spinner instead of checkmark */}
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Verifying Payment</h2>
                <p className="text-gray-600 mb-6">
                  Our team is confirming your payment. This usually takes 2-24 hours.
                </p>
                <Link
                  href="/"
                  className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition duration-300"
                >
                  Return to Home
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
