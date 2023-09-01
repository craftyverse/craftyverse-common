import { Subjects } from "../../subjects";
export interface LocationDeletedEvent {
  subject: Subjects.LocationDeleted;
  data: {
    locationId: string;
  };
}
