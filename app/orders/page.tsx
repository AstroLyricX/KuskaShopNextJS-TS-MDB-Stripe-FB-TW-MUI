import { Container } from "@/app/components/Container";
import { OrderClient } from "./OrderClient";
import { getCurrenUser } from "@/actions/getCurrenUser";
import { NullData } from "@/app/components/NullData";
import getOrdersByUserId from "@/actions/getOrdersByUserId";

const Orders = async () => {
  const currentUser = await getCurrenUser();

  if (!currentUser) {
    return <NullData title="¡Ups! Acceso denegado" />;
  }

  const orders = await getOrdersByUserId(currentUser.id);

  if (!orders) {
    return <NullData title="Aún no hay pedidos..." />;
  }

  return (
    <div className="pt-8">
      <Container>
        <OrderClient orders={orders} />
      </Container>
    </div>
  );
};

export default Orders;
