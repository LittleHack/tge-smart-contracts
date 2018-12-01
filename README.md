A repository containing smart contracts for a Token Generation Event (TGE) campaign.
The smart contracts have been written in Solidity, for deployment on the Ethereum network.

This repository features :
* A ready to go ERC-20 compliant, build with OpenZeppelin 2.0, token.
* A crowdsale contract for token distribution
* A whitelist contract for keeping a list of people who are allowed to participate in the TGE.

The Crowdsale smart contract features a whitelisting functionality to disable investors 
from investing if they have not been whitelisted.

The total amount of tokens is set to 100,000 and is customizable.
The token price during the TGE is set to 0.01 ETH for 1 token and is customizable.

Developers :
The deployment is automatic and set in the script migrations/2_whitelist_token_crowdsale.js
The deployment details (network, providers) are in truffle.js

To migrate the contracts in a local (private) test network, you need to run 
'truffle migrate --network ganache',
after installing 'ganache'.
