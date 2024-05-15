export const apiConfig = {
  host: process.env.REACT_APP_API_HOST || 'http://localhost:3080/graphql', //process.env.REACT_APP_API_HOST,
  port: process.env.REACT_APP_API_PORT || 3080,
  url:  process.env.REACT_APP_API_UR || 'http://localhost:3080/graphql', //process.env.REACT_APP_API_URL,
}

export const clientConfig = {
  tokenName: process.env.TOKEN_NAME || 'tokenId_graph'
}
