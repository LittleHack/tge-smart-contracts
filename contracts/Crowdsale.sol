pragma solidity ^0.4.24;

import "./CommonToken.sol";
import "./Whitelist.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Crowdsale is Ownable {
    using SafeMath for uint;

    address[] public investors;
    mapping (address => uint) public investments;

    // Token contract
    CommonToken private token;

    // Whitelist contract
    Whitelist private whitelist;

    // Start time of the ICO
    uint startTime;
    // End time of the ICO
    uint endTime;

    // Rate of token - 0.01 ETH = 1 token
    uint constant TOKEN_RATE = 1e14;

    constructor(address _whitelist) public {
        whitelist = Whitelist(_whitelist);
    }

    function() public payable {
        buy(msg.sender, msg.value);
    }

    function buy(address investor, uint investment) private {
        require(icoRunning());
        require(whitelist.isWhitelisted(investor));
        require(investment >= 1e17);

        uint tokens = investment.div(TOKEN_RATE);

        investors.push(investor);
        investments[investor].add(investment);

        token.transfer(investor, tokens);
    }

    function setStartTime(uint _startTime, uint duration) external onlyOwner {
        require(startTime == 0 && endTime == 0);
        require(duration != 0);

        startTime = _startTime;
        endTime = startTime.add(duration);
    }

    function icoRunning() public view returns (bool) {
        return (now >= startTime && now <= endTime);
    }

    function icoFinished() public view returns (bool) {
        return (startTime != 0 && now > endTime);
    }

    function getWhitelist() external view returns (address) {
        return address(whitelist);
    }

    function getToken() external view returns (address) {
        return address(token);
    }

    function setToken(address addr) external onlyOwner {
        token = CommonToken(addr);
    }
}