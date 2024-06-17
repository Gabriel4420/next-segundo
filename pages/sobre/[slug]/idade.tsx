import { useRouter } from "next/router";

const Idade = () => {
  const { slug, idade } = useRouter().query;
  return (
    <div>
      <h1>
        {slug} tem {idade} anos
      </h1>
    </div>
  );
};

export default Idade;
