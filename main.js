import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import {Contract, ethers} from "ethers";
import { BrowserProvider, parseUnits } from "ethers";
import { HDNodeWallet } from "ethers/wallet";


// Your code here...
let signer = null;

let provider;
if (window.ethereum == null) {

    // If MetaMask is not installed, we use the default provider,
    // which is backed by a variety of third-party services (such
    // as INFURA). They do not have private keys installed,
    // so they only have read-only access
    console.log("MetaMask not installed; using read-only defaults")
    provider = ethers.getDefaultProvider()

} else {
    console.log("MetaMask exist")

    // Connect to the MetaMask EIP-1193 object. This is a standard
    // protocol that allows Ethers access to make all read-only
    // requests through MetaMask.
    provider = new ethers.BrowserProvider(window.ethereum)
    console.log(provider);


    // It also provides an opportunity to request access to write
    // operations, which will be performed by the private key
    // that MetaMask manages for the user.
    signer = await provider.getSigner();
    console.log(signer);
}
/*

let balance = await provider.getBalance("0x5c835789113ceCC6aB2D2a4AcbD3937f877DDeFA")
console.log(ethers.eth);

let abi = [
    "function newMessage(address to, string text)",
    "function register(string name)",
    "function getName(address _address) view returns(string)",
    "function getAddress(string _name) view  returns(address)",
]

// Create a contract
let contractViewer = new Contract("0xcC4aB1a19f8671A674c1ADC22A8828B345C13DFF", abi, provider)

let name = await contractViewer.getName("0x5c835789113ceCC6aB2D2a4AcbD3937f877DDeFA");
let address = await contractViewer.getAddress("alex");

console.log(name);
console.log(address);
*/

//let contractSigner = new Contract("0xcC4aB1a19f8671A674c1ADC22A8828B345C13DFF", abi, signer)

//let registerResponse = await contractSigner.register('alex2');
//let newMessageResponse = await contractSigner.newMessage("0x87bcD9B124433e9847bbFA8933C51d2a06056fcB", "hi second account");

//await registerResponse.wait();
//await newMessageResponse.wait();
/*console.log("registerResponse: "+registerResponse);
console.log("newMessageResponse: "+newMessageResponse);*/
//0x5c835789113ceCC6aB2D2a4AcbD3937f877DDeFA
let abi = [
    "event newMessageDone(address indexed from, address indexed to, string text)"
];
let contractEvents = new Contract("0xcC4aB1a19f8671A674c1ADC22A8828B345C13DFF", abi, provider);
contractEvents.on("newMessageDone", (from, to, text, event) => {
    console.log("sadasdsad");
    console.log(`${ from } => ${ to }: ${ text }`);

    // The `event.log` has the entire EventLog

    // Optionally, stop listening
   // event.removeListener();

});

contractEvents.on("*", (event) => {
    console.log(event);
});

let filter = contractEvents.filters.newMessageDone
let events = await contractEvents.queryFilter(filter, -100)
console.log(events);
console.log(events.length);

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
