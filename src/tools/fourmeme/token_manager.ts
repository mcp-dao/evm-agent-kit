import { Address, encodeFunctionData, formatUnits, parseEther } from "viem";
import { EvmAgentKit } from "../../agent";
import { approve } from "../../utils";
import { tokenManagerAbi } from "./token_manager_abi";

const getNonce = async (agent: EvmAgentKit) => {
  const nonceResponse = await fetch(
    "https://four.meme/meme-api/v1/private/user/nonce/generate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountAddress: agent.wallet.getAddress(),
        verifyType: "LOGIN",
        networkCode: "BSC",
      }),
    },
  );
  const nonce = await nonceResponse.json();
  if (!nonce.data) {
    throw new Error(JSON.stringify(nonce));
  }
  return nonce.data;
};

const getAccessToken = async (nonce: string, agent: EvmAgentKit) => {
  const signature = await agent.wallet.signMessage(
    `You are sign in Meme ${nonce}`,
  );

  const loginResponse = await fetch(
    "https://four.meme/meme-api/v1/private/user/login/dex",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        region: "WEB",
        langType: "EN",
        loginIp: "",
        inviteCode: "",
        verifyInfo: {
          address: agent.wallet.getAddress(),
          networkCode: "BSC",
          signature: signature,
          verifyType: "LOGIN",
        },
        walletName: "MetaMask",
      }),
    },
  );
  const login = await loginResponse.json();
  if (!login.data) {
    throw new Error(JSON.stringify(login));
  }
  return login.data;
};

const uploadImage = async (accessToken: string, imageUrl: string) => {
  // Fetch the image from URL
  const imageResponse = await fetch(imageUrl);
  const imageBlob = await imageResponse.blob();

  // Create FormData and append the image
  const formData = new FormData();
  formData.append("file", imageBlob, "image.png");
  const uploadResponse = await fetch(
    "https://four.meme/meme-api/v1/private/token/upload",
    {
      method: "POST",
      headers: {
        "meme-web-access": accessToken,
      },
      body: formData,
    },
  );

  const upload = await uploadResponse.json();
  if (!upload.data) {
    throw new Error(JSON.stringify(upload));
  }
  return upload.data;
};

const createFourMemeToken = async (
  accessToken: string,
  name: string,
  shortName: string,
  desc: string,
  imgUrl: string,
  launchTimeFromNow: number,
  label:
    | "Meme"
    | "AI"
    | "Defi"
    | "Games"
    | "Infra"
    | "De-Sci"
    | "Social"
    | "Depin"
    | "Charity"
    | "Others",
  preSale: number,
  webUrl?: string,
  twitterUrl?: string,
  telegramUrl?: string,
) => {
  const createTokenResponse = await fetch(
    "https://four.meme/meme-api/v1/private/token/create",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "meme-web-access": accessToken,
      },
      body: JSON.stringify({
        name,
        shortName,
        desc,
        imgUrl,
        launchTime: new Date().getTime() + launchTimeFromNow * 1000,
        label,
        lpTradingFee: 0.0025,
        webUrl: webUrl || undefined, // optional
        twitterUrl: twitterUrl || undefined, // optional
        telegramUrl: telegramUrl || undefined, // optional
        preSale: preSale,

        // Fixed
        totalSupply: 1000000000,
        raisedAmount: 24,
        saleRate: 0.8,
        reserveRate: 0,
        funGroup: false,
        clickFun: false,
        symbol: "BNB",
        raisedToken: {
          symbol: "BNB",
          nativeSymbol: "BNB",
          symbolAddress: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
          deployCost: "0",
          buyFee: "0.01",
          sellFee: "0.01",
          minTradeFee: "0",
          b0Amount: "8",
          totalBAmount: "24",
          totalAmount: "1000000000",
          logoUrl:
            "https://static.four.meme/market/68b871b6-96f7-408c-b8d0-388d804b34275092658264263839640.png",
          tradeLevel: ["0.1", "0.5", "1"],
          status: "PUBLISH",
          buyTokenLink: "https://pancakeswap.finance/swap",
          reservedNumber: 10,
          saleRate: "0.8",
          networkCode: "BSC",
          platform: "MEME",
        },
      }),
    },
  );

  const create = await createTokenResponse.json();
  if (!create.data.createArg || !create.data.signature) {
    throw new Error(JSON.stringify(create));
  }
  return {
    createArg: create.data.createArg,
    signature: create.data.signature,
  };
};

