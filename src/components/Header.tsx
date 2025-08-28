import Link from "next/link";
import { FaHome, FaBell, FaShoppingCart } from "react-icons/fa";

const Header = () => {
  return (
    <header>
      <div className="flex justify-between items-center p-2 mb-2 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <img src="logo.png" alt="logo" className="w-8 object-contain" />
          <p className="text-lg font-bold text-gray-600 uppercase">
            E-commerce
          </p>
        </div>

        <div className="flex gap-2">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search"
            className="  shadow-lg rounded-xl px-2 py-1 w-64"
          />
          {/* add icon home, notification, cart */}
          <Link
            href="#"
            className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
          >
            <FaHome size={20} />
          </Link>
          <Link
            href="#"
            className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
          >
            <FaBell size={20} />
          </Link>
          <Link
            href="#"
            className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
          >
            <FaShoppingCart size={20} />
          </Link>
          {/* add Sign in */}
          <Link
            href="#"
            className="flex items-center gap-1 rounded-lg text-gray-600 hover:text-gray-800 font-semibold"
          >
            Sign in
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
