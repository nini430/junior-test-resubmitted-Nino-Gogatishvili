import React, { Component } from "react";
import { GET_SINGLE_PRODUCT } from "../../utils/gqlQueries";
import { client } from "../../App";

import "./productDetails.css";
import { Loading, ProductInfo } from "../../components";

class ProductDetails extends Component {
  state = {
    product: null,
    mainImgIndex: 0,
  };
  getSingleProduct = () => {
    const productId = window.location.pathname.split("/")[2];

    const WatchQuery = client.watchQuery({
      query: GET_SINGLE_PRODUCT,
      variables: {
        id: productId,
      },
    });
    this.obj = WatchQuery.subscribe(({ data }) => {
      this.setState({
        product: data.product,
      });
    });
  };
  componentDidMount() {
    this.getSingleProduct();
    this.props.closehamburger();
  }
  componentDidUpdate(_, prevState) {
    if (window.location.pathname.split("/")[2] !== prevState?.product?.id) {
      this.getSingleProduct();
    }
  }

  render() {
    const { product, mainImgIndex } = this.state;

    if (!product) {
      return <Loading />;
    } else {
      return (
        <div className="productDetails">
          <div className="detailsGallery">
            {product?.gallery.map((img, index) => (
              <div key={img} className="imgCont">
                <img
                  onClick={() => this.setState({ mainImgIndex: index })}
                  src={img}
                  alt=""
                />
              </div>
            ))}
          </div>
          <div className="mainImageCont">
            <img src={product?.gallery?.[mainImgIndex]} alt="" />
          </div>
          <div className="productInfo">
            <ProductInfo product={this.state.product} />
          </div>
        </div>
      );
    }
  }
}

export default ProductDetails;