const getUserInfo = async (
  accessToken: string,
): Promise<{
  userId: string;
}> => {
  const userInfoResponse = await fetch(
    "https://four.meme/meme-api/v1/private/user/info",
    {
      headers: {
        "meme-web-access": accessToken,
      },
    },
  );
  const userInfo = await userInfoResponse.json();
  if (!userInfo.data) {
    throw new Error(JSON.stringify(userInfo));
  }
  return userInfo.data;
};

export async function getTokenHoldings(agent: EvmAgentKit) {
  const nonce = await getNonce(agent);

  const accessToken = await getAccessToken(nonce, agent);
  if (!accessToken) {
    return {
      error: "Failed to get access token",
      errorMsg: JSON.stringify(accessToken),
    };
  }

  const userInfo = await getUserInfo(accessToken);
  if (!userInfo) {
    return {
      error: "Failed to get user info",
      errorMsg: JSON.stringify(userInfo),
    };
  }

  const listTokensResponse = await fetch(
    `https://four.meme/meme-api/v1/private/user/token/owner/list?userId=${userInfo.userId}&orderBy=CREATE_DATE&sorted=DESC&tokenName=&pageIndex=1&pageSize=300&symbol=`,
    {
      headers: {
        "meme-web-access": accessToken,
      },
    },
  );

  const listTokens = await listTokensResponse.json();
  if (!listTokens.data) {
    return {
      error: "Failed to list tokens",
      errorMsg: JSON.stringify(listTokens),
    };
  }

  const tokenPromises = listTokens.data.map(async (token: any) => {
    try {
      const balance = await agent.connection.readContract({
        address: token.tokenAddress,
        abi: [
          {
            inputs: [
              { internalType: "string", name: "name", type: "string" },
              { internalType: "string", name: "symbol", type: "string" },
              { internalType: "uint256", name: "totalSupply", type: "uint256" },
            ],
            stateMutability: "nonpayable",
            type: "constructor",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            name: "Approval",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
              },
            ],
            name: "OwnershipTransferred",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            name: "Transfer",
            type: "event",
          },
          {
            inputs: [],
            name: "MODE_NORMAL",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "MODE_TRANSFER_CONTROLLED",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "MODE_TRANSFER_RESTRICTED",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "_mode",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "owner", type: "address" },
              { internalType: "address", name: "spender", type: "address" },
            ],
            name: "allowance",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "spender", type: "address" },
              { internalType: "uint256", name: "amount", type: "uint256" },
            ],
            name: "approve",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "account", type: "address" },
            ],
            name: "balanceOf",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "decimals",
            outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "spender", type: "address" },
              {
                internalType: "uint256",
                name: "subtractedValue",
                type: "uint256",
              },
            ],
            name: "decreaseAllowance",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "spender", type: "address" },
              { internalType: "uint256", name: "addedValue", type: "uint256" },
            ],
            name: "increaseAllowance",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "name",
            outputs: [{ internalType: "string", name: "", type: "string" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "owner",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "renounceOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [{ internalType: "uint256", name: "v", type: "uint256" }],
            name: "setMode",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "symbol",
            outputs: [{ internalType: "string", name: "", type: "string" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "totalSupply",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "to", type: "address" },
              { internalType: "uint256", name: "amount", type: "uint256" },
            ],
            name: "transfer",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "from", type: "address" },
              { internalType: "address", name: "to", type: "address" },
              { internalType: "uint256", name: "amount", type: "uint256" },
            ],
            name: "transferFrom",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "newOwner", type: "address" },
            ],
            name: "transferOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        functionName: "balanceOf",
        args: [agent.wallet.getAddress() as Address],
      });

      return {
        userId: token.userId,
        userName: token.userName,
        // "tokenId": token.tokenId,
        tokenName: token.tokenName,
        tokenAddress: token.tokenAddress,
        shortName: token.shortName,
        descr: token.descr,
        image: token.image,
        myTokenAmount: formatUnits(balance, 18),
        increase: `${token.increase} * 100%`,
        price: token.price,
        dayIncrease: `${token.dayIncrease} * 100%`,
        status: token.status,
        oscarStatus: token.oscarStatus,
        symbol: token.symbol,
        progressToBondingCurve: `${token.progress} * 100%`,
      };
    } catch (error) {
      console.error(error);
      return {
        userId: token.userId,
        userName: token.userName,
        tokenName: token.tokenName,
        tokenAddress: token.tokenAddress,
        shortName: token.shortName,
        descr: token.descr,
        image: token.image,
        myTokenAmount: 0n,
        increase: `${token.increase} * 100%`,
        price: token.price,
        dayIncrease: `${token.dayIncrease} * 100%`,
        status: token.status,
        oscarStatus: token.oscarStatus,
        symbol: token.symbol,
        progressToBondingCurve: `${token.progress} * 100%`,
      };
    }
  });

  return Promise.all(tokenPromises);
}

