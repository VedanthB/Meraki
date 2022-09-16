/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";

export default function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full ">
              <thead className="border-b">
                <tr>
                  <th className="p-5 text-left">Item</th>
                  <th className="p-5 text-center">Quantity</th>
                  <th className="p-5 text-center">Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link href={`/product/${item.slug}`}>
                        <a className="flex items-center p-2 gap-2">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={70}
                            height={70}
                          />
                          &nbsp;
                          {item.name}
                        </a>
                      </Link>
                    </td>
                    <td className="p-5 text-center">{item.quantity}</td>
                    <td className="p-5 text-center">Rs.{item.price}</td>
                    <td className="p-5 text-center">
                      <button
                        type="button"
                        onClick={() => removeItemHandler(item)}
                      >
                        <i className="fa-solid fa-trash-can text-cyan-600 text-xl" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5 h-max bg-cyan-50">
            <ul>
              <li>
                <div className="text-xl mb-1">
                  Subtotal: Rs.
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </div>
              </li>
              <li>
                <div className="text-xl">
                  Quantity: {cartItems.reduce((a, c) => a + c.quantity, 0)}
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => router.push("/shipping")}
                  className="primary-button w-full mt-4"
                >
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}
