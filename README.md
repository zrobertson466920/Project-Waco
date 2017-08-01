# Project-Waco

A Decentralized Identification System for Distribution of Welfare Services (See Demo [here](https://www.youtube.com/watch?v=tp9SP4xqD-c))

Project Waco is an improvement on traditional government identification systems. It is a decentralized and autonomous ledger system intended to allow for improved distribution of welfare services in developing nations. Users provide a ration card and proof of identity such as a QR code or a Biometric. The information is compared with a decentralized file on the Interplanetary File System (IPFS). If a match is found, the data is returned and used to connect to a smart contract that holds a link to a client's information. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

This project uses Meteor to host and run the interface, IPFS to store files, and Metamask to inject Web3 which allows interaction with smart contracts. We'll need all three software to launch the dApp.

### Installing

To install Meteor open up terminal and enter the following command.

```
curl https://install.meteor.com/ | sh
```

Next, we need to install IPFS. Go to the [host website](https://ipfs.io/docs/install/) and follow the instructions. 

Metamask has a [chrome plugin](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) so we can download it easily. Once Metamask is installed, make sure to transfer ether to upload contracts. 

## How to Use

Go ahead and start a local host by going into the project directory and running the following command and following the link.

```
meteor Project-Waco
```
Next, open up an IPFS daemon using the following configurations

```
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://localhost:3000", "http://localhost:5001"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'
ipfs daemon
// You can reset this configuration afterwards using:
// ipfs config --json API.HTTPHeaders {}
```
Before uploading anything to the IPFS, we need a smart contract address to point to. Take the clientcontrol.sol file and go to [Remix](https://remix.ethereum.org) and upload the contract. Make sure to set the environment to injected web3.

You might notice that the contract has a string field. This is where you can upload a hash of identity information kept on IPFS. Go ahead and upload relevant identity information to IPFS and then use the hash with the contract. Wait for it to process and copy down the address field after checking Metamask. Upload the address to IPFS as well and write down the hash. This hash then needs to be converted to a QR code for processing by our dApp. Once that is done, go back to the now running dApp and click on the highlighted capture field. Your computer will ask for webcam permissions and then begin scanning for the QR code. Once the QR code is found, it'll be converted to a hash which will access the address of the smart contract which can access the id hash. 

## Built With

* [IPFS](https://ipfs.io/) - The decentralized file storing system used
* [Meteor](https://www.meteor.com/) - The web framework utilized
* [Hitchcott](https://github.com/hitchcott/meteor-qr-code-scanner) - Javascript QR code reader
* [Web3](http://web3js.readthedocs.io/en/1.0/web3-eth.html) - Allows for communication with Ethereum Network
* [Metamask](https://metamask.io/) - Web3 injector
* [Ethereum Project](https://www.ethereum.org/) - Hosting network for the smart contract

## Authors

* **Zachary W. Robertson** - [LinkedIn](https://www.linkedin.com/in/zachary-robertson-1286ba120/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
