import React, { Component } from "react";
import CoinField from "./CoinField";
class BuyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "0",
      output: "0",
      currentTokenFrom: "eth",
      currentTokenTo: "defaultToken",
      currentNetwork: props.currentNetwork,
    };

    //window.alert('current network');
    //if (props.currentNetwork) {
    //  console.log('currentNetwork6789098788=>', props.currentNetwork);
    //}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({currentNetwork: nextProps.currentNetwork})
  }
  switchTokenFrom = (type) => {
    switch (type) {
      case "eth":
        this.setState({ currentTokenFrom: type });
        break;
      case "bnb":
        this.setState({ currentTokenFrom: type });
        break;
      default:
        break;
    }
  };

  switchTokenTo = (type) => {
    switch (type) {
      case "eth":
        this.setState({ currentTokenTo: type });
        break;
      case "bnb":
        this.setState({ currentTokenTo: type });
        break;
      case "usdc":
        this.setState({ currentTokenTo: type });
        break;
      case "comp":
        this.setState({ currentTokenTo: type });
        break;
      case "dai":
        this.setState({ currentTokenTo: type });
        break;
      case "wbtc":
        this.setState({ currentTokenTo: type });
        break;
      case "uni":
        this.setState({ currentTokenTo: type });
        break;
      case "donate":
        this.setState({ currentTokenTo: type });
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <form
        className="mb-3"
        onSubmit={(event) => {
          event.preventDefault();
          let etherAmount;
          etherAmount = this.state.input.toString();
          etherAmount = window.web3.utils.toWei(etherAmount, "Ether");
          this.props.buyTokens(etherAmount, this.state.currentTokenTo);
        }}
      >
        <div className="input-group mb-4">
          <CoinField
            fieldFlag={0}
            activeField={true}
            // onClick={() => setDialog1Open(true)}
            onChange={(e) => {
              this.setState({
                input: e,
                output: e * 100,
              });
            }}
            changeToken={this.switchTokenFrom}
            from={true}
            // currentNetwork = {this.state.currentNetwork}
            currentToken={this.props.currentNetwork}
            currentNetwork={this.state.currentNetwork}
            // currentToken = {this.state.currentTokenFrom}
            balancePrice={window.web3.utils.fromWei(
              this.props.ethBalance,
              "Ether"
            )}
          //balanceUSD={11.994}
          />
        </div>

        <div className="input-group mb-4">
          <CoinField
            fieldFlag={1}
            value={this.state.output}
            activeField={false}
            from={false}
            changeToken={this.switchTokenTo}
            currentToken={this.state.currentTokenTo}
            currentNetwork={this.state.currentNetwork}
            balancePrice={window.web3.utils.fromWei(
              this.props.tokenBalance,
              "Ether"
            )}
          //balanceUSD={11.994}
          />
        </div>
        {/* <div className="mb-5">
          <span className="float-left text-muted">Exchange Rate</span>
          <span className="float-right text-muted">1 ETH = 100 DApp</span>
        </div> */}
        {/* <button type="submit" className="btn btn-primary btn-block btn-lg">SWAP!</button> */}
        <button
          type="submit"
          id="swap-button"
          disabled={this.state.currentTokenTo === "defaultToken" ? true : false}
          className={"swap-btn"}
        >
          <div className="css-10ob8xa">LOTSWAP!</div>
        </button>
      </form>
    );
  }
}

export default BuyForm;
