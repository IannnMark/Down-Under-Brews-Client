import { Link } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import Logo from "../../images/logo.png";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="bg-white shadow-lg py-3 text-base text-red-900">
      <div className="flex items-center justify-between w-full px-4 md:px-6 lg:px-8">
        <Link to="/">
          <img
            src={Logo}
            alt="Down Under Brews Logo"
            className="h-8 sm:h-10 flex-shrink-0 hover:opacity-95 hover:shadow-current hover:scale-105 rounded transition duration-300"
          />
        </Link>

        <div className="hidden sm:flex gap-4 justify-center flex-grow">
          <nav className="flex gap-6 uppercase font-medium">
            <Link to="/product" className="hover:text-black px-4 py-2">
              Our Coffee
            </Link>
            <Link to="/about-us" className="hover:text-black px-4 py-2">
              About Us
            </Link>
            <Link to="/shop" className="hover:text-black px-4 py-2">
              Shop
            </Link>
            <Link to="/visit-us" className="hover:text-black px-4 py-2">
              Visit Us
            </Link>
            <Link to="/contact" className="hover:text-black px-4 py-2">
              Contact
            </Link>
          </nav>
        </div>

        <div className="hidden sm:flex items-center gap-4">
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <span className="hover:text-black px-4 py-2">Sign In</span>
            )}
          </Link>
          <form className="flex items-center border border-gray-400 rounded overflow-hidden">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent px-2 py-1 focus:outline-none"
            />
            <button className="px-2">
              <FaSearch className="cursor-pointer" size={18} />
            </button>
          </form>
          <div className="relative">
            <FaShoppingCart size={20} className="hover:text-black" />
          </div>
        </div>

        <div className="relative sm:hidden">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="font-bold text-xl hover:shadow-lg flex-shrink-0 transition duration-300 hover:text-black hover:scale-105"
          >
            {showMenu ? <GrClose /> : <GiHamburgerMenu />}
          </button>

          {showMenu && (
            <div
              className="absolute top-10 right-0 bg-white shadow-current flex flex-col items-start p-4 gap-3 z-10 w-48"
              onClick={(e) => e.stopPropagation()}
            >
              <Link
                to="/product"
                className="uppercase hover:text-black"
                onClick={() => setShowMenu(false)}
              >
                Our Coffee
              </Link>
              <Link
                to="/about-us"
                className="uppercase hover:text-black"
                onClick={() => setShowMenu(false)}
              >
                About Us
              </Link>
              <Link
                to="/shop"
                className="uppercase hover:text-black"
                onClick={() => setShowMenu(false)}
              >
                Shop
              </Link>
              <Link
                to="/visit-us"
                className="uppercase hover:text-black"
                onClick={() => setShowMenu(false)}
              >
                Visit Us
              </Link>
              <Link
                to="/contact"
                className="uppercase hover:text-black"
                onClick={() => setShowMenu(false)}
              >
                Contact
              </Link>
              <Link
                to="/profile"
                className="uppercase hover:text-black"
                onClick={() => setShowMenu(false)}
              >
                {currentUser ? "Profile" : "Sign In"}
              </Link>
              <form className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-gray-100 px-2 py-1 rounded focus:outline-none"
                />
                <button>
                  <FaSearch className="cursor-pointer" size={20} />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
