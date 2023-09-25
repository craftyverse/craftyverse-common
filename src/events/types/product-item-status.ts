export enum ProductStatus {
  // These product status may change or additional status may be added

  // The "Created" status denotes that a product is newly created
  Created = "created",

  // The "NeedsMoreInfo" status denotes that a product does not have
  // all the required information.
  NeedsMoreInfo = "needsMoreInfo",

  // The "Available" status denotes that a product has successfully been published
  // and can be displayed on the e-commerce platform.
  Available = "Available",

  // The "LowStock" status denotes that a product stock number is less than 3.
  LowStock = "lowStock",

  // The "Unavailable" status denotes that the product
  Complete = "complete",
}
