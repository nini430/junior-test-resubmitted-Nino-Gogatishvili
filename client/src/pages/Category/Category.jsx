import React, { Component } from "react";
import { connect } from "react-redux";

import { client } from "../../App";
import { Modal, Product } from "../../components";
import {
  setAttrsFromCategory,
  setCategoryProducts,
  setMainCategory,
} from "../../redux/commerce/actions";
import { getFilteredProducts, getUniques } from "../../utils/attributesFunc";

import { GET_CATEGORY } from "../../utils/gqlQueries";
import "./category.css";

class Category extends Component {
  async getCategoryInfo() {
    const WatchQuery = client.watchQuery({
      query: GET_CATEGORY,
      variables: {
        CategoryInput: {
          title: this.props.category,
        },
      },
    });
    this.obj = WatchQuery.subscribe(({ data }) => {
      this.setState({
        products: data.category.products,
      });

      this.props.setCategoryProducts(
        getFilteredProducts(this.props.selectedAttrs, data.category.products)
      );

      this.props.setAttrsForCategory(
        getUniques(data.category.products.map((item) => item.attributes))
      );
      localStorage.setItem(
        "allProducts",
        JSON.stringify(data.category.products)
      );
    });
  }
  componentDidMount() {
    this.getCategoryInfo();
    this.props.openhamburger();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.category !== this.props.category) {
      this.getCategoryInfo();
      this.props.setMainCategory(this.props.category);
    }

    if (prevProps.categoryProducts !== this.props.categoryProducts) {
      this.setState({
        products: this.props.categoryProducts,
      });
    }
  }
  render() {
    const { category, categoryProducts, isModalOpen } = this.props;

    return (
      <>
        <div className="category">
          <h1>{category}</h1>

          {categoryProducts?.length > 0 ? (
            <div className="products">
              {categoryProducts?.map((product) => (
                <Product id={product.id} key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="noItem">
              <h1>No Items matched this filters</h1>
            </div>
          )}
        </div>
        {isModalOpen && <Modal />}
      </>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    selectedAttrs: store.selectedAttrs,
    categoryProducts: store.categoryProducts,
    isModalOpen: store.isModalOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAttrsForCategory: (attrs) => dispatch(setAttrsFromCategory(attrs)),
    setMainCategory: (cat) => dispatch(setMainCategory(cat)),
    setCategoryProducts: (products) => dispatch(setCategoryProducts(products)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
