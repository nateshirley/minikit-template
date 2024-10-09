// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

contract Nothing {
    uint256 public counter;
    string public name;

    struct NothingStruct {
        uint256 a;
        uint256 b;
    }

    constructor(uint256 _counter) {
        counter = _counter;
        name = "Nothing";
    }

    function increment() public {
        counter++;
    }

    function changeCounter(uint256 _counter) public {
        counter = _counter;
    }

    function acceptStruct(NothingStruct memory nothingStruct) public {
        counter = nothingStruct.a + nothingStruct.b;
    }

    function changeName(string memory _name) public {
        name = _name;
    }

    function read() public view returns (uint256) {
        return counter;
    }
}
