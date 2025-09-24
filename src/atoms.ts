import { atom } from 'jotai';

export interface Country {
    code2: string;
    code3: string;
    codeNo: string;
    country: string;
    countryRiskPremium: number | null;
    currency: string;
    currencyCode: string;
    defaultSpread: number | null;
    equityRiskPremium: number | null;
    rating: string | null;
    region: string;
    subRegion: string;
}

export interface Symbol {
    description: string;
    displaySymbol: string;
    symbol: string;
    type: string;
}

export interface StockPrice {
    c: number;    // current price
    d: number;    // change
    dp: number;   // percent change
    h: number;    // high price of the day
    l: number;    // low price of the day
    o: number;    // open price of the day
    pc: number;   // previous close price
    t: number;    // timestamp
}

export interface NewsItem {
    category: string;
    datetime: number;
    headline: string;
    id: number;
    image: string;
    related: string;
    source: string;
    summary: string;
    url: string;
}

export interface Recommendation {
    buy: number;
    hold: number;
    period: string;
    sell: number;
    strongBuy: number;
    strongSell: number;
    symbol: string;
}

const countriesAtom = atom<Country[]>([]);
const symbolsAtom = atom<Symbol[]>([]);

export { countriesAtom, symbolsAtom };