import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUndo } from "@fortawesome/free-solid-svg-icons";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://down-under-brews-api.vercel.app/api"
    : "/api";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${apiUrl}/product/admin/archived-products`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success && Array.isArray(data.products)) {
        setProducts(data.products);
        setFilteredProducts(data.products);
      } else {
        console.log("No products found in the response.");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.roastLevel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.processingMethod
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        product.harvestSeason
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        product.certifications.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  if (loading) {
    return <p className="text-center text-red-950 text-xl">Loading Products</p>;
  }

  const handleRestoreProduct = async (productId) => {
    const confirmRestore = window.confirm(
      "Are you sure you want to restore this product?"
    );

    if (confirmRestore) {
      try {
        const res = await fetch(
          `${apiUrl}/product/admin/product/restore-product/${productId}`,
          {
            method: "PUT",
            credentials: "include",
          }
        );

        const data = await res.json();

        if (data.success === false) {
          console.log(data.message);
          return;
        }
        alert("Product restored successfully!");
        window.location.reload();
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const columns = [
    {
      name: "Image",
      selector: (row) => (
        <a
          href={row.imageUrls[0].url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={row.imageUrls[0].url}
            alt={row.name}
            className="w-10 h-10 object-cover"
          />
        </a>
      ),
      sortable: false,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Origin",
      selector: (row) => row.origin,
      sortable: true,
    },
    {
      name: "Roast Level",
      selector: (row) => row.roastLevel,
      sortable: true,
    },
    {
      name: "availableWeights",
      selector: (row) =>
        row.availableWeights.map(
          (weight) =>
            `${weight.weight}g - ${weight.stock} in stock - ${weight.price}`
        ),
    },
    {
      name: "availability",
      selector: (row) => (row.availability ? "Yes" : "No"),
      sortable: true,
    },
    {
      name: "processingMethod",
      selector: (row) => row.processingMethod,
      sortable: true,
    },
    {
      name: "harvestSeason",
      selector: (row) => row.harvestSeason,
      sortable: true,
    },
    {
      name: "certifications",
      selector: (row) => row.certifications,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <button
            className="text-green-800"
            onClick={() => handleRestoreProduct(row._id)}
          >
            <FontAwesomeIcon icon={faUndo} className="mr-1 h-5" />
          </button>

          <button
            className="text-red-800"
            onClick={() => handleArchivedProduct(row._id)}
          >
            <FontAwesomeIcon icon={faTrash} className="mr-1 h-5" />
          </button>
        </>
      ),
      sortable: false,
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="fixed top-0 left-0 h-screen bg-gray-800 text-white flex flex-col border-r shadow-lg z-40">
        <Sidebar />
      </div>
      <h1 className="text-3xl text-black font-semibold mb-4 text-center">
        Archived Products
      </h1>
      <DataTable
        columns={columns}
        data={filteredProducts}
        pagination
        progressPending={loading}
        persistTableHead
        highlightOnHover
        striped
        subHeader
        subHeaderComponent={
          <input
            type="text"
            className="border border-gray-400 rounded px-3 py-1"
            placeholder="Search...."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        }
      />
    </div>
  );
}
