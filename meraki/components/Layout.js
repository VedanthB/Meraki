/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from "next/head";
import Link from "next/link";
import React, { useContext } from "react";
import { Store } from "../utils";

export default function Layout({ children }) {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <>
      <Head>
        <title>Meraki</title>
        <meta name="description" content="An E-commerce application" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
          integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>

      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav className="flex h-14 items-center px-4 justify-between shadow-md">
            <Link href="/">
              <a className="text-lg font-bold">Meraki</a>
            </Link>
            <div>
              <Link href="/cart">
                <a className="p-2">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <span className="ml-1 rounded-full bg-cyan-600 px-2 py-1 text-xs font-bold text-white">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                  )}
                </a>
              </Link>
              <Link href="/login">
                <a className="p-2">Login</a>
              </Link>
            </div>
          </nav>
        </header>

        <main className="container m-auto mt-4 px-4">{children}</main>

        <footer className="h-12 text-2xl flex gap-5 justify-center items-center shadow-inner mt-4">
          <a
            href="https://github.com/Ananyamadhu08"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-github" />
          </a>
          <a
            href="https://twitter.com/AnanyaMadhu27"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-twitter" />
          </a>
          <a
            href="https://www.linkedin.com/in/ananya-madhu-74479b206/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-linkedin" />
          </a>
        </footer>
      </div>
    </>
  );
}
