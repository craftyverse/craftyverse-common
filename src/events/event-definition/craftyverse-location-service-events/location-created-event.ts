import { Subjects } from "../../subjects";

enum locationRegionEnum {
  Australia = "AUS",
  England = "ENG",
  America = "USA",
  China = "CHN",
}

enum locationSIUnitEnum {
  Pound = "LB",
  Kilo = "KG",
}

enum locationCurrencyEnum {
  AustralianDollar = "AUD",
  USDollar = "USD",
  ChineseDollar = "RMB",
}

export interface LocationCreatedEvent {
  subject: Subjects.LocationCreated;
  data: {
    locationId: string;
    locationUserId: string;
    locationName: string;
    locationEmail: string;
    locationIndustry: string;
    locationRegion: locationRegionEnum;
    locationCurrency: locationCurrencyEnum;
    locationTimeZone: string;
    locationSIUnit: locationSIUnitEnum;
    locationLegalBusinessName: string;
    locationLegalAddressLine1: string;
    locationLegalAddressLine2: string;
    locationLegalCity: string;
    locationLegalState: string;
    locationLegalCountry: string;
    locationLegalPostcode: string;
    locationApproved: boolean;
  };
}
