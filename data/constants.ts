// nouns, lils tokens
export const nounsDaoContracts = {
  token: "0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03",
  treasury: "0x0bc3807ec262cb779b38d65b38158acc3bfede10",
}
export const lilsDaoContracts = {
  token: "0x4b10701bfd7bfedc47d50562b76b436fbb5bdb3b",
  treasury: "0xd5f279ff9EB21c6D40C8f345a66f2751C4eeA1fB",
}

export const components = [
  {
    name: "Auction",
    embedCodeName: "auction-hero",
  },
  {
    name: "Proposal List",
    opts: ["maxProposals", "sortDirection"],
    embedCodeName: "proposal-list",
  },
  {
    name: "Collection List",
    opts: ["rows", "itemsPerRow", "sortDirection", "hideLabels"],
    embedCodeName: "collection-list",
  },
  {
    name: "Members List",
    opts: ["rows", "itemsPerRow"],
    embedCodeName: "members-list",
  },
  {
    name: "Treasury",
    embedCodeName: "treasury",
  },
  {
    name: "PropHouse Rounds",
    opts: ["rows", "itemsPerRow", "sortDirection"],
    embedCodeName: "prop-house-rounds",
    isPH: true,
  },
  {
    name: "PropHouse Props",
    opts: ["maxProposals", "sortDirection"],
    embedCodeName: "prop-house-props",
    isPH: true,
  },
];

export const themes = ["base", "dark"];
export const embedDataParams = {
  theme: "data-theme",
  rows: "data-rows",
  sortDirection: "data-sort-direction",
  itemsPerRow: "data-items-per-row",
  maxProposals: "data-max-proposals",
  hideLabels: "data-hide-labels",
}