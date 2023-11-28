import { Container } from "@/app/components/Container";
import { OrderDetails } from "./OrderDetails";
import getOrderById from "@/actions/getOrderById";
import { IPrams } from "./page";

export const Order = async ({ params }: { params: IPrams }) => {
  const order = await getOrderById(params);

  return (
    <div className="p-8">
      <Container>
        <OrderDetails order={order} />
        <div className="flex flex-col mt-20 gap-4">
          <div>Agregar Calificación </div>
          <ListRating order={order} />
        </div>
      </Container>
    </div>
  );
};
