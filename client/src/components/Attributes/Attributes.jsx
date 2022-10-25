import React, { Component } from "react";
import "./attributes.css";

class Attributes extends Component {
  render() {
    const {
      attributes,
      tobeSelected,
      selectAttributes,
      selectedAttributes,
      selectedAttrs,
      inStock,
      small,
    } = this.props;
    return (
      <div className="attributes">
        {attributes.map(({ name, items }) => {
          if (name !== "Color") {
            return (
              <div key={name} className="attr-select">
                <h2 className={small ? "smallFont" : "bigFont"}>{name}</h2>
                <div className="items">
                  {items.map(({ value }) => (
                    <div
                      key={value}
                      onClick={
                        tobeSelected && inStock
                          ? () => selectAttributes(name, value)
                          : undefined
                      }
                      className={
                        tobeSelected
                          ? selectedAttributes[name] === value
                            ? `attr-active attrBox ${small && "small"}`
                            : `attrBox  ${small && "small"}`
                          : selectedAttrs?.[name] === value
                          ? `attr-active attrBox ${small && "small"}`
                          : `attrBox ${small && "small"}`
                      }
                    >
                      {value}
                    </div>
                  ))}
                </div>
              </div>
            );
          } else {
            return (
              <div key={name} className="attr-select">
                <h2 className={small ? "smallFont" : "bigFont"}>{name}</h2>
                <div className="items">
                  {items.map(({ value }) => (
                    <div
                      className={
                        tobeSelected
                          ? selectedAttributes[name] === value
                            ? "color-active"
                            : undefined
                          : selectedAttrs[name] === value
                          ? "color-active"
                          : undefined
                      }
                      key={value}
                    >
                      <div
                        onClick={
                          tobeSelected && inStock
                            ? () => selectAttributes(name, value)
                            : undefined
                        }
                        style={{ background: value }}
                        className={small ? "colorBox colSmall" : "colorBox"}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  }
}

export default Attributes;
