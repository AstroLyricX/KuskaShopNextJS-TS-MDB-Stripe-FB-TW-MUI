import { Container } from "@/app/components/Container";
import { ManageProductsClient } from "./ManageProductsClient";
import getProducts from "@/actions/getProducts";
import { getCurrenUser } from "@/actions/getCurrenUser";
import { NullData } from "@/app/components/NullData";

const ManageProducts = async () => {
  const products = await getProducts({ category: null });
  const currentUser = await getCurrenUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="¡Ups! Acceso denegado" />;
  }

  return (
    <div className="pt-8">
      <Container>
        <ManageProductsClient products={products} />
      </Container>
    </div>
  );
};

export default ManageProducts;
