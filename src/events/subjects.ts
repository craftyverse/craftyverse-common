export enum Subjects {
  /*
   * This will list all of the possible types of subjects (events) that will be emitted from the location service
   */
  LocationCreated = "location:created",
  LocationPatched = "location:patched",
  LocationRetrievedById = "location:retrieved:id",
  LocationRetrievedByEmail = "location:retrieved:email",
  LocationDeleted = "location:deleted",

  /*
   * This will list all of the possible types of subjects (events) that will be emitted from the image service
   */
  ImageUploaded = "image:uploaded",
}
