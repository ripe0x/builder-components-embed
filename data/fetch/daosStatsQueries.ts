import { gql } from "@apollo/client";

export const GET_ALL_DAOS_STATS = gql`
  query GetDaosStats {
    nouns {
      nounsDaos(
        networks: {network: ETHEREUM, chain: MAINNET}
        pagination: {limit: 100}
      ) {
        nodes {
          name
          collectionAddress          
          metadataAddress
        }
      }
    }
  }
`;