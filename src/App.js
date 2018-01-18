import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

class App extends Component {

  constructor(props) {
    super(props)
    this.web3 = null
    this.account = null
    this.ABI = [
      {
        "constant": false,
        "inputs": [
          {
            "name": "_fName",
            "type": "string"
          },
          {
            "name": "_age",
            "type": "uint256"
          }
        ],
        "name": "setInstructor",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "age",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getInstructor",
        "outputs": [
          {
            "name": "",
            "type": "string"
          },
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "fName",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
    ]
    this.contract = null
    this.Sadeesh = null
    this.state = {
      "name" : null,
      "age" : null
    }
  }

  componentDidMount() {
    // if (!this.web3) this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    if (!this.web3) this.web3 = new Web3(window.web3.currentProvider);
    console.log(this.web3)
    setTimeout(() => {
      if (!this.account) this.account = this.web3.eth.accounts[0]
      console.log(this.account)
      let ABI = [ { "constant": false, "inputs": [ { "name": "carID", "type": "uint256" } ], "name": "raiseFundsForCar", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "carID", "type": "uint256" }, { "name": "_carHash", "type": "bytes32" }, { "name": "_carDealer", "type": "address" }, { "name": "_carDriver", "type": "address" } ], "name": "AddNewCar", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalAmountRaised", "outputs": [ { "name": "", "type": "uint256", "value": "400000000000000000" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "carID", "type": "uint256" }, { "name": "etherPrice", "type": "uint256" } ], "name": "buyCarWhenFundsRaised", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "ownershipToken", "outputs": [ { "name": "", "type": "address", "value": "0x2fcc8680a7cae20281fb30e67c936df5bb02afbc" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address", "value": "0x8c7ada5a2befb4f410a0abffb58f5c24c65ec2d0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "cars", "outputs": [ { "name": "exist", "type": "bool", "value": true }, { "name": "crowdsaleClosed", "type": "bool", "value": false }, { "name": "carDealerAddress", "type": "address", "value": "0x8c7ada5a2befb4f410a0abffb58f5c24c65ec2d0" }, { "name": "carDriver", "type": "address", "value": "0x646f51736d74e5cc5f50e0f6aeadaf9bc32e80ef" }, { "name": "carContractHash", "type": "bytes32", "value": "0xf251d2611bb334dcf885b8bfbefb4300602ceec76ef3f237993f8bcde7890574" }, { "name": "carRaised", "type": "uint256", "value": "100000000000000000" }, { "name": "numInvestors", "type": "uint256", "value": "1" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "addressOfLeaseToken", "type": "address", "index": 0, "typeShort": "address", "bits": "", "displayName": "address Of Lease Token", "template": "elements_input_address", "value": "" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_to", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }, { "indexed": false, "name": "isContribution", "type": "bool" } ], "name": "FundTransfer", "type": "event" } ]
      this.contract = this.web3.eth.contract(ABI)
      console.log(this.contract)
      this.Sadeesh = this.contract.at("0x87B9E8f28de1b7E83c2C8ff05C3432B0734bbc94")
      console.log("Contract: ", this.Sadeesh);
      this.web3.eth.defaultAccount=this.web3.eth.coinbase
      var callData = this.Sadeesh.raiseFundsForCar.getData(1);
      console.log("Data", callData);
      // console.log(this.Sadeesh.methods.raiseFundsForCar(1).encodeABI())
      console.log(this.web3.sha3('raiseFundsForCar(uint)'));
  
    }, 1000);

  }


  getValues () {
    let result = this.Sadeesh.getInstructor()
    console.log(result[0], result[1].toNumber())
    this.setState({
      name: result[0].toString(),
      age: result[1].toNumber()
    })
  }

  setValues () {
    console.log(this.Sadeesh.setInstructor);
    // let age = this.web3.toBigNumber(this.state.newAge)
    
    // console.log(age);
    console.log(this.Sadeesh.setInstructor(this.state.newName, parseInt(this.state.newAge)))
    // let result = this.Sadeesh.setInstructor("test", age)
    // console.log(result);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">D app</h1>
        </header>
        <p className="App-intro">
          
        </p>
        Name: {this.state.name} <br />
        Age: {this.state.age} <br />
        <button onClick={this.getValues.bind(this)}>Get </button> <br />
        <input type="text" onChange={(e) => this.setState({newName: e.target.value})} placeholder="Set Name"/> <br />
        <input type="text" onChange={(e) => this.setState({newAge: e.target.value})} placeholder="Set Age"/> <br />
        <button onClick={this.setValues.bind(this)}>Set </button> <br />
      </div>
    );
  }
}

export default App;
