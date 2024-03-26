"use client";
import React, { useEffect, useState } from "react";
import Container from "../../components/ui/container";
import { fetchAllProducts } from "../../hooks/fetchProducts";
import Link from "next/link";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [text, setText] = useState("");
  const [isInputActive, setIsInputActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categoryNames = {
    1: "Supplements",
    2: "Gym equipment",
    3: "Gym attire",
    4: "Accesories",
    5: "Books & Guides",
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && products.length === 0) {
      setLoading(true);
      fetchAllProducts(token)
        .then((data) => {
          setProducts(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching products: ", err);
          setError("Failed to fetch products.");
          setLoading(false);
        });
    }
  }, [fetchAllProducts]);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(text.toLowerCase()) &&
      (selectedCategory === "all" ||
        product.categoryId.toString() === selectedCategory)
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    if ((currentPage - 1) * itemsPerPage >= filteredProducts.length) {
      setCurrentPage(1);
    }
  }, [filteredProducts, currentPage, itemsPerPage]);

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#030712] to-[#210303] text-gray-50  flex flex-col justify-start">
      <Container className="w-full pt-40 pb-16 px-20">
        <h1 className="text-3xl font-semibold mb-16">Explore our products</h1>
        <div className="flex space-x-4 mb-8 justify-start w-full">
          <div className="relative rounded-lg shadow-sm border">
            {isInputActive && (
              <p className="text-sm absolute -top-6 text-zinc-500 animate-fade-in duration-300 ease-in-out">
                Try searching by a product name (i.e: &quot;protein&quot;)
              </p>
            )}
            <div className="pointer-events-none absolute inset-y-0 left-0 grid place-content-center">
              <Search className="w-5 h-5 ml-1 text-gray-400" />
            </div>
            <input
              value={text}
              placeholder="Search..."
              onFocus={() => setIsInputActive(true)}
              onBlur={() => setIsInputActive(false)}
              onChange={(e) => setText(e.target.value)}
              className="block w-[360px] rounded-md border-0 py-1.5 pl-8 bg-transparent ring-0 active:ring-0"
            />
          </div>
          <Select onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="bg-slate-950 text-white">
              <SelectItem value="all">All</SelectItem>
              {Object.entries(categoryNames).map(([id, name]) => (
                <SelectItem key={id} value={id}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex justify-center items-center space-x-1">
            {Array.from(
              { length: Math.ceil(filteredProducts.length / itemsPerPage) },
              (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  disabled={currentPage === index + 1}
                  className={`px-4 py-2 text-base rounded-md border transition-colors duration-200 ${
                    currentPage === index + 1
                      ? "bg-red-600/40 text-white border-slate-100 cursor-default"
                      : "text-red-500 border-gray-300 hover:bg-red-500/30"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
        {loading && <p>Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && products?.length === 0 && (
          <p>No products found.</p>
        )}
        <div className="grid sm:grid-cols-3 gap-5">
          {currentItems.map((product, idx) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className="mb-4"
            >
              <div className="bg-[#111827] rounded-3xl w-full h-96 mb-2 border border-slate-700">
                {product.image && (
                  <Image
                    className="w-full object-cover"
                    src={product.image[0]}
                  />
                )}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-lg line-clamp-1 font-semibold">
                  {product.name}
                </p>
                <p className="text-2xl font-bold text-red-100">
                  ${product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ProductsPage;
