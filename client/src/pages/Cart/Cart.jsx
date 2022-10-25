import React, { Component } from "react";
import "./cart.css";
import { connect } from "react-redux";
import { CartItem } from "../../components";
import { getTotalQuntitytAndTotalPrice } from "../../utils/priceCalcs";

class Cart extends Component {
  render() {
    const { cart, currentCurrencySymbol } = this.props;
    const { totalPrice, totalQuantity } = getTotalQuntitytAndTotalPrice(
      cart,
      currentCurrencySymbol
    );
    const taxPrice = parseFloat(totalPrice * 0.21).toFixed(2);

    return (
      <div className="cart">
        <h1>cart</h1>
        <div className="cartItems">
          {cart.length ? (
            cart.map((item) => <CartItem key={item.id} item={item} />)
          ) : (
            <div className="emptyCart">
              <h1>Cart is currently Empty</h1>
              <img src="../assets/noItem.png" alt="" />
            </div>
          )}
        </div>
        <div className="totals">
          <div className="calc">
            <span>Tax 21%:</span>
            <span>
              <strong>
                {currentCurrencySymbol}
                {taxPrice}
              </strong>
            </span>
          </div>
          <div className="calc">
            <span>Quantity:</span>
            <span>
              <strong>{totalQuantity}</strong>
            </span>
          </div>
          <div className="calc">
            <span>Total:</span>
            <span>
              <strong>
                {currentCurrencySymbol}
                {totalPrice}
              </strong>
            </span>
          </div>
        </div>
        <button className="orderBtn">order</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    currentCurrencySymbol: state.currentCurrencySymbol,
  };
};

export default connect(mapStateToProps)(Cart);
