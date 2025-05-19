import ProductCard from "../components/product/ProductCard";
import Pagination from "../components/product/Pagination";
import { fetcher } from "../services/api";
import { useEffect, useState } from "react";
import { Product } from "../types";
import ProductModal from "../components/product/ProductModal";
import { useProductStore } from "../store/productStore";


const PRODUCTS_PER_PAGE = 6;

export default function Products() {
  // const [products, setProducts] = useState<Product[]>([]); // Added TypeScript type annotation
  const { products, isLoading} = useProductStore();
  // Fetch products when the component mounts

  // console.log(products)
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalConfig, setModalConfig] = useState<any>(null);

  // Calculate the total number of pages based on products length
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  // Get the products to display for the current page
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setModalConfig({
      software: product.specs.software,
      ram: product.specs.defaultSpecs.ram,
      storage: product.specs.defaultSpecs.storage,
      processor: product.specs.defaultSpecs.processor
    });
  };


  return (
    <main className="container mx-auto px-4 py-8 sm:py-16" id="products">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
        Choose Your Node Hardware
      </h2>

      {/* Display loading spinner or placeholder when data is loading */}
      {isLoading ? (
        <div className="text-center text-lg">Loading products...</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {currentProducts.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product)}
            />))}
        </div>
      )}

      {/* Render pagination only if there is more than one page */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        config={modalConfig}
        setConfig={setModalConfig}
      />
    </main>
  );
}
