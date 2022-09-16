/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

export default function ProductItem({ product }) {
  return (
    <div className="card bg-cyan-50 mt-4">
      <Link href={`/product/${product.slug}`}>
        <a>
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow h-72 w-full"
          />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-4">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-lg">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-1">{product.brand}</p>
        <p>Rs.{product.price}</p>
        <button className="primary-button mt-3 mb-1" type="button">
          Add to cart
        </button>
      </div>
    </div>
  );
}
