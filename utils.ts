import tokenABI from "./abi/tokenABI";
import { Buffer } from "buffer";
import { BigNumber } from "ethers";
import IPFS from "ipfs-core";
import { useContractReads } from "wagmi";
import { useState } from "react";


export function parseBase64(base64: string) {
  const clean: string = base64?.substring(29);
  const json = Buffer.from(clean, "base64").toString();
  const result = JSON.parse(json);
  return result;
}

export async function getImageUrlFromIPFS(ipfs: string) {
  return `https://ipfs.io/ipfs/${ipfs}`;
}


export async function getCollectionOwners(tokenContractAddress: string) {
  const options = { method: "GET", headers: { accept: "application/json" } };
  let owners = await
  fetch(
    `https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getOwnersForCollection?contractAddress=${tokenContractAddress}&withTokenBalances=false`,
    options
  )
    .then((response) => response.json())
    .then((response) => response)
    .catch((err) => console.error(err));
    console.log('owners', owners)
  return owners;
}

export const trunc = (address: string, amount: number = 4) =>
  `${address?.slice(0, amount)}...${address?.slice(
    address.length - amount,
    address.length,
)}`;


export const parseContractURI = (uri: string) => {
  let logo;
  let description;
  let metadataJson = null;
  const trimmedResponse = uri.slice(29);
  const decodedRequestBodyString = Buffer.from(trimmedResponse, "base64");
  const metadata = decodedRequestBodyString.toString();  try {
    metadataJson = JSON.parse(metadata);
  } catch (e) {
    // throw new Error('Error occured: ', e);
   }

  if (metadataJson === null) {
    // throw new Error("No metadata found");
    console.log("No metadata found");
    return null
  } else {
    logo = metadataJson.image;
    description = metadataJson.description;
    return {logo, description}
  }

}