import { Container } from "@/app/components/Container";
import { getCurrenUser } from "@/actions/getCurrenUser";
import { NullData } from "@/app/components/NullData";
import getOrders from "@/actions/getOrders";
import { ManageOrdersClient } from "./ManageOrdersClient";

const ManageOrders = async () => {
  const orders = await getOrders();
  const currentUser = await getCurrenUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="¡Ups! Acceso denegado" />;
  }
  return (
    <div className="pt-8">
      <Container>
        <ManageOrdersClient orders={orders} />
      </Container>
    </div>
  );
};

export default ManageOrders;
