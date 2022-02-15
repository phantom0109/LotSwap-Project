import React, { Component } from "react";
import tokenLogo from "../assets/img/token-logo.png";
import ethLogo from "../assets/img/eth-logo.png";
import CoinField from "./CoinField";

class SellForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      output: "0",
      input: "0",
    };
  }

  render() {
    return (
      <form
        className="mb-3"
        onSubmit={(event) => {
          event.preventDefault();
          let etherAmount;
          etherAmount = this.state.input.toString();
          etherAmount = window.web3.utils.toWei(etherAmount, "Ether");
          this.props.sellTokens(etherAmount);
        }}
      >

        <div className="input-group mb-4">
          <CoinField
            activeField={true}
            onChange={(e) => {
              this.setState({
                input: e,
                output: e / 100,
              });
            }}
            suffixIcon={<img src={tokenLogo} height="32" alt="" />}
            suffixText={"DApp"}
            balancePrice={window.web3.utils.fromWei(
              this.props.tokenBalance,
              "Ether"
            )}
            balanceUSD={11.994}
          />
        </div>

        <div className="input-group mb-4">
          <CoinField
            activeField={true}
            value={this.state.output}
            suffixIcon={<img src={ethLogo} height="32" alt="" />}
            suffixText={"ETH"}
            balancePrice={window.web3.utils.fromWei(
              this.props.ethBalance,
              "Ether"
            )}
            balanceUSD={11.994}
          />
        </div>
        <div className="mb-5">
          <span className="float-left text-muted">Exchange Rate</span>
          <span className="float-right text-muted">100 DApp = 1 ETH</span>
        </div>
        <button
          id="swap-button"
          type="submit"
          className={'swap-btn'}
        >
          SWAP!
        </button>
      </form>
    );
  }
}

export default SellForm;
