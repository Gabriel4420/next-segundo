import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useState } from "react";
import api from "../libs/api";
import { User } from ".prisma/client";
import axios from "axios";

type Props = {
  users: User[];
};

const Usuarios = ({ users }: Props) => {
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [usersList, setUsersList] = useState<User[]>(users);
  const [showButton, setShowButton] = useState(true);

  const handleLoadMore = async () => {
    if (!loading) {
      setLoading(true);

      const {data} = await axios.get(`/api/users?page=${pageCount + 1}`);

      if(data.length === 0) {
        setShowButton(false);
      }

      setUsersList([...usersList, ...data]);

      setLoading(false);

      setPageCount(pageCount + 1);

      console.log(data);
    }
  };

  return (
    <div className="container mx-10 my-10 w-screen h-screen">
      <Head>
        <title>Usuários</title>
      </Head>
      <h1 className="text-3xl leading-loose font-bold text-center p-5">
        Usuarios Cadastrados
      </h1>

      {usersList.map((user, index) => (
        <div key={index} className="grid grid-cols-3 mx-10 ">
          <div className="font-thin flex">{user.name}</div>
          <div className="font-thin flex">
            {!user.active ? "ativo" : "inativo"}
          </div>
          <div className="font-thin flex">{user.role}</div>
        </div>
      ))}
{showButton && (loading ? (<div className="w-full h-20">2</div>) : (<div className="flex p-10 justify-center">
        <button
          onClick={handleLoadMore}
          className="p-2 border-2 cursor-pointer border-slate-500 text-slate-500 hover:bg-slate-500 hover:text-slate-100 rounded-md"
        >
          Carregar Mais
        </button>
      </div>
  
))}
      
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await api.getAllUsers(1);

  return {
    props: { users },
  };
};

export default Usuarios;
