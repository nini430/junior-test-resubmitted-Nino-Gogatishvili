import React, { Component } from "react";
import { connect } from "react-redux";

import { Attributes } from "../../components";
import "./productInfo.css";
import { getPriceForSelectedCurrency } from "../../utils/priceCalcs";
import { getText } from "../../utils/parseHTML";
import { addToCart } from "../../redux/commerce/actions";

class ProductInfo extends Component {
  state = {
    selectedAttributes: {},
    message: "",
  };
  selectAttributes = (attrName, value) => {
    let updatedObj = this.state.selectedAttributes;
    if (this.state.selectedAttributes[attrName] === value) {
      delete updatedObj[attrName];
    } else {
      updatedObj[attrName] = value;
    }

    this.setState({
      selectedAttributes: updatedObj,
    });
  };

  addToCart = () => {
    if (
      this.props.product.attributes.length !==
      Object.keys(this.state.selectedAttributes).length
    ) {
      this.setState({
        message: "error",
      });
      setTimeout(() => {
        this.setState({
          message: "",
        });
      }, 1000);
    } else {
      const productAttrs = this.props.product.attributes.map(
        (item) => item.name
      );
      let uniqueId = "";
      productAttrs.forEach((attrName) => {
        uniqueId += attrName + "-" + this.state.selectedAttributes[attrName];
      });

      this.props.addToCart({
        id: this.props.product.id + uniqueId,
        name: this.props.product.name,
        brand: this.props.product.brand,
        prices: this.props.product.prices,
        gallery: this.props.product.gallery,
        selectedAttrs: this.state.selectedAttributes,
        attributes: this.props.product.attributes,
      });
      this.setState(
        {
          message: "success",
          selectedAttributes: {},
        },
        () => {
          setTimeout(() => {
            this.setState({
              message: "",
            });
          }, 1000);
        }
      );
    }
  };
  render() {
    const {
      product: { brand, name, attributes, prices, description, inStock },
      currentCurrencySymbol,
    } = this.props;
    const { message } = this.state;
    return (
      <div className="productInfo">
        <h1>{brand}</h1>
        <span>{name}</span>
        {!inStock && <p>(Out of stock)</p>}
        {message && (
          <p className={message === "success" ? "green" : "red"}>
            {message === "success"
              ? "Item added to the cart"
              : "Please select all attributes!"}
          </p>
        )}
        <Attributes
          inStock={this.props.product.inStock}
          selectedAttributes={this.state.selectedAttributes}
          selectAttributes={this.selectAttributes}
          attributes={attributes}
          tobeSelected
        />
        <div className="price">
          <h2>price</h2>
          <span>
            {currentCurrencySymbol}{" "}
            {getPriceForSelectedCurrency(prices, currentCurrencySymbol)}
          </span>
        </div>
        <button onClick={() => this.addToCart()} disabled={!inStock}>
          Add to cart
        </button>
        <p>{getText(description)}</p>
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
    addToCart: (itemToBeAdded) => dispatch(addToCart(itemToBeAdded)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo);