export async function getFourMemeTrendingTokens(_agent: EvmAgentKit) {
  const trendingTokensResponse = await fetch(
    "https://four.meme/meme-api/v1/private/token/query?orderBy=Hot&tokenName=&listedPancake=false&pageIndex=1&pageSize=30&symbol=&labels=",
  );

  const trendingTokens = await trendingTokensResponse.json();
  if (!trendingTokens.data) {
    return {
      error: "Failed to get trending tokens",
      errorMsg: JSON.stringify(trendingTokens),
    };
  }

  return trendingTokens.data.map((token: any) => ({
    id: token.id,
    tokenAddress: token.address,
    image: token.image,
    name: token.name,
    shortName: token.shortName,
    symbol: token.symbol,
    descr: token.descr,
    twitterUrl: token.twitterUrl,
    telegramUrl: token.telegramUrl,
    webUrl: token.webUrl,
    launchTime: token.launchTime,
    userId: token.userId,
    tokenPrice: {
      price: token.tokenPrice.price,
      maxPrice: token.tokenPrice.maxPrice,
      increasePercent: token.tokenPrice.increase,
      marketCapInNetworkCode: token.tokenPrice.marketCap,
      dayIncreasePercent: token.tokenPrice.dayIncrease,
      progressToBondingCurvePercent: token.tokenPrice.progress,
      tradingVolumeUsd: token.tokenPrice.tradingUsd,
    },
    networkCode: token.networkCode,
    label: token.label,
    createDate: token.createDate,
    dexType: token.dexType,
  }));
}

/**
 * Deploy a token via TokenManager's createToken() using raw transaction
 */
export async function createToken(params: {
  agent: EvmAgentKit;
  tokenManagerAddress: Address;
  bnbAmount: number;
  name: string;
  shortName: string;
  desc: string;
  imgUrl: string;
  launchTimeFromNow: number;
  label:
    | "Meme"
    | "AI"
    | "Defi"
    | "Games"
    | "Infra"
    | "De-Sci"
    | "Social"
    | "Depin"
    | "Charity"
    | "Others";
  webUrl: string | undefined;
  twitterUrl: string | undefined;
  telegramUrl: string | undefined;
}) {
  const {
    agent,
    tokenManagerAddress,
    bnbAmount,
    name,
    shortName,
    desc,
    imgUrl,
    launchTimeFromNow,
    label,
    webUrl,
    twitterUrl,
    telegramUrl,
  } = params;
  const nonce = await getNonce(agent);
  // console.log('nonce:', nonce)

  const accessToken = await getAccessToken(nonce, agent);
  if (!accessToken) {
    return {
      error: "Failed to get access token",
      errorMsg: JSON.stringify(accessToken),
    };
  }
  // console.log('accessToken:', accessToken)

  const image = await uploadImage(accessToken, imgUrl);
  if (!image) {
    return { error: "Failed to upload image", errorMsg: JSON.stringify(image) };
  }

  const createFourMemeTokenResponse = await createFourMemeToken(
    accessToken,
    name,
    shortName,
    desc,
    image,
    launchTimeFromNow,
    label,
    bnbAmount,
    webUrl,
    twitterUrl,
    telegramUrl,
  );

  const { createArg, signature } = createFourMemeTokenResponse;
  if (!createArg || !signature) {
    return {
      error: "Failed to create FourMeme token parameters",
      errorMsg: JSON.stringify(createFourMemeTokenResponse),
    };
  }

  const calldata = encodeFunctionData({
    abi: tokenManagerAbi,
    functionName: "createToken",
    args: [createArg, signature],
  });

  const txHash = await agent.wallet.sendTransaction({
    to: tokenManagerAddress,
    data: calldata,
    value: parseEther(bnbAmount.toString()),
  });

  // console.log(`📤 Token creation tx sent: ${txHash}`);
  return txHash;
}

