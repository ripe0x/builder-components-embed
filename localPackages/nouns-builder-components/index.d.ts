import React, { FormEvent } from 'react';

type SortDirection = 'ASC' | 'DESC';

type Theme = 'base' | 'dark' | undefined;

type ComponentConfig = {
	dao: DaoInfo;
	opts: {
		[key: string]: any;
	} & {
		theme?: Theme;
		sortDirection?: SortDirection;
	};
};

type DaoConfig = {
	collection: string;
	chain: 'MAINNET' | 'GOERLI';
};

type DaoInfo = {
	name: string;
	symbol: string;
	description?: string;
	imageUrl?: string;
	external_url?: string;
	owners: number;
	totalSupply: number;
	chain: DaoConfig['chain'];
	chainId: 1 | 5;
	contracts: {
		auction: string;
		collection: string;
		governor: string;
		metadata: string;
		treasury: string;
	};
};

type DaoMember = {
	address: string;
	tokenIds: number[];
};

type AuctionData = {
	auctionId: number;
	chain: DaoConfig['chain'];
	startTime: number;
	endTime: number;
	highestBid: string;
	highestBidder: string;
	minPctIncrease: string;
};

type TokenData = {
	id: number;
	owner: string;
	name: string;
	description: string;
	imageUrl: string;
	chain: DaoConfig['chain'];
	attributes: Record<string, any>;
	auctionInfo?: {
		tokenId: number;
		winner: string;
		amount: string;
		startTime: number;
		endTime: number;
	};
	mintInfo?: {
		blockNumber: number;
		blockTimestamp: number;
		transactionHash: string;
	};
};

type ProposalData = {
	id: string;
	number: number;
	created: number;
	proposer: string;
	title: string;
	description: string;
	status: string;
	quorum: number;
	voteStart: number;
	voteEnd: number;
	tally: {
		for: number;
		against: number;
		abstain: number;
	};
	votes: ProposalVote[];
};

type ProposalVote = {
	voter: string;
	weight: number;
	support: string;
	reason: string;
};

declare const BuilderDAO: ({ collection, chain, children }: React.PropsWithChildren<DaoConfig>) => React.FunctionComponentElement<React.ProviderProps<DaoConfig>>;

declare const useAuction: (dao: DaoInfo) => {
    auctionData: AuctionData;
    formData: {
        attributes: {};
        input: {
            value: string;
            min: string;
            step: string;
            type: string;
            placeholder: string;
            onChange: (event: FormEvent<HTMLInputElement>) => void;
        };
        btn: {
            disabled: boolean;
        };
        addMinBid: () => void;
    };
};

declare const useCollection: (dao: DaoInfo) => TokenData[];

declare const useDao: () => DaoInfo | null;

declare const useMembers: (dao: DaoInfo) => DaoMember[];

declare const useProposals: (dao: DaoInfo) => ProposalData[];

declare const useToken: (id: number | undefined, dao: DaoInfo) => TokenData;

declare const AuctionHero: ({ dao, opts }: ComponentConfig) => JSX.Element;

declare const CollectionList: ({ dao, opts }: ComponentConfig) => JSX.Element;

declare const MemberList: ({ dao, opts }: ComponentConfig) => JSX.Element;

declare const PropHouseProps: ({ opts }: ComponentConfig) => JSX.Element;

declare const PropHouseRounds: ({ opts }: ComponentConfig) => JSX.Element;

declare const ProposalList: ({ dao, opts }: ComponentConfig) => JSX.Element;

declare const Treasury: ({ dao, opts }: ComponentConfig) => JSX.Element;

export { AuctionHero, BuilderDAO, CollectionList, MemberList, PropHouseProps, PropHouseRounds, ProposalList, Treasury, useAuction, useCollection, useDao, useMembers, useProposals, useToken };
