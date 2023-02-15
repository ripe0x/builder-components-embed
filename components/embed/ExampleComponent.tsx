import React, { useEffect, useState } from "react";
// import { AuctionHero } from "../../../lib/components/AuctionHero";
import {
  useDao,
  AuctionHero,
  CollectionList,
  ProposalList,
  PropHouseRounds,
  PropHouseProps,
  MemberList,
  Treasury,
} from "nouns-builder-components";
import { components, themes, daos } from "../../data/embed";
import { Theme, SortDirection, DaoInfo } from "../../types";

type Props = {
  componentIndex: number;
  themeIndex: number;
  collectionAddress?: string;
  rows?: number;
  itemsPerRow?: number;
  sortDirection?: SortDirection;
  maxProposals?: number;
  hideLabels?: boolean;
  dao: DaoInfo;
};

function ExampleComponent(props: Props) {
  const [theme, setTheme] = useState<Theme>("base");
  useEffect(() => {
    setTheme(themes[props.themeIndex]);
  }, [props.themeIndex]);

  if (!props.dao) return <></>;
  return (
    <div className="m-5 md:m-10">
      {props.componentIndex === 0 && props.dao && (
        <AuctionHero
          dao={props.dao}
          opts={{
            theme: theme,
          }}
        />
      )}
    </div>
  );
}

export default ExampleComponent;
