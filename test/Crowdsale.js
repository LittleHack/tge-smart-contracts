const Whitelist = artifacts.require("Whitelist");
const Crowdsale = artifacts.require("Crowdsale");
const CommonToken = artifacts.require("CommonToken");

const errorMessage = 'VM Exception while processing transaction: revert';

contract("Crowdsale", function(accounts) {
  beforeEach(async function () {
    this.whitelist = await Whitelist.new();
    this.crowdsale = await Crowdsale.new(this.whitelist.address);
    this.token = await CommonToken.new(this.crowdsale.address);

    await this.crowdsale.setToken(this.token.address);
  });

  it('Verify whitelisted investors can invest and non-whitelisted cannot', async function() {

    await this.crowdsale.setStartTime(Math.floor(Date.now() / 1000), 60);

    await this.crowdsale.sendTransaction({value:web3.toWei(1), from:web3.eth.accounts[0], gas: 300000}).should.be.rejectedWith(errorMessage);

    assert.equal(await this.token.balanceOf(web3.eth.accounts[0]), 0);

    await this.whitelist.addInvestorToWhitelist(web3.eth.accounts[0]);
    await this.crowdsale.sendTransaction({value:web3.toWei(1), from:web3.eth.accounts[0], gas: 300000});
  });

  it('Verify investment function works properly', async function() {

    await this.crowdsale.setStartTime(Math.floor(Date.now() / 1000), 60);

    await this.whitelist.addInvestorToWhitelist(web3.eth.accounts[0]);
    await this.crowdsale.sendTransaction({value:web3.toWei(1), from:web3.eth.accounts[0], gas: 300000});

    let balance = (await this.token.balanceOf(web3.eth.accounts[0])).toNumber();
    let investment = (await this.crowdsale.investments(web3.eth.accounts[0])).toNumber();

    assert.equal(await this.crowdsale.investors(0), web3.eth.accounts[0]);
    assert.equal(balance, 10000);
    assert.equal(investment, web3.toWei(1));
  })

});