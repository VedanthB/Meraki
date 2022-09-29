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
      return { ...state, loading: false, products: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}
export default function AdminProdcutsScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    products: [],
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/products`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, []);
  return (
    <Layout title="Admin Products">
      <div className="grid md:grid-cols-4 md:gap-16">
        <div className="card h-fit p-5 bg-cyan-50 text-slate-900">
          <ul className="flex flex-col gap-6">
            <li>
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin/orders">Orders</Link>
            </li>
            <li>
              <Link href="/admin/products">
                <a className="font-bold">Products</a>
              </Link>
            </li>
            <li>
              <Link href="/admin/users">Users</Link>
            </li>
          </ul>
        </div>
        <div className="overflow-x-auto md:col-span-3">
          <h1 className="text-xl">Products</h1>
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
                    <th className="p-5 text-center">NAME</th>
                    <th className="p-5 text-center">PRICE</th>
                    <th className="p-5 text-center">CATEGORY</th>
                    <th className="p-5 text-center">COUNT</th>
                    <th className="p-5 text-center">RATING</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-b">
                      <td className="p-5 text-center">
                        {product._id.substring(20, 24)}
                      </td>
                      <td className="p-5 text-center">{product.name}</td>
                      <td className="p-5 text-center">Rs.{product.price}</td>
                      <td className="p-5 text-center">{product.category}</td>
                      <td className="p-5 text-center">
                        {product.countInStock}
                      </td>
                      <td className="p-5 text-center">{product.rating}</td>
                      <td className="p-5">
                        <Link href={`/admin/product/${product._id}`}>Edit</Link>
                        <button className="text-cyan-500 ml-6">Delete</button>
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

AdminProdcutsScreen.auth = { adminOnly: true };
