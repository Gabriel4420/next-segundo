import { NextApiResponse } from "next";
import database from "./prisma";
import { validateNameAndEmail, validateUser } from "./validation";

export default {
  getAllUsers: async (page: number) => {
    const take = 3;
    // Offset dos itens
    let skip = 0;

    if (page) {
      skip = (page - 1) * take;
    }

    const users = await database.user.findMany({
      where: { active: true },
      select: { name: true, email: true, role: true },
      orderBy: { name: "asc" },
      skip,
      take,
    });

    return users;
  },

  getAllUsersWithLimit: async (limit: number) => {
    const users = await database.user.findMany({
      where: { active: true },
      select: { name: true, email: true, role: true },
      orderBy: { name: "asc" },
    });
    return users.slice(0, Number(limit));
  },

  getOneUser: async (id: number, res: any) => {
    const user = await database.user.findUnique({
      where: { id, active: true },
    });

    await validateUser(user, res);
  },

  getOneUserByEmail: async (email: string, res?: any) => {
    const user = await database.user.findFirst({
      where: { email, active: true },
    });

    return user;   
  },

  addUser: async (name: string, email: string, res: NextApiResponse) => {
     await validateNameAndEmail(name, email, res);

    

    const newUser = await database?.user
      .create({
        data: {
          name,
          email,
        },
      })
      .catch((error) => {
        return res.status(400).json({
          status: false,
          error: {
            code: error.code,
            message: "Email must be unique or User already exists",
          },
        });
      });

    return newUser && res.status(201).json({ status: true, user: newUser });
  },
};
