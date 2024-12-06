const FIRContract = artifacts.require("FIRContract");

module.exports = function (deployer) {
  deployer.deploy(FIRContract);
};
