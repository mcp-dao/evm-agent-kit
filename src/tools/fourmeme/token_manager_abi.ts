export const tokenManagerAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "base",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "offers",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "quote",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "funds",
        type: "uint256",
      },
    ],
    name: "LiquidityAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalSupply",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "launchTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "launchFee",
        type: "uint256",
      },
    ],
    name: "TokenCreate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "cost",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "offers",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "funds",
        type: "uint256",
      },
    ],
    name: "TokenPurchase",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "origin",
        type: "uint256",
      },
    ],
    name: "TokenPurchase2",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "cost",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "offers",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "funds",
        type: "uint256",
      },
    ],
    name: "TokenSale",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "origin",
        type: "uint256",
      },
    ],
    name: "TokenSale2",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "TradeStop",
    type: "event",
  },
  {
    inputs: [],
    name: "STATUS_ADDING_LIQUIDITY",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STATUS_COMPLETED",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STATUS_HALT",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STATUS_TRADING",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_launchFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_referralRewardKeeper",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_referralRewardRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_templateCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_templates",
    outputs: [
      {
        internalType: "address",
        name: "quote",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "initialLiquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxRaising",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxOffers",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minTradingFee",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_tokenCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "_tokenInfoEx1s",
    outputs: [
      {
        internalType: "uint256",
        name: "launchFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pcFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserved2",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserved3",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserved4",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "_tokenInfoExs",
    outputs: [
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "address",
        name: "founder",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "reserves",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "_tokenInfos",
    outputs: [
      {
        internalType: "address",
        name: "base",
        type: "address",
      },
      {
        internalType: "address",
        name: "quote",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "template",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxOffers",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxRaising",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "launchTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "offers",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "funds",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "K",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "T",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "status",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_tokens",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_tradingFeeRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_tradingHalt",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "origin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxFunds",
        type: "uint256",
      },
    ],
    name: "buyToken",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxFunds",
        type: "uint256",
      },
    ],
    name: "buyToken",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "origin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxFunds",
        type: "uint256",
      },
    ],
    name: "buyToken",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxFunds",
        type: "uint256",
      },
    ],
    name: "buyToken",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "origin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "funds",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minAmount",
        type: "uint256",
      },
    ],
    name: "buyTokenAMAP",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "funds",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minAmount",
        type: "uint256",
      },
    ],
    name: "buyTokenAMAP",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "funds",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minAmount",
        type: "uint256",
      },
    ],
    name: "buyTokenAMAP",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "origin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "funds",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minAmount",
        type: "uint256",
      },
    ],
    name: "buyTokenAMAP",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "base",
            type: "address",
          },
          {
            internalType: "address",
            name: "quote",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "template",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalSupply",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxOffers",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxRaising",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "launchTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "offers",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "funds",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "K",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "T",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "status",
            type: "uint256",
          },
        ],
        internalType: "struct TokenManager3.TokenInfo",
        name: "ti",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "funds",
        type: "uint256",
      },
    ],
    name: "calcBuyAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "base",
            type: "address",
          },
          {
            internalType: "address",
            name: "quote",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "template",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalSupply",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxOffers",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxRaising",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "launchTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "offers",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "funds",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "K",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "T",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "status",
            type: "uint256",
          },
        ],
        internalType: "struct TokenManager3.TokenInfo",
        name: "ti",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "calcBuyCost",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "maxRaising",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "offers",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserves",
        type: "uint256",
      },
    ],
    name: "calcInitialPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "base",
            type: "address",
          },
          {
            internalType: "address",
            name: "quote",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "template",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalSupply",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxOffers",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxRaising",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "launchTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "offers",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "funds",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "K",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "T",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "status",
            type: "uint256",
          },
        ],
        internalType: "struct TokenManager3.TokenInfo",
        name: "ti",
        type: "tuple",
      },
    ],
    name: "calcLastPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "base",
            type: "address",
          },
          {
            internalType: "address",
            name: "quote",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "template",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalSupply",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxOffers",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxRaising",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "launchTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "offers",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "funds",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "K",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "T",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "status",
            type: "uint256",
          },
        ],
        internalType: "struct TokenManager3.TokenInfo",
        name: "ti",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "calcSellCost",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "base",
            type: "address",
          },
          {
            internalType: "address",
            name: "quote",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "template",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalSupply",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxOffers",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxRaising",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "launchTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "offers",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "funds",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "K",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "T",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "status",
            type: "uint256",
          },
        ],
        internalType: "struct TokenManager3.TokenInfo",
        name: "ti",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "funds",
        type: "uint256",
      },
    ],
    name: "calcTradingFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "args",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "createToken",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "origin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minFunds",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "feeRate",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "feeRecipient",
        type: "address",
      },
    ],
    name: "sellToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "origin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minFunds",
        type: "uint256",
      },
    ],
    name: "sellToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "origin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "sellToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minFunds",
        type: "uint256",
      },
    ],
    name: "sellToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "origin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minFunds",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "feeRate",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "feeRecipient",
        type: "address",
      },
    ],
    name: "sellToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "sellToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
