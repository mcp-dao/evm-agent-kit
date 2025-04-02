import { z } from "zod";
import { Action } from "../../types";

const getCoingeckoTrendingTokensAction: Action = {
  name: "GET_COINGECKO_TRENDING_TOKENS_ACTION",
  description: "Get the trending tokens on Coingecko",
  similes: [
    "Get the trending tokens on Coingecko",
    "get me a list of the trending tokens on coingecko",
    "what are the trending tokens on coingecko",
  ],
  examples: [
    [
      {
        input: {},
        output: {
          coins: [
            {
              item: {
                id: "moon-tropica",
                coin_id: 28470,
                name: "Moon Tropica",
                symbol: "CAH",
                market_cap_rank: 530,
                thumb:
                  "https://assets.coingecko.com/coins/images/28470/standard/MTLOGO.png?1696527464",
                small:
                  "https://assets.coingecko.com/coins/images/28470/small/MTLOGO.png?1696527464",
                large:
                  "https://assets.coingecko.com/coins/images/28470/large/MTLOGO.png?1696527464",
                slug: "moon-tropica",
                price_btc: 0.000530163474333298,
                score: 0,
                data: {
                  price: 36.9717118016975,
                  price_btc: "0.000530163474333299",
                  price_change_percentage_24h: {
                    aed: -4.04467447608756,
                    ars: -4.04990008945855,
                    aud: -4.04990008945802,
                    bch: -2.37567962487489,
                    bdt: -4.0499000894585,
                    bhd: -4.16927013396437,
                    bmd: -4.04990008945853,
                    bnb: -3.4734695990217,
                    brl: -4.04990008945847,
                    btc: -5.98585375059246,
                    cad: -4.04990008945848,
                    chf: -4.04990008945855,
                    clp: -5.02567556756719,
                    cny: -4.0499000894584,
                    czk: -4.04990008945864,
                    dkk: -4.04990008945864,
                    dot: -5.98238779521245,
                    eos: -5.74405098071799,
                    eth: -5.05689445119971,
                    eur: -4.09661619752604,
                    gbp: -4.04990008945847,
                    gel: -4.04990008945897,
                    hkd: -4.04990008945852,
                    huf: -4.05387716450818,
                    idr: -4.04990008945821,
                    ils: -4.40922021210977,
                    inr: -4.04990008945856,
                    jpy: -4.04990008945905,
                    krw: -4.04990008945847,
                    kwd: -4.12041469685036,
                    lkr: -4.0499000894589,
                    ltc: -5.29341338838337,
                    mmk: -4.04990008945877,
                    mxn: -4.0499000894592,
                    myr: -4.04990008945872,
                    ngn: -4.04990008945849,
                    nok: -4.04990008945854,
                    nzd: -4.0499000894586,
                    php: -4.04990008945844,
                    pkr: -4.04990008945845,
                    pln: -4.04990008945856,
                    rub: -4.04990008945847,
                    sar: -4.04990008945841,
                    sek: -4.04990008945854,
                    sgd: -4.04990008945858,
                    thb: -4.04105687070854,
                    try: -4.04990008945837,
                    twd: -4.04990008945847,
                    uah: -4.17945939929411,
                    usd: -4.04990008945853,
                    vef: -4.0499000894584,
                    vnd: -4.04990008945868,
                    xag: -4.06208301025163,
                    xau: -4.04990008945842,
                    xdr: -4.04990008945852,
                    xlm: -4.12493924900392,
                    xrp: -4.48127069993476,
                    yfi: -4.04427366181248,
                    zar: -4.0499000894588,
                    bits: -5.98585375059245,
                    link: -5.12005806599531,
                    sats: -5.98585375059245,
                  },
                  market_cap: "$99,703,583",
                  market_cap_btc: "1428.83459310001",
                  total_volume: "$282,142",
                  total_volume_btc: "4.04583894742915",
                  sparkline:
                    "https://www.coingecko.com/coins/28470/sparkline.svg",
                  content: null,
                },
              },
            },
            {
              item: {
                id: "gala",
                coin_id: 12493,
                name: "GALA",
                symbol: "GALA",
                market_cap_rank: 53,
                thumb:
                  "https://assets.coingecko.com/coins/images/12493/standard/GALA_token_image_-_200PNG.png?1709725869",
                small:
                  "https://assets.coingecko.com/coins/images/12493/small/GALA_token_image_-_200PNG.png?1709725869",
                large:
                  "https://assets.coingecko.com/coins/images/12493/large/GALA_token_image_-_200PNG.png?1709725869",
                slug: "gala",
                price_btc: 8.99538550992028e-7,
                score: 1,
                data: {
                  price: 0.0627306136161425,
                  price_btc: "0.000000899538550992028",
                  price_change_percentage_24h: {
                    aed: 9.60780028942887,
                    ars: 9.60183117845321,
                    aud: 9.60183117845384,
                    bch: 11.4674219663065,
                    bdt: 9.60183117845328,
                    bhd: 9.4654772249098,
                    bmd: 9.60183117845317,
                    bnb: 10.2234284851282,
                    brl: 9.60183117845336,
                    btc: 7.38745825724124,
                    cad: 9.60183117845328,
                    chf: 9.60183117845322,
                    clp: 8.48722286309518,
                    cny: 9.60183117845327,
                    czk: 9.60183117845312,
                    dkk: 9.60183117845326,
                    dot: 7.37688026427037,
                    eos: 7.62858932956233,
                    eth: 8.45108220753484,
                    eur: 9.54846832636144,
                    gbp: 9.60183117845332,
                    gel: 9.60183117845289,
                    hkd: 9.60183117845327,
                    huf: 9.59728824719456,
                    idr: 9.60183117845271,
                    ils: 9.19138717205251,
                    inr: 9.60183117845323,
                    jpy: 9.60183117845302,
                    krw: 9.60183117845328,
                    kwd: 9.52128378869318,
                    lkr: 9.60183117845326,
                    ltc: 8.06524825045215,
                    mmk: 9.60183117845293,
                    mxn: 9.60183117845321,
                    myr: 9.60183117845329,
                    ngn: 9.60183117845327,
                    nok: 9.6018311784532,
                    nzd: 9.60183117845338,
                    php: 9.60183117845333,
                    pkr: 9.60183117845299,
                    pln: 9.6018311784534,
                    rub: 9.60183117845327,
                    sar: 9.6018311784533,
                    sek: 9.60183117845319,
                    sgd: 9.60183117845319,
                    thb: 9.61193260585552,
                    try: 9.60183117845312,
                    twd: 9.601831178453,
                    uah: 9.45383823610663,
                    usd: 9.60183117845317,
                    vef: 9.60183117845337,
                    vnd: 9.60183117845306,
                    xag: 9.58791487790447,
                    xau: 9.60183117845332,
                    xdr: 9.60183117845335,
                    xlm: 9.4911259696921,
                    xrp: 8.99767343610987,
                    yfi: 9.54409111376635,
                    zar: 9.6018311784527,
                    bits: 7.38745825724125,
                    link: 8.37662653267695,
                    sats: 7.38745825724125,
                  },
                  market_cap: "$2,365,621,969",
                  market_cap_btc: "33901.3141933559",
                  total_volume: "$212,777,204",
                  total_volume_btc: "3051.16253202022",
                  sparkline:
                    "https://www.coingecko.com/coins/12493/sparkline.svg",
                  content: {
                    title: "What is GALA?",
                    description:
                      "Gala is a blockchain gaming ecosystem. Gamers can explore different type of games and have their experiences interact across each other on the Gala platform. The GALA token is the utility token and primary medium of exchange of the ecosystem. Game items are represented as NFTs on the Ethereum blockchain and users can trade them on all marketplaces.",
                  },
                },
              },
            },
          ],
          nfts: [
            {
              id: "chameleon-travel-club",
              name: "ChameleonTravelClub",
              symbol: "CTC",
              thumb:
                "https://assets.coingecko.com/nft_contracts/images/3610/standard/chameleon-travel-club.png?1707290106",
              nft_contract_id: 3610,
              native_currency_symbol: "eth",
              floor_price_in_native_currency: 4.29,
              floor_price_24h_percentage_change: 57.3120347225931,
              data: {
                floor_price: "4.29 ETH",
                floor_price_in_usd_24h_percentage_change: "57.3120347225931",
                h24_volume: "11.26 ETH",
                h24_average_sale_price: "2.82 ETH",
                sparkline: "https://www.coingecko.com/nft/3610/sparkline.svg",
                content: null,
              },
            },
            {
              id: "natcats",
              name: "Natcats",
              symbol: "DMTNATCATS",
              thumb:
                "https://assets.coingecko.com/nft_contracts/images/4171/standard/natcats.png?1709517703",
              nft_contract_id: 4171,
              native_currency_symbol: "btc",
              floor_price_in_native_currency: 0.05139,
              floor_price_24h_percentage_change: 52.5917829733019,
              data: {
                floor_price: "0.051 BTC",
                floor_price_in_usd_24h_percentage_change: "52.5917829733019",
                h24_volume: "3.93 BTC",
                h24_average_sale_price: "0.049 BTC",
                sparkline: "https://www.coingecko.com/nft/4171/sparkline.svg",
                content: null,
              },
            },
          ],
          categories: [
            {
              id: 251,
              name: "Meme Coins",
              market_cap_1h_change: 1.44537649465531,
              slug: "meme-coins",
              coins_count: 79,
              data: {
                market_cap: 8237562936.01112,
                market_cap_btc: 118852.276224895,
                total_volume: 1207846273.32444,
                total_volume_btc: 17426.911336459,
                market_cap_change_percentage_24h: {
                  aed: 14.2303965235397,
                  ars: 14.224569755904,
                  aud: 14.2241756714483,
                  bch: 10.544446407888,
                  bdt: 14.2241756714484,
                  bhd: 14.0820711301687,
                  bmd: 14.2241756714485,
                  bnb: 12.6244772393324,
                  brl: 14.221695576047,
                  btc: 11.84681099263,
                  cad: 14.232580997301,
                  chf: 14.2241756714485,
                  clp: 13.0625598968815,
                  cny: 14.2178586614014,
                  czk: 14.2241756714486,
                  dkk: 14.2241756714484,
                  dot: 10.6966484935826,
                  eos: 10.1217314444624,
                  eth: 11.8847596390012,
                  eur: 14.1685622959589,
                  gbp: 14.2241756714485,
                  gel: 14.2241756714491,
                  hkd: 14.2241756714487,
                  huf: 14.2194411467367,
                  idr: 14.2241756714489,
                  ils: 13.7964216112624,
                  inr: 14.2241756714486,
                  jpy: 14.2241756714483,
                  krw: 14.2241756714485,
                  kwd: 14.1402312783772,
                  lkr: 14.2241756714485,
                  ltc: 8.6428668776247,
                  mmk: 14.224175671449,
                  mxn: 14.2241756714481,
                  myr: 14.2241756714485,
                  ngn: 14.2241756714486,
                  nok: 14.2241756714485,
                  nzd: 14.2241756714481,
                  php: 14.2241756714486,
                  pkr: 14.2241756714484,
                  pln: 14.2068251066482,
                  rub: 14.2241756714486,
                  sar: 14.2241756714487,
                  sek: 14.2241756714486,
                  sgd: 14.2241756714485,
                  thb: 14.2347031161614,
                  try: 14.2241756714486,
                  twd: 14.224175671449,
                  uah: 14.0699412789845,
                  usd: 14.2241756714485,
                  vef: 14.2241756714486,
                  vnd: 14.2241756714489,
                  xag: 14.2096724652385,
                  xau: 14.2241756714488,
                  xdr: 14.2241756714487,
                  xlm: 11.8320435642723,
                  xrp: 12.4172400147244,
                  yfi: 12.7954918554954,
                  zar: 14.2241756714481,
                  bits: 11.84681099263,
                  link: 11.6566512723034,
                  sats: 11.84681099263,
                },
                sparkline:
                  "https://www.coingecko.com/categories/25211443/sparkline.svg",
              },
            },
            {
              id: 327,
              name: "Gaming Platform",
              market_cap_1h_change: 1.10506929591162,
              slug: "gaming-platform",
              coins_count: 20,
              data: {
                market_cap: 3665275001.85375,
                market_cap_btc: 52882.9072802773,
                total_volume: 218189404.503211,
                total_volume_btc: 3148.05575080902,
                market_cap_change_percentage_24h: {
                  aed: 5.95319529244364,
                  ars: 5.94779073579304,
                  aud: 5.94742520692706,
                  bch: 2.53433127439418,
                  bdt: 5.94742520692721,
                  bhd: 5.81561764368333,
                  bmd: 5.94742520692732,
                  bnb: 4.46364185726444,
                  brl: 5.94512482068669,
                  btc: 3.7423257608765,
                  cad: 5.95522147796062,
                  chf: 5.94742520692729,
                  clp: 4.8699807896516,
                  cny: 5.9415659311167,
                  czk: 5.94742520692735,
                  dkk: 5.94742520692723,
                  dot: 2.67550470808869,
                  eos: 2.14224648404119,
                  eth: 3.7775246261735,
                  eur: 5.89584160909828,
                  gbp: 5.94742520692727,
                  gel: 5.94742520692782,
                  hkd: 5.94742520692747,
                  huf: 5.94303374864054,
                  idr: 5.94742520692765,
                  ils: 5.55066645570739,
                  inr: 5.94742520692736,
                  jpy: 5.94742520692707,
                  krw: 5.9474252069273,
                  kwd: 5.86956347359295,
                  lkr: 5.94742520692729,
                  ltc: 0.770541307223899,
                  mmk: 5.9474252069277,
                  mxn: 5.94742520692689,
                  myr: 5.94742520692724,
                  ngn: 5.94742520692737,
                  nok: 5.94742520692729,
                  nzd: 5.94742520692689,
                  php: 5.94742520692736,
                  pkr: 5.94742520692717,
                  pln: 5.93133187418339,
                  rub: 5.94742520692736,
                  sar: 5.94742520692747,
                  sek: 5.94742520692736,
                  sgd: 5.94742520692729,
                  thb: 5.95718982684932,
                  try: 5.94742520692738,
                  twd: 5.94742520692774,
                  uah: 5.80436672859846,
                  usd: 5.94742520692732,
                  vef: 5.94742520692733,
                  vnd: 5.94742520692767,
                  xag: 5.93397291150769,
                  xau: 5.94742520692753,
                  xdr: 5.94742520692749,
                  xlm: 3.72862838900029,
                  xrp: 4.27142116295708,
                  yfi: 4.62226465448499,
                  zar: 5.94742520692694,
                  bits: 3.7423257608765,
                  link: 3.5659451249189,
                  sats: 3.74232576087651,
                },
                sparkline:
                  "https://www.coingecko.com/categories/25211410/sparkline.svg",
              },
            },
          ],
        },
        explanation: "Get the trending tokens on Coingecko",
      },
    ],
  ],
  schema: z.object({}),
  handler: async (agent) => {
    try {
      return {
        status: "success",
        result: await agent.getTrendingTokensOnCoingecko(),
      };
    } catch (e) {
      return {
        status: "error",
        // @ts-expect-error - error is not a property of unknown
        message: e.message,
      };
    }
  },
};

export default getCoingeckoTrendingTokensAction;
