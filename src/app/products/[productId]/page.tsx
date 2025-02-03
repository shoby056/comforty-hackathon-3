import { fetchProduct } from "@/sanity/lib/fetchProduct";
import ProductDetail from "@/components/ProductDetail";

const ProductDetailPage = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const { productId } = await params;
  const product = await fetchProduct(productId); 

  return (
    <div>
      <ProductDetail product={product} />
    </div>
  );
};

export default ProductDetailPage;
