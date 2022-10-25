import React, { Component } from "react";
import { connect } from "react-redux";

import "./currencyOverlay.css";
import { client } from "../../App";
import { GET_CURRENCIES } from "../../utils/gqlQueries";
import { setCurrencySymbol } from "../../redux/commerce/actions";

class CurrencyOverlay extends Component {
  state = {
    currencies: [],
  };

  getCurrencies = () => {
    const WatchQuery = client.watchQuery({
      query: GET_CURRENCIES,
    });

    this.obj = WatchQuery.subscribe(({ data }) => {
      this.setState({
        currencies: data.currencies,
      });
    });
  };

  componentDidMount() {
    this.getCurrencies();
  }

  render() {
    const { currencies } = this.state;
    const { setCurrencySymbol } = this.props;
    return (
      <div className="currencyOverlay">
        {currencies.map((currency) => (
          <div
            onClick={() => setCurrencySymbol(currency.symbol)}
            key={currency.label}
            className="unitCurrency"
          >
            <span>{currency.symbol}</span>
            <span>{currency.label}</span>
          </div>
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrencySymbol: (currentSymbol) =>
      dispatch(setCurrencySymbol(currentSymbol)),
  };
};

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(
  CurrencyOverlay
);
