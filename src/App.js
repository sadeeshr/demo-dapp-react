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
    if (!this.web3) this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    console.log(this.web3)
    setTimeout(() => {
      if (!this.account) this.account = this.web3.eth.accounts[0]
      console.log(this.account)
      this.contract = this.web3.eth.contract(this.ABI)
      console.log(this.contract)
      this.Sadeesh = this.contract.at("0x7b4be23596bf3fe1ae27590a031b2c5a4ee548bc")
      console.log("Contract: ", this.Sadeesh);
      this.web3.eth.defaultAccount=this.web3.eth.coinbase
  
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
