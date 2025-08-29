"use client";
import { useState } from "react";
import { FaShoppingCart, FaHeart, FaStar, FaEye, FaTimes, FaPlus, FaMinus } from "react-icons/fa";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  inStock: boolean;
  sizes: string[];
}

interface CartItem {
  productId: string;
  size: string;
  quantity: number;
}

interface ProductDetailPopupProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

const ProductDetailPopup: React.FC<ProductDetailPopupProps> = ({ product, isOpen, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || "");
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    if (selectedSize) {
      onAddToCart({
        productId: product.id,
        size: selectedSize,
        quantity: quantity
      });
      onClose();
    }
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? "text-black" : "text-gray-300"
        }`}
      />
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        >
          <FaTimes className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Product Image */}
          <div className="lg:w-1/2 bg-gray-50">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-80 lg:h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 p-8">
            <div className="space-y-6">
              {/* Category */}
              <span className="text-sm text-gray-500 uppercase tracking-wider font-semibold">
                {product.category}
              </span>

              {/* Title */}
              <h2 className="text-3xl font-bold text-black">
                {product.title}
              </h2>

              {/* Rating */}
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4">
                {product.discountPrice ? (
                  <>
                    <span className="text-3xl font-bold text-black">
                      ${product.discountPrice}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.price}
                    </span>
                    <span className="bg-black text-white text-sm font-bold px-3 py-1 rounded-full">
                      Save ${(product.price - product.discountPrice).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-black">
                    ${product.price}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>

              {/* Size Selection */}
              {product.sizes.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-black mb-3">Size</h4>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-xl border-2 font-medium transition-all duration-300 ${
                          selectedSize === size
                            ? "border-black bg-black text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selection */}
              <div>
                <h4 className="text-lg font-semibold text-black mb-3">Quantity</h4>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-xl">
                    <button
                      onClick={decrementQuantity}
                      className="p-3 hover:bg-gray-100 transition-colors duration-300 rounded-l-xl"
                    >
                      <FaMinus className="w-3 h-3 text-gray-600" />
                    </button>
                    <span className="px-6 py-3 font-semibold text-lg">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQuantity}
                      className="p-3 hover:bg-gray-100 transition-colors duration-300 rounded-r-xl"
                    >
                      <FaPlus className="w-3 h-3 text-gray-600" />
                    </button>
                  </div>
                  <span className="text-gray-600">
                    Total: ${((product.discountPrice || product.price) * quantity).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || !selectedSize}
                className={`w-full flex items-center justify-center space-x-3 py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                  product.inStock && selectedSize
                    ? "bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <FaShoppingCart className="w-5 h-5" />
                <span>
                  {!product.inStock ? "Out of Stock" : "Add to Cart"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Product = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const products: Product[] = [
    {
      id: "1",
      title: "Premium Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.",
      price: 299.99,
      discountPrice: 199.99,
      image: "/products/1gr.png",
      rating: 4.8,
      reviews: 1245,
      category: "Electronics",
      inStock: true,
      sizes: ["One Size"],
    },
    {
      id: "2",
      title: "Smart Fitness Watch",
      description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and water resistance.",
      price: 249.99,
      discountPrice: 179.99,
      image: "/products/1p.png",
      rating: 4.6,
      reviews: 892,
      category: "Electronics",
      inStock: true,
      sizes: ["38mm", "42mm", "44mm"],
    },
    {
      id: "3",
      title: "Minimalist Desk Lamp",
      description: "Modern LED desk lamp with adjustable brightness and sleek minimalist design. Perfect for home office or study.",
      price: 89.99,
      image: "/products/2g.png",
      rating: 4.7,
      reviews: 567,
      category: "Home",
      inStock: true,
      sizes: ["Standard"],
    },
    {
      id: "4",
      title: "Professional Camera Lens",
      description: "High-performance camera lens for professional photography with exceptional clarity and precision optics.",
      price: 599.99,
      discountPrice: 449.99,
      image: "/products/2gr.png",
      rating: 4.9,
      reviews: 423,
      category: "Electronics",
      inStock: false,
      sizes: ["50mm", "85mm"],
    },
    {
      id: "5",
      title: "Ergonomic Office Chair",
      description: "Comfortable ergonomic office chair with lumbar support and adjustable height. Designed for long work sessions.",
      price: 399.99,
      discountPrice: 299.99,
      image: "/products/3b.png",
      rating: 4.5,
      reviews: 1089,
      category: "Furniture",
      inStock: true,
      sizes: ["Small", "Medium", "Large"],
    },
    {
      id: "6",
      title: "Wireless Charging Pad",
      description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicators.",
      price: 49.99,
      discountPrice: 34.99,
      image: "/products/4p.png",
      rating: 4.4,
      reviews: 756,
      category: "Electronics",
      inStock: true,
      sizes: ["Standard"],
    },
    {
      id: "7",
      title: "Premium Coffee Maker",
      description: "Automatic coffee maker with programmable settings and thermal carafe. Brew perfect coffee every time.",
      price: 199.99,
      discountPrice: 149.99,
      image: "/products/5o.png",
      rating: 4.7,
      reviews: 634,
      category: "Kitchen",
      inStock: true,
      sizes: ["12-Cup", "8-Cup"],
    },
    {
      id: "8",
      title: "Bluetooth Speaker",
      description: "Portable Bluetooth speaker with 360-degree sound and waterproof design. Perfect for outdoor adventures.",
      price: 129.99,
      discountPrice: 89.99,
      image: "/products/6g.png",
      rating: 4.6,
      reviews: 923,
      category: "Electronics",
      inStock: true,
      sizes: ["Compact", "Large"],
    },
    {
      id: "9",
      title: "Smart Home Hub",
      description: "Central control hub for all your smart home devices with voice control and easy setup.",
      price: 149.99,
      image: "/products/7g.png",
      rating: 4.5,
      reviews: 445,
      category: "Electronics",
      inStock: true,
      sizes: ["Standard"],
    },
    {
      id: "10",
      title: "Gaming Mechanical Keyboard",
      description: "RGB mechanical gaming keyboard with customizable keys and tactile feedback. Built for gaming excellence.",
      price: 159.99,
      discountPrice: 119.99,
      image: "/products/8b.png",
      rating: 4.8,
      reviews: 1567,
      category: "Gaming",
      inStock: true,
      sizes: ["TKL", "Full Size"],
    },
    {
      id: "11",
      title: "Wireless Mouse",
      description: "Precision wireless mouse with ergonomic design and long battery life. Perfect for work and gaming.",
      price: 79.99,
      discountPrice: 59.99,
      image: "/products/1g.png",
      rating: 4.6,
      reviews: 789,
      category: "Electronics",
      inStock: true,
      sizes: ["Standard"],
    },
    {
      id: "12",
      title: "Portable Power Bank",
      description: "High-capacity power bank with fast charging and multiple USB ports. Never run out of battery again.",
      price: 69.99,
      discountPrice: 49.99,
      image: "/products/2g.png",
      rating: 4.7,
      reviews: 1234,
      category: "Electronics",
      inStock: true,
      sizes: ["10,000mAh", "20,000mAh"],
    },
  ];

  const addToCart = (item: CartItem) => {
    setCartItems(prev => [...prev, item]);
    // You can also pass this to a global cart context or parent component
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('addToCart', { detail: item });
      window.dispatchEvent(event);
    }
  };

  const quickAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product && product.inStock) {
      const defaultItem: CartItem = {
        productId: productId,
        size: product.sizes[0] || 'Standard',
        quantity: 1
      };
      addToCart(defaultItem);
    }
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setIsPopupOpen(true);
  };

  const closeProductDetail = () => {
    setIsPopupOpen(false);
    setSelectedProduct(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlistItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const calculateDiscount = (originalPrice: number, discountPrice: number) => {
    return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? "text-black" : "text-gray-300"
        }`}
      />
    ));
  };

  const isProductInCart = (productId: string) => {
    return cartItems.some(item => item.productId === productId);
  };

  return (
    <>
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our handpicked selection of premium products
            </p>
            <div className="w-24 h-1 bg-black mx-auto mt-6 rounded-full"></div>
          </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              {/* Product Image Container */}
              <div className="relative overflow-hidden bg-gray-50 h-64">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Discount Badge */}
                {product.discountPrice && (
                  <div className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
                    -{calculateDiscount(product.price, product.discountPrice)}%
                  </div>
                )}

                {/* Stock Status */}
                {!product.inStock && (
                  <div className="absolute top-4 right-4 bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Out of Stock
                  </div>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
                >
                  <FaHeart
                    className={`w-4 h-4 ${
                      wishlistItems.includes(product.id) ? "text-red-500" : "text-gray-600"
                    }`}
                  />
                </button>

                {/* Quick View Button */}
                <button 
                  onClick={() => openProductDetail(product)}
                  className="absolute bottom-4 right-4 w-10 h-10 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:scale-110"
                >
                  <FaEye className="w-4 h-4 text-white" />
                </button>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Category */}
                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                  {product.category}
                </span>

                {/* Title */}
                <h3 className="text-lg font-bold text-black mt-2 mb-2 line-clamp-2 group-hover:text-gray-800 transition-colors duration-300">
                  {product.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex space-x-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-3 mb-6">
                  {product.discountPrice ? (
                    <>
                      <span className="text-2xl font-bold text-black">
                        ${product.discountPrice}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ${product.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-black">
                      ${product.price}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => quickAddToCart(product.id)}
                  disabled={!product.inStock}
                  className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    product.inStock
                      ? "bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <FaShoppingCart className="w-4 h-4" />
                  <span>
                    {isProductInCart(product.id)
                      ? "Added to Cart"
                      : product.inStock
                      ? "Add to Cart"
                      : "Out of Stock"}
                  </span>
                </button>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-black rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="group inline-flex items-center space-x-3 bg-black text-white font-semibold px-8 py-4 rounded-2xl hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            <span>Load More Products</span>
            <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
              <div className="w-2 h-2 bg-white rounded-full transform group-hover:scale-150 transition-transform duration-300"></div>
            </div>
          </button>
        </div>
        </div>
      </section>

      {/* Product Detail Popup */}
      {selectedProduct && (
        <ProductDetailPopup
          product={selectedProduct}
          isOpen={isPopupOpen}
          onClose={closeProductDetail}
          onAddToCart={addToCart}
        />
      )}
    </>
  );
};

export default Product;