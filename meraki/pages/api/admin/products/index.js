/* eslint-disable prefer-template */
/* eslint-disable no-else-return */
import { getSession } from "next-auth/react";
import { Product } from "../../../../models";
import { db } from "../../../../utils";

const getHandler = async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
};

const postHandler = async (req, res) => {
  await db.connect();
  const newProduct = new Product({
    name: "name",
    slug: "slug" + Math.random(),
    image: "/images/default-image.png",
    price: 0,
    category: "category",
    brand: "brand",
    countInStock: 0,
    description: "description",
    rating: 0,
    numReviews: 0,
  });

  const product = await newProduct.save();
  await db.disconnect();
  res.send({ message: "Product created successfully", product });
};

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send("admin signin required");
  }
  if (req.method === "GET") {
    return getHandler(req, res);
  } else if (req.method === "POST") {
    return postHandler(req, res);
  } else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};

export default handler;
