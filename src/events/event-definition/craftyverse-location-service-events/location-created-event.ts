import { Subjects } from "../../subjects";
export interface LocationCreatedEvent {
  subject: Subjects.LocationCreated;
  data: {
    locationId: string;
    locationUserId: string;
    locationName: string;
    locationEmail: string;
    locationIndustry: string;
    locationRegion: string;
    locationCurrency: string;
    locationTimeZone: string;
    locationSIUnit: string;
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