import { gql } from "@apollo/client";

export const GET_CATEGORY_NAMES = gql`
  query Categories {
    categories {
      name
    }
    currencies {
      symbol
    }
  }
`;

export const GET_CATEGORY = gql`
  query Category($CategoryInput: CategoryInput!) {
    category(input: $CategoryInput) {
      name
      products {
        id
        name
        brand
        gallery
        inStock
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        attributes {
          id
          name
          type
          items {
            id
            value
            displayValue
          }
        }
      }
    }
  }
`;

export const GET_CURRENCIES = gql`
  query Currencies {
    currencies {
      label
      symbol
    }
  }
`;
export const GET_SINGLE_PRODUCT = gql`
  query Product($id: String!) {
    product(id: $id) {
      id
      name
      brand
      description
      gallery
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      attributes {
        id
        name
        type
        items {
          id
          value
          displayValue
        }
      }
      inStock
    }
  }
`;
