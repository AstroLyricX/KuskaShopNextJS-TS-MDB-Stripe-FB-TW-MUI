"use client";

import { Heading } from "@/app/components/Heading";
import { Status } from "@/app/components/Status";
import { formatPrice } from "@/utils/formatPrice";
import { Order } from "@prisma/client";
import moment from "moment";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import { OrderItem } from "./OrderItem";

interface OrderDetailsProps {
  order: Order;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
    <div className="max-w-[1150px] m-auto flex flex-col gap-2">
      <div className="mt-8">
        <Heading title="Detalles del Pedido" />
      </div>
      <div>ID de pedido: {order.id}</div>
      <div>
        Monto total:{" "}
        <span className="font-bold">{formatPrice(order.amount)}</span>{" "}
      </div>
      <div className="flex gap-2 items-center">
        <div>Estado de pago:</div>
        <div>
          {order.status === "pending" ? (
            <Status
              text="Pendiente"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700 "
            />
          ) : order.status === "complete" ? (
            <Status
              text="Completo"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700 "
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div>Estado de entrega:</div>
        <div>
          {order.deliveryStatus === "pending" ? (
            <Status
              text="Pendiente"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700 "
            />
          ) : order.deliveryStatus === "dispatched" ? (
            <Status
              text="Enviado"
              icon={MdDeliveryDining}
              bg="bg-purple-200"
              color="text-purple-700 "
            />
          ) : order.deliveryStatus === "delivered" ? (
            <Status
              text="Entregado"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700 "
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>Fecha: {moment(order.createDate).fromNow()}</div>
      <div>
        <h2 className="text-slate-950 font-bold mt-4 mb-2">
          Productos solicitados
        </h2>
        <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
          <div className="col-span-2 justify-self-start">PRODUCTO</div>
          <div className=" justify-self-center">PRECIO</div>
          <div className=" justify-self-center">CANTIDAD</div>
          <div className=" justify-self-end">TOTAL</div>
        </div>
        {order.products &&
          order.products.map((item) => {
            return <OrderItem key={item.id} item={item}></OrderItem>;
          })}
      </div>
    </div>
  );
};
