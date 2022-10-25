import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./product.css";
import { getPriceForSelectedCurrency } from "../../utils/priceCalcs";

import { createRef } from "react";
import { setModalProduct } from "../../redux/commerce/actions";

class Product extends Component {
  constructor(props) {
    super(props);
    this.modalRef = createRef();
    this.wrapperRef = createRef();
  }
  openModalHandler = (e) => {
    e.preventDefault();
    this.props.setModalProduct(this.props.product);
  };

  render() {
    const {
      product: { gallery, brand, name, inStock, prices, id },
      currentCurrencySymbol,
    } = this.props;
    return (
      <>
        <Link className="link" to={`/product/${id}`}>
          <div className={`${inStock ? "product" : "product notInStock"}`}>
            <div className="imgContainer">
              <img src={gallery[0]} alt="" />
              {!inStock && <span>out of stock</span>}
              {inStock && (
                <div
                  data-id="productCart"
                  onClick={(e) => this.openModalHandler(e)}
                  className="productCart"
                >
                  <img src="../assets/WhiteCart.png" alt="" />
                </div>
              )}
            </div>
            <div className="info">
              <h2>
                {brand} {name}
              </h2>
              <span>
                {currentCurrencySymbol}{" "}
                {getPriceForSelectedCurrency(prices, currentCurrencySymbol)}
              </span>
            </div>
          </div>
        </Link>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentCurrencySymbol: state.currentCurrencySymbol,
    isModalOpen: state.isModalOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setModalProduct: (product) => dispatch(setModalProduct(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
