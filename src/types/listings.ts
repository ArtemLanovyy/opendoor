export interface Address {
  location: [number, number];
  googlePlaceId: string;
  formattedAddress: string;
  state: string;
  stateCode: string;
  streetNumber: string;
  route: string;
  locality: string;
  county: string;
  zipcode: string;
  kind: string;
  friendlyUrl: string;
  neighborhood?: string;
}

export interface UserData {
  inspectionAvailability: any[];
  askingPrice: number;
  wastewaterType: string;
  foundationIssues: boolean;
  hoaFee: number | null;
  hoaPeriod: string | null;
  linkToPhotos: string | null;
  updatedAskingPrice: any[];
  arv?: number;
  rent?: number;
  rehabCost?: number;
  relationship?: string;
  occupancy?: string;
  isUnderContract?: boolean;
  sellerCommission?: number | null;
  description?: string;
}

export interface ZillowData {
  yearBuilt: number | null;
  lotSize: number | null;
  zestimate: number | null;
  rentZestimate: number | null;
  livingAreaValue: number;
  homeType: string;
  bedrooms: number;
  bathrooms: number;
  homeStatus: string;
  hdpUrl: string;
  dateSold: number | null;
  listing_sub_type: {
    is_FSBA: boolean;
    is_newHome: boolean;
    is_FSBO: boolean;
    is_pending: boolean;
    is_bankOwned: boolean;
    is_openHouse: boolean;
    is_forAuction: boolean;
    is_comingSoon: boolean;
    is_foreclosure: boolean;
  };
  hoaFee: number | null;
  schoolRating: number;
  parkingSpaces: number;
  hasPool: boolean | null;
}

export interface Listing {
  _id: string;
  address: Address;
  userData: UserData;
  zillowData: ZillowData;
}

export interface ListingsResponse {
  success: boolean;
  deals: Listing[];
}
