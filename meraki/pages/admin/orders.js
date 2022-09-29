/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useReducer } from "react";
import axios from "axios";
import Link from "next/link";
import { Layout } from "../../components";
import { getError } from "../../utils";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

export default function AdminOrderScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/orders`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="grid md:grid-cols-4 md:gap-16">
        <div className="card h-fit p-5 bg-cyan-50 text-slate-900">
          <ul className="flex flex-col gap-6">
            <li>
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin/orders">
                <a className="font-bold">Orders</a>
              </Link>
            </li>
            <li>
              <Link href="/admin/products">Products</Link>
            </li>
            <li>
              <Link href="/admin/users">Users</Link>
            </li>
          </ul>
        </div>
        <div className="overflow-x-auto md:col-span-3">
          <h1 className="text-xl">Admin Orders</h1>

          {loading ? (
            <div className="mt-4">Loading...</div>
          ) : error ? (
            <div className="alert-error mt-4">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-center">ID</th>
                    <th className="p-5 text-center">USER</th>
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
                        {order.user ? order.user.name : "DELETED USER"}
                      </td>
                      <td className="p-5 text-center">
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td className="p-5 text-center">Rs.{order.totalPrice}</td>
                      <td className="p-5 text-center">
                        {order.isPaid
                          ? `${order.paidAt.substring(0, 10)}`
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
        </div>
      </div>
    </Layout>
  );
}

AdminOrderScreen.auth = { adminOnly: true };
