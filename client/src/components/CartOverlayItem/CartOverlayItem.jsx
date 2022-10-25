import React, { Component } from "react";
import Attributes from "../Attributes/Attributes";
import "./cartoverlayitem.css";

import { getPriceForSelectedCurrency } from "../../utils/priceCalcs";

import { connect } from "react-redux";
import { decrementItem, incrementItem } from "../../redux/commerce/actions";

class CartOverlayItem extends Component {
  render() {
    const { item, currentCurrencySymbol, incrementItem, decrementItem } =
      this.props;
    const price = getPriceForSelectedCurrency(
      item.prices,
      currentCurrencySymbol
    );
    return (
      <div className="cartOverlayItem">
        <div className="leftOverlayItem">
          <h2>{item.brand}</h2>
          <p>{item.name}</p>
          <p className="price">
            {currentCurrencySymbol} {price}
          </p>
          <Attributes
            small
            attributes={item.attributes}
            selectedAttrs={item.selectedAttrs}
            selected
          />
        </div>
        <div className="rightOverlayItem">
          <div className="rightLeftOverlay">
            <div
              onClick={() => incrementItem({ id: item.id })}
              className="operationOverlayBtn"
            >
              +
            </div>
            <div className="quantityOverlay">{item.quantity}</div>
            <div
              data-id="minus"
              onClick={() => decrementItem({ id: item.id })}
              className="operationOverlayBtn"
            >
              -
            </div>
          </div>
          <div className="rightRightOverlay">
            <img src={item.gallery[0]} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentCurrencySymbol: state.currentCurrencySymbol,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    incrementItem: (payload) => dispatch(incrementItem(payload)),
    decrementItem: (payload) => dispatch(decrementItem(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlayItem);
