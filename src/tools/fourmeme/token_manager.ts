import { EvmAgentKit } from "../../agent";
import {
  Address,
  encodeFunctionData,
  parseEther,
  encodeAbiParameters,
} from "viem";
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
export async function purchaseToken(
  agent: EvmAgentKit,
  tokenManagerAddress: Address,
  tokenAddress: Address,
  amount: bigint,
  maxFunds: bigint,
) {
  const data = encodeFunctionData({
    abi: tokenManagerAbi,
    functionName: "TokenPurchase",
    args: [tokenAddress, amount, maxFunds],
  });

  const txHash = await agent.wallet.sendTransaction({
    to: tokenManagerAddress,
    data,
    value: maxFunds, // Pass BNB if required
  });

  return txHash;
}

export async function sellToken(
  agent: EvmAgentKit,
  tokenManagerAddress: Address,
  tokenAddress: Address,
  tokenAmount: bigint,
) {
  const data = encodeFunctionData({
    abi: tokenManagerAbi,
    functionName: "sellToken",
    args: [tokenAddress, tokenAmount],
  });

  const txHash = await agent.wallet.sendTransaction({
    to: tokenManagerAddress,
    data,
  });

  // console.log(`✅ Token sale submitted: ${txHash}`);
  return txHash;
}

export function encodeTokenInfo(params: {
  base: Address;
  quote: Address;
  template: bigint;
  totalSupply: bigint;
  maxOffers: bigint;
  maxRaising: bigint;
  launchTime: bigint;
  offers?: bigint;
  funds?: bigint;
  lastPrice?: bigint;
  K?: bigint;
  T?: bigint;
  status?: bigint;
}): `0x${string}` {
  return encodeAbiParameters(
    [
      { name: "base", type: "address" },
      { name: "quote", type: "address" },
      { name: "template", type: "uint256" },
      { name: "totalSupply", type: "uint256" },
      { name: "maxOffers", type: "uint256" },
      // { name: "maxRaising", type: "uint256" },
      { name: "launchTime", type: "uint256" },
      { name: "offers", type: "uint256" },
      { name: "funds", type: "uint256" },
      { name: "lastPrice", type: "uint256" },
      { name: "K", type: "uint256" },
      { name: "T", type: "uint256" },
      { name: "status", type: "uint256" },
    ],
    [
      params.base,
      params.quote,
      params.template,
      params.totalSupply,
      params.maxOffers,
      // params.maxRaising,
      params.launchTime,
      params.offers ?? 0n,
      params.funds ?? 0n,
      params.lastPrice ?? 0n,
      params.K ?? 1n,
      params.T ?? 3600n,
      params.status ?? 0n,
    ],
  );
}
