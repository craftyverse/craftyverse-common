"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    // These product status may change or additional status may be added
    OrderStatus["Created"] = "created";
    OrderStatus["Cancelled"] = "cancelled";
    OrderStatus["Incomplete"] = "incomplete";
    OrderStatus["Complete"] = "complete";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
