
import ProductList from "@/components/ProductList"; 
import { fetchProducts } from "@/sanity/lib/fetchProducts";

const ProductPage = async () => {
  const products = await fetchProducts(); 
  return <ProductList products={products} />; 
};

export default ProductPage;
