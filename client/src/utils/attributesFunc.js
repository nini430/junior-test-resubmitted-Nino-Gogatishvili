const getTwoDimensionalArrayToOne = (arr) => {
  const array = arr.reduce((val, item) => val.concat(...item), []);
  return array;
};

const groupRelatedAttrs = (arr) => {
  const array = getTwoDimensionalArrayToOne(arr);
  const groupedObj = array.reduce((val, item) => {
    const propertyName = item.name;
    if (val[propertyName]) {
      return {
        ...val,
        [propertyName]: [
          ...val[propertyName],
          ...item.items.map((i) => i.value),
        ],
      };
    } else {
      return { ...val, [propertyName]: [...item.items.map((i) => i.value)] };
    }
  }, {});
  return groupedObj;
};

const getUniqueValues = (arr) => {
  let uniques = [];

  arr.forEach((item) => {
    if (uniques.indexOf(item) === -1) {
      uniques.push(item);
    }
  });

  return uniques;
};

export const getUniques = (arr) => {
  const obj = groupRelatedAttrs(arr);

  let uniqueAttrs = [];
  for (const n in obj) {
    let childArr = getUniqueValues(obj[n]);
    childArr.unshift({ attrName: n });
    uniqueAttrs.push(childArr);
  }

  return uniqueAttrs;
};

export const getFilteredProducts = (selectedAttrs, products) => {
  let filteredProducts = [];

  products.forEach((product) => {
    const attrNames = product.attributes.map((item) => item.name);
    if (
      Object.keys(selectedAttrs).every((element) => attrNames.includes(element))
    ) {
      const attributes = product.attributes.filter((item) =>
        Object.keys(selectedAttrs).includes(item.name)
      );
      if (
        attributes.every((attr) =>
          selectedAttrs[attr.name]
            .split(",")
            .every((element) =>
              attr.items.map((i) => i.value).includes(element)
            )
        )
      ) {
        filteredProducts.push(product);
      }
    }
  });
  return filteredProducts;
};
