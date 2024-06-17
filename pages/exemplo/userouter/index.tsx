import { useRouter } from 'next/router';
import React from 'react';

// import { Container } from './styles';

const ExemploUserouter: React.FC = () => {
    const router = useRouter();
    const {slug} = router.query;

    console.log(router.query.slug);

  return <div>
    <h1>pagina de {slug}</h1>
    <p>pathname: {router.pathname}</p>
    <p>fallback: {router.isFallback.toString()}</p>
  </div>;
}

export default ExemploUserouter;