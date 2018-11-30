pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20Pausable.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract CommonToken is ERC20Pausable, Ownable {

    string public constant name = "Common Token";
    
    string public constant symbol = "CT";
    
    uint32 public constant decimals = 2;

    uint256 public constant total_supply = 100000 * 1e2;

    address public tokenHolder;

    constructor(address crowdsaleAddress) public {
        tokenHolder = crowdsaleAddress;
        _mint(tokenHolder, total_supply);
    }
}