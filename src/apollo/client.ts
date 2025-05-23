import { ApolloClient, InMemoryCache } from '@apollo/client'

export const healthClient = new ApolloClient({
  uri: 'https://indexer.lswap.app/subgraphs/name/blocklytics/ethereum-blocks',
  cache: new InMemoryCache(),
})

export const taraxaBlockClient = new ApolloClient({
  uri: 'https://indexer.lswap.app/subgraphs/name/blocklytics/ethereum-blocks',
  cache: new InMemoryCache(),
  queryDeduplication: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
})

export const taraxaClient = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  cache: new InMemoryCache({
    typePolicies: {
      Token: {
        // Singleton types that have no identifying field can use an empty
        // array for their keyFields.
        keyFields: false,
      },
      Pool: {
        // Singleton types that have no identifying field can use an empty
        // array for their keyFields.
        keyFields: false,
      },
    },
  }),
  queryDeduplication: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
})
