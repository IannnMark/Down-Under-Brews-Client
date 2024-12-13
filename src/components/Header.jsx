import { FaSearch, FaShoppingCart } from "react-icons/fa";
import Logo from "../../images/logo.png";
export default function Header() {
  return (
    <header className="bg-white shadow-lg py-3 text-base text-red-900">
      <div className="flex items-center justify-between w-full px-4 md:px-6 lg:px-8">
        <img
          src={Logo}
          alt="Down Under Brews Logo"
          className="h-8 sm:h-10 flex-shrink-0 hover:opacity-95 hover:shadow-lg hover:scale-105 rounded transition duration-300"
        />
        <div className="hidden sm:flex gap-4 flex-grow justify-center mr-72">
          <nav className="flex gap-6 uppercase font-medium">
            <a className="hover:opacity-95 hover:shadow-lg hover:text-black rounded transition duration-300 px-4 py-2 hover:scale-105">
              Our Coffee
            </a>
            <a className="hover:opacity-95 hover:shadow-lg hover:text-black rounded transition duration-300 px-4 py-2 hover:scale-105">
              About Us
            </a>
            <a className="hover:opacity-95 hover:shadow-lg hover:text-black rounded transition duration-300 px-4 py-2 hover:scale-105">
              Shop
            </a>
            <a className="hover:opacity-95 hover:shadow-lg hover:text-black rounded transition duration-300 px-4 py-2 hover:scale-105">
              Visit Us
            </a>
            <a className="hover:opacity-95 hover:shadow-lg hover:text-black rounded transition duration-300 px-4 py-2 hover:scale-105">
              Contact
            </a>
          </nav>
        </div>

        <div className="absolute right-0 flex gap-6 items-center pr-3">
          <ul>
            <li className="transition duration-300 font-semibold hover:shadow-lg hover:text-black px-4 py-2 rounded hover:scale-105">
              Sign In
            </li>
          </ul>
          <form className="hidden lg:inline border border-gray-400 font-semibold hover:shadow-lg hover:text-black rounded hover:scale-105">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none"
            />
            <button>
              <FaSearch
                className="transition duration-300 font-semibold cursor-pointer"
                size={20}
              />
            </button>
          </form>
          <div className="relative">
            <FaShoppingCart
              size={20}
              className="transition duration-300 font-semibold hover:shadow-lg hover:text-black hover:scale-105 rounded"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
