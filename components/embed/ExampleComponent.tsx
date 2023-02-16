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
} from "../../localPackages/nouns-builder-components";
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
      {props.componentIndex === 1 && (
        <ProposalList
          dao={props.dao}
          opts={{
            theme: theme,
            sortDirection: props.sortDirection ? props.sortDirection : "DESC",
            max: props.maxProposals ? props.maxProposals.toString() : "5",
          }}
        />
      )}
      {props.componentIndex === 2 && (
        <CollectionList
          dao={props.dao}
          opts={{
            theme: theme,
            rows: props.rows ? props.rows.toString() : "3",
            itemsPerRow: props.itemsPerRow ? props.itemsPerRow.toString() : "5",
            sortDirection: props.sortDirection ? props.sortDirection : "DESC",
            hideLabels: props.hideLabels
              ? props.hideLabels.toString()
              : "false",
          }}
        />
      )}
      {props.componentIndex === 3 && (
        <MemberList
          dao={props.dao}
          opts={{
            theme: theme,
            rows: props.rows ? props.rows.toString() : "3",
            itemsPerRow: props.itemsPerRow ? props.itemsPerRow.toString() : "5",
            sortDirection: props.sortDirection ? props.sortDirection : "DESC",
          }}
        />
      )}
      {props.componentIndex === 4 && (
        <Treasury dao={props.dao} opts={{ theme: theme }} />
      )}
      {props.componentIndex === 5 && (
        <PropHouseRounds
          dao={props.dao}
          opts={{
            theme: theme,
            rows: props.rows ? props.rows.toString() : "3",
            itemsPerRow: props.itemsPerRow ? props.itemsPerRow.toString() : "5",
            sortDirection: props.sortDirection ? props.sortDirection : "DESC",
          }}
        />
      )}
      {props.componentIndex === 6 && (
        <PropHouseProps
          dao={props.dao}
          opts={{
            theme: theme,
            max: props.maxProposals ? props.maxProposals.toString() : "5",
            sortDirection: props.sortDirection ? props.sortDirection : "DESC",
          }}
        />
      )}
      {props.componentIndex === 7 && (
        <CollectionList
          dao={props.dao}
          opts={{
            theme: theme,
            rows: props.rows ? props.rows.toString() : "3",
            itemsPerRow: props.itemsPerRow ? props.itemsPerRow.toString() : "5",
            sortDirection: props.sortDirection ? props.sortDirection : "DESC",
          }}
        />
      )}
    </div>
  );
}

export default ExampleComponent;
