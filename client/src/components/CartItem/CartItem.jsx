import React, { Component } from "react";
import { Attributes } from "../../components";
import "./cartitem.css";

import { connect } from "react-redux";
import { getPriceForSelectedCurrency } from "../../utils/priceCalcs";
import { decrementItem, incrementItem } from "../../redux/commerce/actions";

class CartItem extends Component {
  state = {
    slideIndex: 0,
  };
  slideHandler = (direction) => {
    let slideIndex;
    if (direction === "left") {
      slideIndex =
        this.state.slideIndex > 0
          ? this.state.slideIndex - 1
          : this.props.item.gallery.length - 1;
    } else {
      slideIndex =
        this.state.slideIndex < this.props.item.gallery.length - 1
          ? this.state.slideIndex + 1
          : 0;
    }

    this.setState({
      slideIndex,
    });
  };
  render() {
    const {
      item,
      currentCurrencySymbol,
      isOverlayOpen,
      incrementItem,
      decrementItem,
    } = this.props;
    const { slideIndex } = this.state;
    const price = getPriceForSelectedCurrency(
      item.prices,
      this.props.currentCurrencySymbol
    );
    return (
      <div className="cartItem">
        <div className="wrap">
          <div className="leftSide">
            <h2>{item.brand}</h2>
            <p>{item.name}</p>
            <p className="price">
              {currentCurrencySymbol} {price}
            </p>
            <Attributes
              attributes={item.attributes}
              selectedAttrs={item.selectedAttrs}
            />
          </div>
          <div className="rightSide">
            <div className="rightLeft">
              <div
                onClick={() => incrementItem({ id: item.id })}
                className="operationBtn"
              >
                +
              </div>
              <div className="quantity">{item.quantity}</div>
              <div
                onClick={() => decrementItem({ id: item.id })}
                className="operationBtn"
              >
                -
              </div>
            </div>
            <div className="rightRight">
              <div className="imgContCart">
                {item.gallery.map((img) => (
                  <div key={img} className="images">
                    <img
                      style={{
                        transform: `translateX(${-20 * slideIndex}rem)`,
                      }}
                      src={img}
                      alt=""
                    />
                    {item.gallery.length > 1 && (
                      <>
                        <div
                          onClick={() => this.slideHandler("left")}
                          className={
                            isOverlayOpen ? "leftArr zIndex" : "leftArr"
                          }
                        >{`<`}</div>
                        <div
                          onClick={() => this.slideHandler("right")}
                          className={
                            isOverlayOpen ? "leftArr zIndex" : "rightArr"
                          }
                        >{`>`}</div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    incrementItem: (payload) => dispatch(incrementItem(payload)),
    decrementItem: (payload) => dispatch(decrementItem(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
