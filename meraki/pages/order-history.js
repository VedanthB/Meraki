/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useReducer } from "react";
import axios from "axios";
import Link from "next/link";
import { getError } from "../utils";
import { Layout } from "../components";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function orderHistoryScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/history`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchOrders();
  }, []);
  return (
    <Layout>
      <h1>Order History</h1>

      {loading ? (
        <div>Loading..</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full mb-5">
            <thead className="border-b">
              <tr>
                <th className="px-5 text-center">ID</th>
                <th className="p-5 text-center">DATE</th>
                <th className="p-5 text-center">TOTAL</th>
                <th className="p-5 text-center">PAID</th>
                <th className="p-5 text-center">DELIVERED</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="p-5 text-center">
                    {order._id.substring(20, 24)}
                  </td>
                  <td className="p-5 text-center">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className="p-5 text-center">Rs.{order.totalPrice}</td>
                  <td className="p-5 text-center">
                    {order.isPaid
                      ? `${order.isPaid.substring(0, 10)}`
                      : "not paid"}
                  </td>
                  <td className="p-5 text-center">
                    {order.isDelivered
                      ? `${order.deliveredAt.substring(0, 10)}`
                      : "not delivered"}
                  </td>
                  <td className="p-5 text-center">
                    <Link href={`/order/${order._id}`} passHref>
                      <a className="text-cyan-500">Details</a>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}

orderHistoryScreen.auth = true;
export default orderHistoryScreen;
