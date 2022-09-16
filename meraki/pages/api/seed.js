import { User } from "../../models";
import { data, db } from "../../utils";

const handler = async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await db.disconnect();
  res.send({ message: "seeded successfully" });
};
export default handler;
