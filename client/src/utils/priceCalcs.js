export const getPriceForSelectedCurrency = (prices, selectedSymbol) => {
  const priceObj = prices?.find(
    (price) => price.currency.symbol === selectedSymbol
  );
  const amount = priceObj?.amount;
  return parseFloat(amount).toFixed(2);
};

export const getTotalQuntitytAndTotalPrice = (cart, selectedSymbol) => {
  const totalQuantity = cart.reduce((val, item) => val + item.quantity, 0);

  const totalPrice = cart.reduce(
    (val, item) =>
      val +
      item.quantity * getPriceForSelectedCurrency(item.prices, selectedSymbol),
    0
  );
  return { totalPrice: parseFloat(totalPrice).toFixed(2), totalQuantity };
};
