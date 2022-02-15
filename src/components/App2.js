import React, { Component } from 'react'
import Web3 from 'web3'
import TokenEth from '../build/TokenEth.json'
import BridgeEth from '../build/BridgeEth.json'
import TokenBsc from '../build/TokenBsc.json'
import BridgeBsc from '../build/BridgeBsc.json'
import Navbar from './Navbar'
import Main from './Main'
import './App.css'
import Moralis from 'moralis'


class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchaindata()
  }

  async loadBlockchaindata() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    
    this.setState({account: accounts[0] })
    
    const ethBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ethBalance: ethBalance})
    //console.log(this.state.ethBalance)
    
    const networkId = await web3.eth.net.getId()

    //short term switch network here by changing to BridgeBsc and TokenBsc
    const Bridge = BridgeEth
    const TokenI = TokenEth

    // window.alert(networkId)
    const tokenData = TokenI.networks[networkId]
    if(tokenData) {
      
      const token = new web3.eth.Contract(TokenI.abi,tokenData.address)
      this.setState({token})
      let tokenBalance = await token.methods.balanceOf(this.state.account).call()
      //console.log("tokenBalance", tokenBalance.toString())
      this.setState({tokenBalance: tokenBalance.toString() })
    } else {
      window.alert('Token contract not deployed to detected network')

    }
    
    
    const ethSwapData = Bridge.networks[networkId]
    if(ethSwapData) {
      
      const ethSwap = new web3.eth.Contract(Bridge.abi,ethSwapData.address)
      this.setState({ethSwap})
      
    } else {
      window.alert('Token contract not deployed to detected network')

    }
 
    this.setState({ loading: false})    
  }
  async loadWeb3() {
    
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    // Non-dapp browsers...
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
 
  //just for now, using static variables
  //I want to pass swapReq which is an address and then swapType which is int is this done inside () or after the .send?
  //go ahead names swapReq and swapType  swapReq address 0x000000000000000 (however many 0s are in an address) type int = 1


  buyTokens = (etherAmount) => {
    this.setState({loading: true})
    let p0 
    let p1
    let p2
    const serverUrl = "https://m53eagkaz5ew.usemoralis.com:2053/server"; //Server url from moralis.io
    const appId = "LqpVF4PWlQWve3dcydBTcpw7AKuExHVxq3oSokOX"; // Application id from moralis.io
    Moralis.start({ serverUrl, appId }); //0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
    const runeth = Moralis.Web3API.token.getTokenPrice({chain: "eth", address:"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"})
    const runbnb = Moralis.Web3API.token.getTokenPrice({chain: "bsc", address:"0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" })
    const runls = Moralis.Web3API.token.getTokenPrice({chain: "bsc", address:"0xa7f552078dcc247c2684336020c03648500c6d9f" })
    //we need to also get LS price
    
    runeth.then( (val) => console.log(val.usdPrice) );
    runbnb.then( (val2) => console.log(val2.usdPrice) );
    runls.then( (val3) => console.log(val3.usdPrice) );

    //const reqAddress = '0x69445F974258a9F359330e5A36cCFB0aDfBD483c' //eth
    const reqAddress = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984' //
    //0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984
    //const reqAddress = '0x37a04FB048FB1e4daECe8a3EbB97A3225eB5F2e7' //bnb
    const reqType = 0 //1 for bridging 0 for swap
    this.state.ethSwap.methods.buyTokens(reqAddress, reqType, 0, 0, 0).send( {value: etherAmount, from: this.state.account }).on('transactionhash', (hash) => {this.setState({loading: false})})
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      token: {},
      ethSwap: {},
      ethBalance: '0',
      tokenBalance: '0',
      loading: true
    }
  }

  render() {
    let content
    if(this.state.loading) {
      
      content = <p id="loader" className="text-center">Loading...</p>
      //question while waiting 
    } else {
      content = <Main
        ethBalance={this.state.ethBalance}
        tokenBalance={this.state.tokenBalance}
	buyTokens={this.buyTokens}
	
      />
    }
    return (
      <div>
        <Navbar account={this.state.account}/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer">
                </a>
                {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
