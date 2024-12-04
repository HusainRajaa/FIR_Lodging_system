// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FIRSystem {
    // Array to store all the CIDs
    string[] private cids;

    // Event to emit when a CID is stored
    event CIDStored(string cid);

    // Function to store a CID
    function storeCID(string memory cid) public {
        cids.push(cid);
        emit CIDStored(cid);
    }

    // Function to retrieve all stored CIDs
    function getAllCIDs() public view returns (string[] memory) {
        return cids;
    }
}
