import { Container } from "./components/Container";
import { NullData } from "./components/NullData";
import { HomeBanner } from "./components/nav/HomeBanner";
import { ProductCard } from "./components/products/ProductCard";
import getProducts, { getProductsParams } from "@/actions/getProducts";

interface HomeProps {
  searchParams: getProductsParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);

  if (products.length === 0) {
    return (
      <NullData title='"¡Ups! No se encontraron productos. Haz clic en "Todos" para borrar los filtros.'></NullData>
    );
  }

  // Filsher - Yates
  function shuffeArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledProducts = shuffeArray(products);

  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {shuffledProducts.map((product: any) => {
            return <ProductCard key={product.id} data={product} />;
          })}
        </div>
      </Container>
    </div>
  );
}
