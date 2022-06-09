import gql from "graphql-tag";

export const LOAD_MENUS = gql`
  query {
    menus {
      id
      title
      items {
        id
        name
        price
        image
      }
    }
  }
`;
