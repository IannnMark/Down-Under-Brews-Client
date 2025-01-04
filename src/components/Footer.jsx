import { PhoneIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
export default function Footer() {
  return (
    <div className="bg-red-950 text-orange-300 p-10">
      <div className="flex flex-col md:flex-row md:justify-between max-w-6xl mx-auto space-y-8 md:space-y-0">
        <div className="flex-1">
          <h3 className="text-[24px] font-[400] mb-4">Contact</h3>
          <p className="flex items-center font-[400]">
            <PhoneIcon className="h-5 w-5 mr-2 stroke-2" />
            Phone: (+61) 3 9123 4567
          </p>
          <p className="my-4 font-[400]">Email: info@downunderbrews.com</p>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faFacebookF}
                className="h-6 w-6 text-orange-300 hover:text-blue-600"
              />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                className="h-6 w-6 text-orange-300 hover:text-pink-600"
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faTwitter}
                className="h-6 w-6 text-orange-300 hover:text-blue-400"
              />
            </a>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-[24px] font-[400] mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="/services" className="hover:underline">
                Services
              </a>
            </li>
            <li>
              <a href="/blogs" className="hover:underline">
                Blogs
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:underline">
                Privacy and Policy
              </a>
            </li>
          </ul>
        </div>

        <div className="flex-1">
          <h3 className="text-[24px] font-[400] mb-4">Location</h3>
          <p>Address: Melbourne,</p>
          <p>Australia</p>
        </div>

        <div className="flex-1">
          <h3 className="text-[24px] font-[400] mb-4">Newsletter</h3>
          <p>Sign up for our newsletter to get the latest on new blends, </p>
          <p>special offers, and coffee tips. Plus, be the first to know </p>
          <p>about our sustainability efforts and local events.</p>
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 rounded bg-red-950 text-orange-300 border border-gray-400 mt-4 w-full md:w-auto"
          />
          <button className="bg-orange-300 text-red-950 py-2 rounded-lg mt-2 md:mt-4 h-[45px] w-full md:w-[133px]">
            Get Started
          </button>
        </div>
      </div>

      <div className="border-t border-orange-300 mt-8 pt-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Down Under Brews. All rights reserved.
        </p>
      </div>
    </div>
  );
}
