"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStatus = void 0;
var ProductStatus;
(function (ProductStatus) {
    // These product status may change or additional status may be added
    ProductStatus["Created"] = "created";
    ProductStatus["Cancelled"] = "cancelled";
    ProductStatus["Incomplete"] = "incomplete";
    ProductStatus["Complete"] = "complete";
})(ProductStatus || (exports.ProductStatus = ProductStatus = {}));
