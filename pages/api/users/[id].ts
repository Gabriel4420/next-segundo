import { NextApiHandler } from "next";
import database from "../../../libs/prisma";
import { Role } from "@prisma/client";
import api from "../../../libs/api";

const bringOneuser: NextApiHandler = async (req, res) => {
  const { id } = req.query;

  await api.getOneUser(parseInt(id as string), res);
  
};

const updateUser: NextApiHandler = async (req, res) => {
    const { id } = req.query;
    const { name, email, role, active } = req.body;


    const existingUser = await database?.user.findFirst({
      where: {
        id: parseInt(id as string)
      }
    })
  
    if (!existingUser) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    
    let data: {
        name?:string,
        email?:string,
        active?:boolean,
        role?:Role
    } = {
    };

    if (name) {
      data.name = name;
    }
    if(active){
        switch(active){
            case "true":
            case "1":
            case true: 
                data.active = true;
                break;
            case "false":
            case "0":
            case false:
                data.active = false;
                break;
        }
    }

    if(role){
        switch(role){
            case "admin":
            case "ADMIN":
                data.role = "ADMIN";
                break;
            case "user":
            case "USER":
                data.role = "USER";
                break;
        }
    }

    if(email){
        data.email = email
    }
  
    const updatedUser = await database?.user.update({
      where: {
        id: parseInt(id as string)
      },
      data
    })
  
    return res.status(200).json({ status: true, user: updatedUser });
  
  };


  const deleteUser: NextApiHandler = async (req, res) => {
    const { id, choice } = req.query;

    if(choice === "true"){
    
    const user = await database.user.delete({
      where: { id: parseInt(id as string) },
    });
    return res.status(200).json({ status: true, user });

  }else{
    return deactivateUser(req, res);
  }
  }

  const deactivateUser: NextApiHandler = async (req, res) => {
    const { id } = req.query;
    const user = await database.user.update({
      where: { id: parseInt(id as string) },
      data: { active: false },
    });
    return res.status(200).json({ status: true, user });
  }


  const handler: NextApiHandler = async (req, res) => {
    switch (req.method) {
      case "GET":
        bringOneuser(req, res);
        break;
      case "PUT":
        updateUser(req, res);
        break;
      case "DELETE":
        deleteUser(req, res);
        break;
      case "PATCH":
        deactivateUser(req, res);
        break;
    }
  };
  
  

export default handler;
