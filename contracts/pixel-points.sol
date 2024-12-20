// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PixelPoints is ERC20, Ownable {
    struct UserPoints {
        uint256 lastClaimTimestamp;
        uint256 activeTimeStart; // Start timestamp of the current active entertainment time
    }

    mapping(address => UserPoints) public userPoints;

    uint256 public constant DAILY_POINT_LIMIT = 2;
    uint256 public constant POINT_DURATION_MS = 30 minutes * 1000; // Milliseconds
    uint256 public constant POINT_PRICE = 0.01 ether;

    event PointsClaimed(address indexed user, uint256 points);
    event EntertainmentTimeUsed(address indexed user, uint256 points, uint256 newDurationMs);
    event PointsPurchased(address indexed user, uint256 points);

    constructor() ERC20("PixelPoints", "PXL") Ownable(msg.sender) {}

    function claimDailyPoints() public {
        UserPoints storage user = userPoints[msg.sender];

        // only allow one daily claim per day per address
        require(
            block.timestamp - user.lastClaimTimestamp >= 1 days,
            "Daily points already claimed"
        );

        user.lastClaimTimestamp = block.timestamp;

        uint256 mintAmount = DAILY_POINT_LIMIT;
        _mint(msg.sender, mintAmount);

        emit PointsClaimed(msg.sender, mintAmount);
    }

    function purchasePoints(uint256 pointCount) public payable {
        require(pointCount > 0, "Must purchase a positive amount of points");
        uint256 totalCost = pointCount * POINT_PRICE;
        require(msg.value >= totalCost, "Insufficient funds");

        _mint(msg.sender, pointCount);

        if (msg.value > totalCost) {
            payable(msg.sender).transfer(msg.value - totalCost);
        }

        emit PointsPurchased(msg.sender, pointCount);
    }

    function useTime(uint256 points) public {
        require(balanceOf(msg.sender) >= points, "Insufficient points");
        _burn(msg.sender, points);

        UserPoints storage user = userPoints[msg.sender];
        uint256 newDuration = points * POINT_DURATION_MS;

        // Calculate when the current session ends
        uint256 sessionEnd = block.timestamp + (newDuration / 1000);

        // Start a new session or extend the existing one
        if (block.timestamp < user.activeTimeStart + POINT_DURATION_MS / 1000) {
            // Extend the existing session
            uint256 remainingTime = user.activeTimeStart + POINT_DURATION_MS / 1000 - block.timestamp;
            sessionEnd = block.timestamp + (remainingTime + newDuration / 1000);
        }

        user.activeTimeStart = block.timestamp;

        emit EntertainmentTimeUsed(msg.sender, points, sessionEnd);
    }

    function withdrawFunds() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function getRemainingDuration(address user) public view returns (uint256) {
        UserPoints storage userPoint = userPoints[user];

        if (block.timestamp < userPoint.activeTimeStart + POINT_DURATION_MS / 1000) {
            uint256 elapsed = block.timestamp - userPoint.activeTimeStart;
            return POINT_DURATION_MS - (elapsed * 1000);
        }

        return 0;
    }

    function getLastClaimTimestamp(address user) public view returns (uint256) {
        return userPoints[user].lastClaimTimestamp;
    }

    function getUserData(address user) public view returns (UserPoints memory) {
        return userPoints[user];
    }
}
