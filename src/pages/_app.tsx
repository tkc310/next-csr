import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { URL } from '@/constants';
import type { AppProps } from 'next/app';
import '@styles/globals.css';
import { FC } from 'react';

const link = createHttpLink({
  uri: `${URL.API}/graphql/`,
  credentials: 'same-origin',
});
const cache = new InMemoryCache();
const client = new ApolloClient({
  link,
  cache,
});

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;
