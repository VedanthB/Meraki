/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { CheckoutWizard, Layout } from "../components";
import { getError, Store } from "../utils";

export default function PlaceOrderScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0),
  );
  const shippingPrice = itemsPrice > 2000 ? 0 : 50;
  const taxPrice = round2(itemsPrice * 0.1);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/orders", {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: "CART_CLEAR_ITEMS" });
      Cookies.set(
        "cart",
        JSON.stringify({
          ...cart,
          cartItems: [],
        }),
      );

      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router]);

  return (
    <Layout>
      <CheckoutWizard activeStep={2} />
      <h1 className="mb-4 text-xl">Place Order</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card p-5 bg-cyan-50 text-slate-900">
              <h2 className="mb-1 text-lg">Shipping Address</h2>
              <div>
                {shippingAddress.fullName}, {shippingAddress.address},{" "}
                {shippingAddress.city}, {shippingAddress.country}.{" "}
                {shippingAddress.postalCode}
              </div>
              <div className="text-cyan-500 mt-2">
                <Link href="/shipping">
                  <a className="flex items-center gap-1.5 text-md">
                    Edit
                    <i className="fa-solid fa-pen-to-square" />
                  </a>
                </Link>
              </div>
            </div>

            <div className="card p-5 bg-cyan-50 text-slate-900">
              <h2 className="mb-1 text-lg">Payment Method</h2>
              <div>{paymentMethod}</div>
              <div className="text-cyan-500 mt-2">
                <Link href="/payment">
                  <a className="flex items-center gap-1.5 text-md">
                    Edit
                    <i className="fa-solid fa-pen-to-square" />
                  </a>
                </Link>
              </div>
            </div>

            <div className="card overflow-x-auto p-5 overflow-y-scroll max-h-96 bg-cyan-50 text-slate-900">
              <h2 className="mb-2 text-lg">Order Items</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="p-5 text-center">Quantity</th>
                    <th className="p-5 text-center">Price</th>
                    <th className="p-5 text-center">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id} className="border-b">
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
                        Rs.{item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-cyan-500 mt-3">
                <Link href="/cart">
                  <a className="flex items-center gap-1.5 text-md">
                    Edit
                    <i className="fa-solid fa-pen-to-square" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="card p-5 h-fit bg-cyan-50 text-slate-900">
            <h2 className="mb-2 text-lg">Order Summary</h2>
            <ul>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Subtotal:</div>
                  <div>Rs.{itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Tax:</div>
                  <div>Rs.{taxPrice}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Shipping:</div>
                  <div>Rs.{shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Total:</div>
                  <div>Rs.{totalPrice}</div>
                </div>
              </li>
              <li>
                <button
                  disabled={loading}
                  onClick={placeOrderHandler}
                  className="primary-button w-full"
                >
                  {loading ? "Loading..." : "Place Order"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}

PlaceOrderScreen.auth = true;
