import React, { useState } from "react";
import Layout from "../components/layout";
import cx from "classnames";
import { lilsDaoContracts, nounsDaoContracts } from "../data/constants";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ethers } from "ethers";
import { DocumentNode } from "@apollo/client";
import apolloClient from "data/fetch/apolloclient";
import { GET_ALL_DAOS_STATS } from "data/fetch/daosStatsQueries";
import { DaoDetails } from "../types";
import { metadataContract } from "../siteConfig";
import { parseContractURI } from "../utils";
import DaoLogo from "../components/shared/DaoLogo";
import Info from "../components/embed/Info";
import { Helmet } from "react-helmet";
import phClient from "data/fetch/phClient";
import { GET_ALL_PH_COMMUNITIES } from "data/fetch/phQueries";
import ComponentPicker from "../components/embed/ComponentPicker";
import { BuilderDAO } from "../localPackages/nouns-builder-components";

type Props = {
  collections: DaoDetails[];
  phCommunities: any;
};
const views = ["Components", "Info"];
const sidebarBorderClasses = "border-r border-slate-200";
const buttonClasses =
  "text-gray-900 bg-white border bg-slate-100 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700";
const formatOptionLabel = ({
  value,
  label,
  logo,
}: {
  value: string;
  label: string;
  logo: string;
}) => (
  <div className="flex flex-row items-center gap-2">
    <DaoLogo key={value} src={logo} />
    <p>{label}</p>
  </div>
);
export default function Embed({ collections, phCommunities }: Props) {
  const defaultDaoAddress = "0xdf9b7d26c8fc806b1ae6273684556761ff02d422";
  const [selectedDao, setSelectedDao] = useState<string>(defaultDaoAddress); // defaults to builder DAO
  const [view, setView] = useState<number>(0);
  console.log("collections", collections);
  return (
    <BuilderDAO collection={selectedDao} chain="MAINNET">
      <Helmet>
        <link
          rel="stylesheet"
          href="https://unpkg.com/nouns-builder-components@latest/dist/index.css"
        />
      </Helmet>
      <Layout>
        <div className="mx-auto mb-3 px-4 text-center md:max-w-2xl">
          <h1 className="px-3 pt-10 pb-3 text-4xl font-bold">
            Nounish DAO Components
          </h1>
          <p className="text-sm font-normal opacity-70">
            A set of lightly styled, reusable pieces of UI for both developers
            and non-technical users to create websites for their Nouns Protocol
            DAO using the tools they already know.
          </p>
        </div>
        <div className="mb-5 flex flex-row gap-5">
          <button
            className={cx(
              "rounded-full",
              buttonClasses,
              view === 0 && {
                "!border-slate-600 !bg-white": true,
              },
            )}
            onClick={() => setView(0)}
          >
            Components
          </button>
          <button
            className={cx(
              "rounded-full",
              buttonClasses,
              view === 1 && {
                "bg-white-100 !border-slate-600": true,
              },
            )}
            onClick={() => setView(1)}
          >
            Info
          </button>
        </div>
        {view === 1 ? (
          <Info />
        ) : (
          <ComponentPicker
            collections={collections}
            setSelectedDao={setSelectedDao}
            selectedDao={selectedDao}
            phCommunities={phCommunities}
          />
        )}
      </Layout>
    </BuilderDAO>
  );
}

export async function getStaticProps() {
  const provider = new ethers.providers.JsonRpcProvider(
    `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  );
  const statsQuery = GET_ALL_DAOS_STATS as DocumentNode;
  const phCommunitiesQuery = GET_ALL_PH_COMMUNITIES as DocumentNode;

  // remove nouns and lils
  const offProtocolTreasuries = [
    nounsDaoContracts.treasury,
    lilsDaoContracts.treasury,
  ];

  const { data: protocolStatsData } = await apolloClient.query({
    query: statsQuery,
  });

  const daoCollectionAddresses = protocolStatsData.nouns.nounsDaos.nodes.map(
    (dao: { collectionAddress: string }) => dao.collectionAddress,
  );

  const { data: phCommunities } = await phClient.query({
    query: phCommunitiesQuery,
  });

  const getCollections = async () => {
    const collections: DaoDetails[] = [];

    await Promise.all(
      protocolStatsData.nouns.nounsDaos.nodes.map(async (collection: any) => {
        if (collection.totalSupply === 0) {
          return;
        }
        if (
          offProtocolTreasuries.includes(collection.treasuryAddress) === false
        ) {
          let isPH = false;

          const contract = new ethers.Contract(
            collection.collectionAddress,
            metadataContract.abi,
            provider,
          );

          const data = await contract.contractURI();
          const contractURIData = parseContractURI(data);
          let daoDetails;
          if (contractURIData) {
            daoDetails = {
              ...collection,
              contractURI: data || null,
              logo: contractURIData.logo || null,
              description: contractURIData.description,
              isPH: isPH,
            };

            collections.push(daoDetails);
          }
          return daoDetails;
        }
      }),
    );
    return collections;
  };

  const collections: DaoDetails[] = await getCollections();

  return {
    props: {
      collections: collections,
      phCommunities: phCommunities,
    },
  };
}
