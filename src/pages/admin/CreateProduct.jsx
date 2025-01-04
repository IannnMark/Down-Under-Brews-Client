import { faBullseye } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://down-under-brews-api.vercel.app/api"
    : "/api";

export default function CreateProduct() {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [weights, setWeights] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [productImagesPreview, setProductImagesPreview] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    category: "",
    origin: "",
    roastLevel: "",
    availableWeights: [],
    availability: false,
    processingMethod: "",
    harvestSeason: "",
    certifications: "",
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const oversizedFiles = files.filter((file) => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setError("Images must be less than 5MB each.");
      return;
    }

    setError(null);
    setProductImages(files);
    setProductImagesPreview(files.map((file) => URL.createObjectURL(file)));
  };

  const handleRemoveImage = (index) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
    setProductImagesPreview((prev) => prev.filter((_, i) => i !== index));
  };

  const addWeight = () => {
    setWeights([...weights, { weight: "", stock: 0, price: 0 }]);
  };

  const handleWeightChange = (index, field, value) => {
    const updatedWeights = weights.map((weight, i) =>
      i === index ? { ...weight, [field]: value } : weight
    );
    setWeights(updatedWeights);
  };

  const removeWeight = (index) => {
    setWeights(weights.filter((_, i) => i !== index));
  };

  const validateImages = () => {
    if (productImages.length === 0) {
      setError("Please upload at least one image.");
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateImages()) return;

    setLoading(true);
    setError(null);

    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "availableWeights") {
        formPayload.append("availableWeights", JSON.stringify(weights));
      } else {
        formPayload.append(key, value);
      }
    });

    productImages.forEach((image) => {
      formPayload.append("imageUrls", image);
    });

    try {
      const res = await fetch(`${apiUrl}/product/admin/product/new`, {
        method: "POST",
        credentials: "include",
        body: formPayload,
      });

      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        setError(data.message);
      } else {
        navigate("/admin/products");
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg my-7">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Create Product
      </h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Product Name"
          className="border p-3 rounded-lg"
          id="name"
          required
          onChange={handleChange}
          value={formData.name}
        />
        <textarea
          placeholder="Description"
          className="border p-3 rounded-lg"
          id="description"
          rows="4"
          required
          onChange={handleChange}
          value={formData.description}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Category"
            className="border p-3 rounded-lg"
            id="category"
            required
            onChange={handleChange}
            value={formData.category}
          />
          <input
            type="text"
            placeholder="Origin"
            className="border p-3 rounded-lg"
            id="origin"
            required
            onChange={handleChange}
            value={formData.origin}
          />
        </div>
        <select
          id="roastLevel"
          className="border p-3 rounded-lg"
          required
          onChange={handleChange}
          value={formData.roastLevel}
        >
          <option value="">Select Roast Level</option>
          <option value="Light">Light</option>
          <option value="Medium">Medium</option>
          <option value="Dark">Dark</option>
        </select>
        <select
          id="processingMethod"
          className="border p-3 rounded-lg"
          required
          onChange={handleChange}
          value={formData.processingMethod}
        >
          <option value="">Select Processing Method</option>
          <option value="Washed">Washed</option>
          <option value="Natural">Natural</option>
          <option value="Honey-Processed">Honey-Processed</option>
        </select>
        <input
          type="text"
          placeholder="Harvest Season"
          className="border p-3 rounded-lg"
          id="harvestSeason"
          onChange={handleChange}
          value={formData.harvestSeason}
        />
        <input
          type="text"
          placeholder="Certifications"
          className="border p-3 rounded-lg"
          id="certifications"
          onChange={handleChange}
          value={formData.certifications}
        />
        <div className="flex items-center gap-2">
          <label htmlFor="availability" className="text-gray-700">
            Availability:
          </label>
          <input
            type="checkbox"
            id="availability"
            onChange={handleChange}
            checked={formData.availability}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Available Weights:</label>
          {weights.map((weight, index) => (
            <div key={index} className="flex gap-2 items-center mb-2">
              <input
                type="text"
                placeholder="Weight"
                className="border p-2 rounded-lg"
                value={weight.weight}
                onChange={(e) =>
                  handleWeightChange(index, "weight", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Stock"
                className="border p-2 rounded-lg"
                value={weight.stock}
                onChange={(e) =>
                  handleWeightChange(index, "stock", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Price"
                className="border p-2 rounded-lg"
                value={weight.price}
                onChange={(e) =>
                  handleWeightChange(index, "price", e.target.value)
                }
              />
              <button
                type="button"
                onClick={() => removeWeight(index)}
                className="text-red-500 font-bold"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addWeight}
            className="text-blue-500 font-bold mt-2"
          >
            Add Weight
          </button>
        </div>

        <div>
          <label htmlFor="productImages">Upload Product Images</label>
          <input
            type="file"
            id="productImages"
            accept="image/*"
            className="ml-5 p-2"
            onChange={handleImageChange}
            multiple
            required
          />
        </div>
        {productImagesPreview.map((img, index) => (
          <div>
            <img
              key={index}
              src={img}
              alt={`Product Preview ${index}`}
              className="mt-3 w-20 h-20 object-cover rounded"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="p-3 text-red-800 rounded-lg uppercase hover:opacity-95"
            >
              Delete
            </button>
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Create Product"}
        </button>
      </form>
    </main>
  );
}
