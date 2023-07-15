import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import OwnNFT from "../src/components/OwnNFT";

import { Network, Alchemy } from "alchemy-sdk";
import { NFT_Contract_adddress, NFT_Contract_abi } from "../src/constants";
import { useAccount, useProvider, useSigner } from "wagmi";
import {
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
const settings = {
  apiKey: "bZFiL-IFAMe4QAh9Q30gDQ7m1vxEss4u", // Replace with your Alchemy API Key.
  network: Network.MATIC_MUMBAI, // Replace with your network.
};

const alchemy = new Alchemy(settings);

export default function Account() {
  const { address, isConnected } = useAccount();
  const [nfts, setNfts] = useState([]);

  const provider = useProvider();
  const { data: signer } = useSigner();

  const NFT_Contract = useContract({
    addressOrName: NFT_Contract_adddress,
    contractInterface: NFT_Contract_abi,
    signerOrProvider: signer || provider,
  });

  const mockNFTAddress = "0xF99FcE9c34d8ed38108425Ce39B6D4d4Cd3cb470";

  useEffect(() => {
    fetchNFTs();
  }, []);

  const getNFTs = async () => {
    try {
      // get the totalNFTs minted
      const totalNFTs = await NFT_Contract.nextTokenIdToMint();
      const promise = [];

      for (let i = 0; i < totalNFTs; i++) {
        // const nftData =
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNFTs = async () => {
    try {
      console.log("fetching the NFTs");
      // fetch with metadata
      const nftsForOwner = await alchemy.nft.getNftsForOwner(address, {
        withMetadata: true,
      });
      const filteredNFTs = [];
      for (const nft of nftsForOwner.ownedNfts) {
        // console.log(nft);
        if (
          nft.contract.address.toLowerCase() == mockNFTAddresss.toLowerCase()
        ) {
          console.log(nft);
          filteredNFTs.push(nft);
        }
      }
      console.log(filteredNFTs);
      setNfts(filteredNFTs);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.heading}>Owned NFTs</h1>
      <div className={styles.collection}>
        {nfts.map((nft) => {
          return <OwnNFT nft={nft} key={nft.tokenId} />;
        })}
      </div>
    </div>
  );
}
