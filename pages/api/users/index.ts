import { NextApiHandler } from "next";
import api from '../../../libs/api';
import database from "../../../libs/prisma";

const bringUserHandler: NextApiHandler = async (req, res) => {

  const handleUsers = {
    limit: req.query,
    hasLimit: async (limit = req.query.limit) => {
      
      return res.status(200).json({ data: api.getAllUsersWithLimit(parseInt(limit as string))});
    },
    justUsers: async () => {
      const {page} = req.query;
      return res.status(200).json({ data: await api.getAllUsers(parseInt(page as string))})
    },
  };

  return req.query.limit ? handleUsers.hasLimit() : handleUsers.justUsers();
};

const createUser: NextApiHandler = async (req, res) => {
  const {name, email} = req.body;
  
  await api.addUser(name, email, res);


  
};


const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      bringUserHandler(req, res);
      break;
    case "POST":
      createUser(req, res);
      break;
   
  }
};

export default handler;
