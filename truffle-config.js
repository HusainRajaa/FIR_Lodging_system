module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost for Ganache
      port: 8545,            // Standard Ganache port
      network_id: "*",       // Any network (use * for a match with any network id)
    },
  },
  compilers: {
    solc: {
      version: "0.8.21",      // Specify Solidity version
    }
  }
};
