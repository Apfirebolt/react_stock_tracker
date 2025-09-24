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

const countriesAtom = atom<Country[]>([]);

export { countriesAtom };