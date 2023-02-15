import { gql } from "@apollo/client";

export const GET_DAO_PH_ROUNDS = gql`
  query GetAuctionsByAddress(
    $address: String!
    ) {
    findByAddress(address: $address) {
      name
      description
      auctions {
        description
        numWinners
        fundingAmount
        status
        proposals {
          title
          address
          voteCount
        }
      }
    }
  }
`;

export const GET_ALL_PH_COMMUNITIES = gql`
  query GetAllCommunities {
    communities {
      name
      contractAddress
    }
  }
`;