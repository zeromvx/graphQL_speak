import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ApolloClient, createHttpLink, InMemoryCache, ApolloProvider} from '@apollo/client';

const cache = new InMemoryCache({});
// const link = createHttpLink({
//     uri: 'http://localhost:6006/graphql'
// });

const client = new ApolloClient({
    cache,
    uri: 'http://localhost:6006/graphql',
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    document.getElementById('root')
);