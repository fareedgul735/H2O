import { getGuestId } from "./helper";

import picuture from "../../public/WhatsApp Image 2026-01-07 at 11.05.58 PM.jpeg";

const productId = getGuestId();

export const products = [
  {
    id: productId,
    img: picuture,
    des: "",
    name: "Bottle 500ml",
    price: 1200,
    size: "500ml",
    bottlesPerCarton: 12,
    minCarton: 5,
  },
  {
    id: productId,
    img: picuture,
    des: "",
    name: "Bottle 1500ml",
    price: 1500,
    size: "1500ml",
    bottlesPerCarton: 6,
    minCarton: 4,
  },
  // {
  //   id: productId,
  //   img: picuture,
  //   des: "",
  //   name: "Bottle 6 Liter",
  //   price: 1800,
  //   size: "6L",
  //   bottlesPerCarton: 2,
  //   minCarton: 3,
  // },
];



