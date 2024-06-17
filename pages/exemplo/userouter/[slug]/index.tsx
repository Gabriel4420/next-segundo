import { useRouter } from 'next/router';
import React from 'react';

// import { Container } from './styles';

const SobreItem: React.FC = () => {
    const router = useRouter();
    const {slug} = router.query;

 

  return <div>
    <h1>pagina de {slug}</h1>
    <p>pathname: {router.pathname}</p>
    <p>fallback: {router.isFallback.toString()}</p>
    <button onClick={() => router.push('/exemplo/userouter/felipe')}>Ir para a pagina de Felipe</button>
    <button onClick={() => router.replace('/exemplo/userouter/gabriel')}>Ir para a pagina de Gabriel</button>
    <button onClick={() => router.push({pathname: '/exemplo/userouter/pedro', query: {slug: 'Pedro'}})}>Ir para a pagina de Pedro</button>
  </div>;
}

export default SobreItem;