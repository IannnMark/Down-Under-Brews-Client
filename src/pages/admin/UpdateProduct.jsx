import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://down-under-brews-api.vercel.app/api"
    : "/api";

export default function UpdateProduct() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
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

  useEffect(() => {
    const fetchProduct = async () => {
      const productId = params.productId;
      const res = await fetch(`${apiUrl}/product/product/${productId}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setFormData((prev) => ({
        ...prev,
        ...data,
      }));
      setWeights(data.availableWeights || []);
    };
    fetchProduct();
    console.log("Updated Form Data:", formData);
  }, [params.productId]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Validate file size
    const oversizedFiles = files.filter((file) => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setError("Images must be less than 5MB each");
      return;
    }

    // Clear previous states
    setError(null);
    setProductImagesPreview([]);
    setProductImages([]);

    // Update state with valid files
    setProductImages(files);

    // Generate preview for each file
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setProductImagesPreview((prev) => [...prev, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
    setProductImagesPreview((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
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
    if (productImages.length === 0 && formData.imageUrls.length === 0) {
      setError("Please upload at least one image");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateImages()) return;

    setLoading(true);
    setError(false);

    const formPayload = new FormData();

    // Append form fields
    formPayload.append("name", formData.name);
    formPayload.append("description", formData.description);
    formPayload.append("category", formData.category);
    formPayload.append("origin", formData.origin);
    formPayload.append("roastLevel", formData.roastLevel);
    formPayload.append("processingMethod", formData.processingMethod);
    formPayload.append("harvestSeason", formData.harvestSeason);
    formPayload.append("certifications", formData.certifications);
    formPayload.append("availability", formData.availability);
    formPayload.append("userRef", currentUser._id);

    // Append availableWeights as an array directly
    formPayload.append("availableWeights", JSON.stringify(weights)); // This needs to be handled correctly on the server side

    // Append images to formData
    if (productImages.length === 0 && formData.imageUrls.length > 0) {
      formData.imageUrls.forEach((url) => {
        formPayload.append("imageUrls", url);
      });
    } else {
      productImages.forEach((image) => {
        formPayload.append("imageUrls", image);
      });
    }

    // Send form data to backend
    try {
      const res = await fetch(
        `${apiUrl}/product/admin/product/update/${params.productId}`,
        {
          method: "PUT",
          credentials: "include",
          body: formPayload,
        }
      );

      const data = await res.json();
      console.log("API Response:", data); // <-- Log the response

      setLoading(false);

      if (data.success === false) {
        setError(data.message);
      } else {
        setSuccess("Product updated successfully!");
        console.log("Before Update:", formData);
        setFormData({
          ...formData,
          imageUrls: data.imageUrls,
          name: data.name,
          description: data.description,
          category: data.category,
          origin: data.origin,
          roastLevel: data.roastLevel,
          availableWeights: data.availableWeights,
          availability: data.availability,
          processingMethod: data.processingMethod,
          harvestSeason: data.harvestSeason,
          certifications: data.certifications,
        });
        console.log("After Update:", formData);

        navigate(`/admin/products`);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Update Product
      </h1>
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-grow gap-4"
      >
        <input
          type="text"
          placeholder="Product Name"
          className="border p-3 rounded-lg"
          id="name"
          required
          onChange={handleChange}
          value={formData.name}
        />
        <input
          type="text"
          placeholder="Description"
          className="border p-3 rounded-lg"
          id="description"
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
          />
        </div>
        {productImagesPreview.map((img, index) => (
          <div key={index}>
            <img
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
          disabled={loading || loading}
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
        {error && <p className="text-red-800 text-sm">{error}</p>}
      </form>
    </main>
  );
}
