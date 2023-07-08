import { ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Root } from './Root';
import './libraries/server'; // This does the magic
import { client } from './apolloconfig';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Root />
    </ApolloProvider>
  </React.StrictMode>
);
