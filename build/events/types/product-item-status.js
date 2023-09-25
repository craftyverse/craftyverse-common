"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStatus = void 0;
var ProductStatus;
(function (ProductStatus) {
    // These product status may change or additional status may be added
    // The "Created" status denotes that a product is newly created
    ProductStatus["Created"] = "created";
    // The "NeedsMoreInfo" status denotes that a product does not have
    // all the required information.
    ProductStatus["NeedsMoreInfo"] = "needsMoreInfo";
    // The "Available" status denotes that a product has successfully been published
    // and can be displayed on the e-commerce platform.
    ProductStatus["Available"] = "Available";
    // The "LowStock" status denotes that a product stock number is less than 3.
    ProductStatus["LowStock"] = "lowStock";
    // The "Unavailable" status denotes that the product
    ProductStatus["Complete"] = "complete";
})(ProductStatus || (exports.ProductStatus = ProductStatus = {}));
