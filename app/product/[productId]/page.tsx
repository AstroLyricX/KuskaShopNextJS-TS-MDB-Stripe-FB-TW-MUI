import { Container } from "@/app/components/Container";
import { ProductDetails } from "./ProductDetails";
import { ListRating } from "./ListRating";
import getProductById from "@/actions/getProductById";
import { NullData } from "@/app/components/NullData";
import { AddRating } from "./AddRating";
import { getCurrenUser } from "@/actions/getCurrenUser";

interface IParams {
  productId?: string;
}

const Product = async ({ params }: { params: IParams }) => {
  const product = await getProductById(params);
  const user = await getCurrenUser();

  if (!product)
    return (
      <NullData title="¡Ups! El producto con el ID proporcionado no existe."></NullData>
    );

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <AddRating product={product} user={user} />
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default Product;
