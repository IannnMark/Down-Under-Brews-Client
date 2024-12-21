import { useState, useRef, useEffect, createContext, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBox,
  faTachometerAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SideBarContext = createContext();

export default function Sidebar() {
  const [expanded] = useState(true);
  const [open, setOpen] = useState(false);
  const [showProductsSubmenu, setShowProductsSubmenu] = useState(false);
  const sidebarRef = useRef(null);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {!open && (
        <div className="fixed top-5 left-5 z-50 my-24">
          <button
            onClick={toggleDrawer}
            className="p-2 bg-gray-400 text-black rounded focus:outline-none"
          >
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
        </div>
      )}

      {open && (
        <motion.div
          ref={sidebarRef}
          initial={{ width: expanded ? 256 : 80 }}
          animate={{ width: expanded ? 256 : 80 }}
          className="fixed top-0 left-0 h-screen bg-gray-800 text-white flex flex-col border-r shadow-lg z-40"
        >
          <SideBarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3 space-y-2 mt-6">
              <SidebarItem
                icon={<FontAwesomeIcon icon={faTachometerAlt} />}
                text="Dashboard"
                to="/dashboard"
              />
              <li className="relative">
                <button
                  onClick={() => setShowProductsSubmenu((prev) => !prev)}
                  className="flex items-center py-2 px-3 my-1 font-medium rounded-md text-gray-400 w-full hover:bg-gray-600 transition-colors"
                >
                  <FontAwesomeIcon icon={faBox} className="mr-2" />
                  <span>Products</span>
                </button>
                {showProductsSubmenu && (
                  <ul className="pl-4">
                    <SidebarItem
                      icon={<FontAwesomeIcon icon={faBox} />}
                      text="Products"
                      to="/admin/products"
                    />
                    <SidebarItem
                      icon={<FontAwesomeIcon icon={faBox} />}
                      text="Archived Products"
                      to="/admin/archived-products"
                    />
                    <SidebarItem
                      icon={<FontAwesomeIcon icon={faPlus} />}
                      text="Create Product"
                      to="/admin/create-product"
                    />
                  </ul>
                )}
              </li>
            </ul>
          </SideBarContext.Provider>
        </motion.div>
      )}
    </>
  );
}

function SidebarItem({ icon, text, to }) {
  const { expanded } = useContext(SideBarContext);

  return (
    <motion.li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-gray-600 text-gray-400`}
    >
      {icon}
      <Link
        to={to}
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </Link>
    </motion.li>
  );
}
