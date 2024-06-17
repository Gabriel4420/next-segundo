import { User } from "@prisma/client";
import { NextApiResponse } from "next";
import database from "./prisma";

export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
};

export const validateNameAndEmail = async (
  name: string,
  email: string,
  res: NextApiResponse
) => {
  validateEmail(email);
  const existingUser = await database.user.findFirst({
    where: { name },
  })

  if(existingUser){
    return res.status(400).json({ status: false, message: "User already exists" });
  }
  if (!name || !email) {
    return res
      .status(400)
      .json({ status: false, message: "Name and email are required" });
  }
};

export const validateUser = async (user: User | null, res: NextApiResponse) => {
  if (!user) {
    return res.json({ error: "User not found" });
  } else {
    return res.json({ status: true, data: user });
  }
};
