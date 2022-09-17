import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../components";

export default function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;
  return (
    <Layout>
      <h1 className="text-xl">Access Denied</h1>
      {message && <div className="mb-4 text-red-500">{message}</div>}
    </Layout>
  );
}
