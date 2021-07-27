import dynamic from 'next/dynamic';

// Note: dynamic importすることでSSRを抑制する
const Csrable = dynamic(() => import('./Component'), {
  ssr: false,
});

export default Csrable;
