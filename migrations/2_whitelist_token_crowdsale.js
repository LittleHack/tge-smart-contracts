var CommonToken = artifacts.require("./CommonToken.sol");
var Crowdsale = artifacts.require("./Crowdsale.sol");
var Whitelist = artifacts.require("./Whitelist.sol");

module.exports = function(deployer) {
  deployer.deploy(Whitelist).then(async () => {
      await deployer.deploy(Crowdsale, Whitelist.address);
      await deployer.deploy(CommonToken, Crowdsale.address);
      let crowdsaleInstance = await Crowdsale.deployed();
      await crowdsaleInstance.setToken(CommonToken.address);
  })
};