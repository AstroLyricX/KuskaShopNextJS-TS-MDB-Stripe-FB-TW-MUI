import { Container } from "@/app/components/Container";
import { FromWrap } from "@/app/components/FromWrap";
import { AddProductForm } from "./AddProductForm";
import { getCurrenUser } from "@/actions/getCurrenUser";
import { NullData } from "@/app/components/NullData";

const AddProducts = async () => {
  const currentUser = await getCurrenUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="¡Ups! Acceso denegado" />;
  }
  return (
    <div className="p-8">
      <Container>
        <FromWrap>
          <AddProductForm />
        </FromWrap>
      </Container>
    </div>
  );
};

export default AddProducts;
