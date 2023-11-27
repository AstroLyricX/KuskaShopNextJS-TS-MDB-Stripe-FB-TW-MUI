"use client";

import { Button } from "@/app/components/Button";
import { ProductImage } from "@/app/components/products/ProductImage";
import { SetColor } from "@/app/components/products/SetColor";
import { SetQuantity } from "@/app/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart();

  const [isProductInCart, setIsProductInCart] = useState(false);

  const [cartProdruct, setCartProdruct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });

  const router = useRouter();

  // console.log(cartProducts);

  useEffect(() => {
    setIsProductInCart(false);
    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );

      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts, product.id]);

  const productRating = product.reviews.reduce(
    (acc: number, item: any) => item.rating + acc,
    0 / product.reviews.length
  );

  const handColorSelect = useCallback((value: SelectedImgType) => {
    setCartProdruct((prev) => {
      return { ...prev, selectedImg: value };
    });
  }, []);

  const handleQtyIncrease = useCallback(() => {
    if (cartProdruct.quantity === 99) {
      return;
    }

    setCartProdruct((prev) => {
      return { ...prev, quantity: ++prev.quantity };
    });
  }, [cartProdruct]);

  const handleQtyDecrease = useCallback(() => {
    if (cartProdruct.quantity === 1) {
      return;
    }

    setCartProdruct((prev) => {
      return { ...prev, quantity: --prev.quantity };
    });
  }, [cartProdruct]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImage
        cartProduct={cartProdruct}
        product={product}
        handleColorSelect={handColorSelect}
      />

      <div className="flex flex-col gap-1 text-slate-600 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} reviews </div>
        </div>
        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold">CATEGORÍA: </span> {product.category}
        </div>
        <div>
          <span className="font-semibold">MARCA: </span> {product.brand}
        </div>
        <div className={product.inStock ? "text-emerald-400" : "text-red-400"}>
          {product.inStock ? "En stock " : "Agotado"}
        </div>
        <Horizontal />

        {isProductInCart ? (
          <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
              <MdCheckCircle className="text-teal-400" size={24} />
              <span>Producto agregado al carrito</span>
            </p>
            <div className="max-w-[300px]">
              <Button
                label="Ver Carrito"
                outline
                onClick={() => router.push("/cart")}
              />
            </div>
          </>
        ) : (
          <>
            <SetColor
              cartProduct={cartProdruct}
              images={product.images}
              handColorSelect={handColorSelect}
            />
            <Horizontal />
            <SetQuantity
              cartProduct={cartProdruct}
              handleQtyIncrease={handleQtyIncrease}
              handleQtyDecrease={handleQtyDecrease}
            />
            <Horizontal />
            <div className="max-w-[300px]">
              <Button
                label="Añadir al Carro"
                onClick={() => handleAddProductToCart(cartProdruct)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
