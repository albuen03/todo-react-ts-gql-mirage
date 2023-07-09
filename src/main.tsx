import { ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Root } from './Root';
import './libraries/server'; // This does the magic
import { client } from './apolloconfig';
import { ConfigProvider } from 'antd';
import colors from './colors';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: colors.red
          },
          components: {
            Pagination: {
              colorBgContainer: colors.background,
              colorBgTextHover: colors.background,
              colorBgTextActive: colors.background,
              borderRadius: 4,
            }
          }
        }}
      >
        <Root />
      </ConfigProvider>
    </ApolloProvider>
  </React.StrictMode>
);
