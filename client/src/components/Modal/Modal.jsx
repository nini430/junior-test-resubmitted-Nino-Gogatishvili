import React, { Component } from "react";
import "./modal.css";

import { connect } from "react-redux";
import { addToCart, closeModal } from "../../redux/commerce/actions";
import { getPriceForSelectedCurrency } from "../../utils/priceCalcs";

import { Attributes } from "../../components";
import { createRef } from "react";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttributes: {},
      slideIndex: 0,
      message: "",
    };

    this.modalRef = createRef();
  }

  handleClickOutside = (e) => {
    if (
      this.modalRef.current &&
      !this.modalRef.current.contains(e.target) &&
      e.target.dataset.id !== "productCart" &&
      e.target.dataset.id !== "currency" &&
      e.target.dataset.id !== "cart"
    ) {
      this.props.closeModal();
    }
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
      Object.keys(this.state.selectedAttributes).length !==
      this.props.modalProduct.attributes.length
    ) {
      this.setState(
        {
          message: "error",
        },
        () => {
          setTimeout(() => {
            this.setState({
              message: "",
            });
          }, 1000);
        }
      );
    } else {
      let uniqueId = "";
      let productAttrs = this.props.modalProduct.attributes.map(
        (attr) => attr.name
      );
      productAttrs.forEach((attrName) => {
        uniqueId += attrName + "-" + this.state.selectedAttributes[attrName];
      });
      this.props.addToCart({
        id: this.props.modalProduct.id + uniqueId,
        name: this.props.modalProduct.name,
        brand: this.props.modalProduct.brand,
        selectedAttrs: this.state.selectedAttributes,
        attributes: this.props.modalProduct.attributes,
        prices: this.props.modalProduct.prices,
        gallery: this.props.modalProduct.gallery,
      });
      this.setState(
        {
          message: "success",
        },
        () => {
          setTimeout(() => {
            this.setState({
              message: "",
            });
            this.props.closeModal();
          }, 1000);
        }
      );
    }
  };

  handleDirection = (direction) => {
    let slideIndex;
    if (direction === "left") {
      slideIndex =
        this.state.slideIndex > 0
          ? this.state.slideIndex - 1
          : this.props.modalProduct.gallery.length - 1;
    } else {
      slideIndex =
        this.state.slideIndex < this.props.modalProduct.gallery.length - 1
          ? this.state.slideIndex + 1
          : 0;
    }

    this.setState({
      slideIndex,
    });
  };

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  render() {
    const { modalProduct, currentCurrencySymbol, closeModal } = this.props;
    const price = getPriceForSelectedCurrency(
      modalProduct.prices,
      currentCurrencySymbol
    );

    const { slideIndex, message } = this.state;
    return (
      <div ref={this.modalRef} data-id="modal" className="modal">
        <div className="modalWrapper">
          <div className="modalInner">
            <div className="modalLeft">
              <span>{modalProduct.brand}</span>
              <span>{modalProduct.name}</span>
              {message && (
                <p className={message === "success" ? "green" : "red"}>
                  {message === "success"
                    ? "Item added to the cart!"
                    : "Please select all attributes"}
                </p>
              )}
              <div className="priceModal">
                <span>Price</span>
                <span>
                  {currentCurrencySymbol}
                  {price}
                </span>
              </div>
              <Attributes
                selectAttributes={this.selectAttributes}
                inStock={modalProduct.inStock}
                selectedAttributes={this.state.selectedAttributes}
                attributes={modalProduct.attributes}
                tobeSelected
                small
              />
            </div>
            <div className="modalRight">
              <div className="modalImgCont">
                {modalProduct.gallery.map((img) => (
                  <div
                    key={img}
                    style={{ transform: `translate(${slideIndex * -19}rem)` }}
                    className="modalImg"
                  >
                    {modalProduct.gallery.length > 1 && (
                      <span
                        onClick={() => this.handleDirection("left")}
                        className="modalArr"
                      >{`<`}</span>
                    )}
                    <img src={img} alt="" />
                    {modalProduct.gallery.length > 1 && (
                      <span
                        onClick={() => this.handleDirection("right")}
                        className="modalArr"
                      >{`>`}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button onClick={() => this.addToCart()} className="modalBtn">
            Add to cart
          </button>

          <span onClick={() => closeModal()} className="closeBtn">
            X
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modalProduct: state.modalProduct,
    currentCurrencySymbol: state.currentCurrencySymbol,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    addToCart: (item) => dispatch(addToCart(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(Modal);
