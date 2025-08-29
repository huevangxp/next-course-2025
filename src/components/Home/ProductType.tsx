"use client";
import Link from "next/link";
import { FaLaptop, FaMobile, FaTshirt, FaHome, FaGamepad, FaBook, FaHeartbeat, FaCar } from "react-icons/fa";

interface ProductTypeCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  productCount: number;
}

const ProductType = () => {
  const productTypes: ProductTypeCard[] = [
    {
      id: "electronics",
      title: "Electronics",
      description: "Latest gadgets and tech",
      icon: <FaLaptop size={24} />,
      productCount: 1250,
    },
    {
      id: "mobile",
      title: "Mobile & Tablets",
      description: "Smartphones and tablets",
      icon: <FaMobile size={24} />,
      productCount: 890,
    },
    {
      id: "fashion",
      title: "Fashion",
      description: "Trendy clothing and accessories",
      icon: <FaTshirt size={24} />,
      productCount: 2100,
    },
    {
      id: "home",
      title: "Home & Living",
      description: "Furniture and home decor",
      icon: <FaHome size={24} />,
      productCount: 670,
    },
    {
      id: "gaming",
      title: "Gaming",
      description: "Games and gaming accessories",
      icon: <FaGamepad size={24} />,
      productCount: 450,
    },
    {
      id: "books",
      title: "Books",
      description: "Educational and entertainment",
      icon: <FaBook size={24} />,
      productCount: 1800,
    },
    {
      id: "health",
      title: "Health & Beauty",
      description: "Wellness and beauty products",
      icon: <FaHeartbeat size={24} />,
      productCount: 920,
    },
    {
      id: "automotive",
      title: "Automotive",
      description: "Car parts and accessories",
      icon: <FaCar size={24} />,
      productCount: 340,
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productTypes.map((type, index) => (
            <Link
              key={type.id}
              href={`/category/${type.id}`}
              className="group relative bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Card Content */}
              <div className="relative z-10">
                {/* Icon Container */}
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                  {type.icon}
                  <div className="absolute inset-0 bg-white rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-black mb-2 group-hover:text-gray-800 transition-colors duration-300">
                  {type.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {type.description}
                </p>

                {/* Product Count */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {type.productCount.toLocaleString()} items
                  </span>
                  <div className="w-6 h-6 border-2 border-black rounded-full flex items-center justify-center group-hover:bg-black transition-all duration-300">
                    <div className="w-2 h-2 bg-transparent group-hover:bg-white rounded-full transition-all duration-300 transform group-hover:scale-150"></div>
                  </div>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-black rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Corner Accent */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-150"></div>
            </Link>
          ))}
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="group inline-flex items-center space-x-3 bg-black text-white font-semibold px-8 py-4 rounded-2xl hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span>View All Categories</span>
            <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
              <div className="w-2 h-2 bg-white rounded-full transform group-hover:scale-150 transition-transform duration-300"></div>
            </div>
            <div className="absolute inset-0 bg-white rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductType;