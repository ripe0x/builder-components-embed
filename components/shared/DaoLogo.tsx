import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IpfsImage } from "react-ipfs-image";
import Skeleton from "react-loading-skeleton";
import { baseIpfsUrl } from "../../constants";

type Props = {
  src?: string;
};

function DaoLogo(props: Props) {
  const isIPFS = props.src?.includes("ipfs://");
  let slug = props.src || "/image/placeholder.png";
  if (isIPFS) {
    slug = slug.replace("ipfs://", baseIpfsUrl);
  }
  const [imageUrl, setImageUrl] = useState(slug);
  const [fetchCounter, setFetchCounter] = useState(0);

  const handleError = () => {
    setTimeout(() => {
      console.log("retrying image");
    }, 2000);
    if (fetchCounter < 3) {
      setFetchCounter(fetchCounter + 1);
      setImageUrl("/image/placeholder.png");
    }
  };

  return (
    <div className="rounded-full shadow-md w-[30px]">
      {props.src ? (
        <Image
          src={imageUrl}
          alt=""
          className="w-full rounded-full"
          width={500}
          height={500}
          onError={() => {
            handleError();
          }}
        />
      ) : (
        <Skeleton circle height="100%" />
      )}
    </div>
  );
}

export default DaoLogo;
