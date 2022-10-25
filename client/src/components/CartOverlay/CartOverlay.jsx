import React, { Component } from "react";
import "./cartoverlay.css";

import { CartOverlayItem } from "../../components";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { closeModal, toggleCartOverlay } from "../../redux/commerce/actions";
import { getTotalQuntitytAndTotalPrice } from "../../utils/priceCalcs";
import { createRef } from "react";

class CartOverlay extends Component {
  constructor(props) {
    super(props);

    this.overlayRef = createRef();
  }
  closeHandler = () => {
    this.props.toggleCartOverlay();
    this.props.closeModal();
  };

  handleClickOutside = (e) => {
    if (
      this.overlayRef.current &&
      !this.overlayRef.current.contains(e.target) &&
      e.target.dataset.id !== "cart" &&
      e.target.dataset.id !== "minus"
    ) {
      this.props.toggleCartOverlay();
    }
  };

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  render() {
    const { cart, currentCurrencySymbol } = this.props;
    const { totalQuantity, totalPrice } = getTotalQuntitytAndTotalPrice(
      cart,
      currentCurrencySymbol
    );
    return (
      <div ref={this.overlayRef} className="cartOverlay">
        <div className="overlayWrap">
          <span>
            <strong>My Bag,</strong>
            {totalQuantity} items
          </span>
          {cart.length > 0 ? (
            cart.map((item) => <CartOverlayItem key={item.id} item={item} />)
          ) : (
            <div className="empty">
              <h2 className="emptyCart">Cart is currently empty</h2>
              <img src="../assets/noItem.png" alt="" />
            </div>
          )}
        </div>
        <div className="total">
          <span>Total</span>
          <span>
            {currentCurrencySymbol} {totalPrice}
          </span>
        </div>
        <div className="buttons">
          <Link onClick={this.closeHandler} className="link" to="/cart">
            <button>view bag</button>
          </Link>
          <button>check out</button>
        </div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCartOverlay: () => dispatch(toggleCartOverlay()),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
