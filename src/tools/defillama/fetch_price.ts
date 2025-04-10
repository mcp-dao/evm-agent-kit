import { DEFILLAMA_PRICES_URL } from "./constants";

/**
 * @param chainTokenAddrStrings String array of strings in format of "chain:token_address" (e.g. "ethereum:0x0000000000000000000000000000000000000000")
 * @param searchWidth The width of the search window for the price data. Default is "6h"
 * @returns JSON string of the price data
 */
export async function fetchPrices(args: {
  chainTokenAddrStrings: string[];
  searchWidth?: string;
}): Promise<string> {
  try {
    const { chainTokenAddrStrings, searchWidth } = args;
    const params = new URLSearchParams({});
    const tokens = chainTokenAddrStrings.join(",");

    if (searchWidth) {
      params.set("searchWidth", searchWidth);
    }

    const url = `${DEFILLAMA_PRICES_URL}/prices/current/${tokens}?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return JSON.stringify(data, null, 2);
  } catch (error: unknown) {
    return `Error fetching token prices: ${error instanceof Error ? error.message : String(error)}`;
  }
}
