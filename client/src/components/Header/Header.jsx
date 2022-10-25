import React, { Component } from "react";
import { createRef } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { CurrencyOverlay, CartOverlay } from "../../components";
import "./header.css";
import { toggleCartOverlay } from "../../redux/commerce/actions";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCurrencyOverlayOpen: false,
    };

    this.currencyOverlayRef = createRef();
    this.currencyRef = createRef();
  }

  handleClickOutsideCurrencyOverlay = (e) => {
    if (
      this.currencyOverlayRef.current &&
      !this.currencyRef.current.contains(e.target)
    ) {
      this.setState({
        isCurrencyOverlayOpen: false,
      });
    }
  };

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutsideCurrencyOverlay);
  }
  componentWillUnmount() {
    document.removeEventListener(
      "click",
      this.handleClickOutsideCurrencyOverlay
    );
  }
  render() {
    const {
      categories,
      currentCurrencySymbol,
      isOverlayOpen,
      cart,
    } = this.props;
    const { isCurrencyOverlayOpen } = this.state;
    const itemQuantity = cart.reduce((val, item) => val + item.quantity, 0);

    return (
      <div className="header">
        <div className="links">
          {categories.map((category) => (
            <NavLink
              end
              className="link headerLink"
              key={category.name}
              to={category.name === "all" ? "/" : `/${category.name}`}
            >
              {category.name}
            </NavLink>
          ))}
        </div>
        <div className="logoMain">
          <img src="../assets/logo.png" alt="" />
        </div>
        <div className="right">
          <div
            ref={this.currencyRef}
            onClick={() =>
              this.setState({ isCurrencyOverlayOpen: !isCurrencyOverlayOpen })
            }
            className="currencyContainer"
          >
            <div data-id="currency" className="currency">
              <span>{currentCurrencySymbol}</span>
            </div>
            <img src="../assets/Arrow.png" alt="" />
            {isCurrencyOverlayOpen && (
              <CurrencyOverlay ref={this.currencyOverlayRef} />
            )}
          </div>

          <div className="cart">
            <div
              data-id="cart"
              onClick={() => this.props.toggleCartOverlay()}
              className="cartWrap"
            >
              <img src="../assets/EmptyCart.png" alt="" />
              {itemQuantity > 0 && (
                <div data-id="cart" className="headerQuantity">
                  {itemQuantity}
                </div>
              )}
            </div>

            {isOverlayOpen && <CartOverlay />}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentCurrencySymbol: state.currentCurrencySymbol,
    isOverlayOpen: state.isOverlayOpen,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCartOverlay: () => dispatch(toggleCartOverlay()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
