/**
 * Utility functions for handling product images
 */

// Array of product image paths
const productImages = [
  '/images/products/product1.jpg', 
  '/images/products/product2.jpg', 
  '/images/products/product3.jpg', 
  '/images/products/product4.jpg',
  '/images/products/product5.jpg',
  '/images/products/product6.jpg'
];

/**
 * Gets a product image from the available images based on product ID
 * @param {number} productId - The product ID to use for deterministic selection
 * @returns {string} - The image URL
 */
export function getRandomProductImage(productId) {
  // If we have a product ID, use it to deterministically select an image
  if (productId) {
    // Use the product ID modulo the length of the images array to get a consistent image
    const imageIndex = productId % productImages.length;
    return productImages[imageIndex];
  }
  
  // Otherwise just pick a random image
  const randomIndex = Math.floor(Math.random() * productImages.length);
  return productImages[randomIndex];
}