/**
 * Agent purchases tokens via the Token Manager on BNB Chain
 */
export async function purchaseFourMemeToken(params: {
  agent: EvmAgentKit;
  tokenManagerAddress: Address;
  tokenAddress: Address;
  amount: bigint;
}) {
  const { agent, tokenManagerAddress, tokenAddress, amount } = params;
  // First get info about the token
  const tokenInfo = await fetch(
    `https://four.meme/meme-api/v1/private/token/get/v2?address=${tokenAddress}`,
  );
  const tokenInfoData = (await tokenInfo.json()).data;
  if (!tokenInfoData) {
    return {
      error: "Failed to get token info",
      errorMsg: JSON.stringify(tokenInfoData),
    };
  }

  if (tokenInfoData.symbol !== "BNB") {
    return {
      error: "Only BNB is supported at this time.",
      errorMsg: JSON.stringify(tokenInfoData),
    };
  }

  const data = encodeFunctionData({
    abi: [
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
    ],
    functionName: "buyTokenAMAP",
    args: [
      tokenAddress,
      parseEther(amount.toString()),
      parseEther(
        // 0.001 is buffer to account for any extra fees
        (
          (Number(amount) - 0.001) /
          parseFloat(tokenInfoData.tokenPrice.price)
        ).toString(),
      ),
    ],
  });

  const txHash = await agent.wallet.sendTransaction({
    to: tokenManagerAddress,
    data,
    value: parseEther(amount.toString()),
  });

  return txHash;
}

export async function sellToken(params: {
  agent: EvmAgentKit;
  tokenManagerAddress: Address;
  tokenAddress: Address;
  tokenAmount: bigint;
}) {
  const { agent, tokenManagerAddress, tokenAddress, tokenAmount } = params;
  const tokenListingsResult = await getTokenHoldings(agent);

  // Check if the result is an error object
  if ("error" in tokenListingsResult) {
    return {
      error: "Failed to get token holdings",
      errorMsg: tokenListingsResult.errorMsg,
    };
  }

  const tokenListing = tokenListingsResult.find(
    (listing: any) => listing.tokenAddress === tokenAddress,
  );
  if (!tokenListing) {
    return {
      error: "Token not found",
      errorMsg: JSON.stringify(tokenListingsResult),
    };
  }

  if (tokenListing.myTokenAmount < tokenAmount) {
    return {
      error: "Token amount is less than the amount to sell",
      errorMsg: JSON.stringify(tokenListing),
    };
  }

  // First approve the token manager to spend the tokens
  const approvalResult = await approve(
    agent.wallet,
    tokenAddress,
    tokenManagerAddress,
    parseEther(tokenAmount.toString()),
  );

  if (approvalResult.startsWith("Error")) {
    return {
      error: "Failed to approve token spending",
      errorMsg: approvalResult,
    };
  }

  const data = encodeFunctionData({
    abi: [
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
    ],
    functionName: "sellToken",
    args: [tokenAddress, parseEther(tokenAmount.toString())],
  });

  const txHash = await agent.wallet.sendTransaction({
    to: tokenManagerAddress,
    data,
  });

  return txHash;
}
