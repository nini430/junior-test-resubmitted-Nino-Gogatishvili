import React, { Component, createRef } from "react";
import { Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { connect } from "react-redux";

import { HamburgerMenu, Header, SideBar } from "./components";

import { Category, ProductDetails, Cart } from "./pages";
import "./styles.css";

import { GET_CATEGORY_NAMES } from "./utils/gqlQueries";
import { setCurrencySymbol } from "./redux/commerce/actions";

export const client = new ApolloClient({
  cache: new InMemoryCache({
    dataIdFromObject: (o) => (o._id ? `${o.__typename}:${o._id}` : null),
  }),
  uri: "http://localhost:4000",
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      show: true,
      showHam: false,
    };
    this.sideBarRef = createRef();
    this.hamburgerRef = createRef();
    this.headerRef = createRef();
  }

  toggleSideBar = () => {
    this.setState({
      show: !this.state.show,
      showHam: true,
    });
  };

  closehamburger = () => {
    this.setState({
      showHam: false,
    });
  };
  openhamburger = () => {
    this.setState({
      showHam: true,
    });
  };

  closeSideBar = () => {
    this.setState({
      show: false,
      showHam: false,
    });
  };

  async getCategoryNames() {
    const WatchQuery = client.watchQuery({
      query: GET_CATEGORY_NAMES,
    });
    this.obj = WatchQuery.subscribe(({ data }) => {
      this.setState({
        categories: data.categories,
      });
      localStorage.setItem("categories", JSON.stringify(data.categories));

      this.props.setCurrencySymbol(
        this.props.currentCurrencySymbol || data.currencies[0].symbol
      );
    });
  }

  handleClickOutside = (e) => {
    if (
      this.sideBarRef.current &&
      !this.sideBarRef.current.contains(e.target) &&
      !e.target.dataset.id &&
      !this.headerRef.current.contains(e.target) &&
      !this.props.isOverlayOpen &&
      !this.props.isModalOpen
    ) {
      const path = window.location.pathname;
      if (path === "/" || path === "/clothes" || path === "/tech") {
        this.setState({
          show: false,
          showHam: true,
        });
      } else {
        this.setState({
          show: false,
          showham: false,
        });
      }
    }
  };
  componentDidMount() {
    this.getCategoryNames();
    document.addEventListener("click", this.handleClickOutside);
  }
  render() {
    const { categories, show, showHam } = this.state;
    const { isOverlayOpen, isModalOpen } = this.props;

    const categoriesData = JSON.parse(localStorage.getItem("categories"));

    return (
      <React.Fragment>
        <ApolloProvider client={client}>
          <div className="app">
            <div className="appWrap">
              <div className="leftside">
                {!show && showHam && (
                  <div
                    onClick={() =>
                      this.setState({ show: true, showHam: false })
                    }
                    className="hamContainer"
                    data-id="hamburger"
                    ref={this.hamburgerRef}
                  >
                    <HamburgerMenu />
                  </div>
                )}
                {show && (
                  <div ref={this.sideBarRef}>
                    <SideBar
                      toggleSideBar={this.toggleSideBar}
                      closeSideBar={this.closeSideBar}
                    />
                  </div>
                )}
              </div>

              <div className="container">
                <div ref={this.headerRef}>
                  <Header categories={categories} />
                </div>
                <Routes>
                  {categoriesData?.map((category) => (
                    <Route
                      key={category.name}
                      path={category.name === "all" ? "/" : `/${category.name}`}
                      element={
                        <Category
                          openhamburger={this.openhamburger}
                          category={category.name}
                        />
                      }
                    />
                  ))}
                  <Route
                    path="/product/:id"
                    element={
                      <ProductDetails closehamburger={this.closehamburger} />
                    }
                  />
                  <Route path="/cart" element={<Cart />} />
                </Routes>
              </div>
            </div>
          </div>
        </ApolloProvider>
        {(isOverlayOpen || isModalOpen) && <div className="grayBack"></div>}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentCurrencySymbol: state.currentCurrencySymbol,
    isOverlayOpen: state.isOverlayOpen,
    isModalOpen: state.isModalOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrencySymbol: (currentSymbol) =>
      dispatch(setCurrencySymbol(currentSymbol)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
