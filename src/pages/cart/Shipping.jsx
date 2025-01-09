import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";

export default function Shipping() {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const shippingAddress = { fullName, address, city, postalCode, country };

    localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));

    navigate("/confirm");
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <CheckoutSteps shipping confirmOrder payment />
      <h1 className="text-2xl font-semibold text-center">Shipping Address</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Postal Code</label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-red-950 text-white py-2 px-4 mt-4 rounded w-full hover:bg-gray-800"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
