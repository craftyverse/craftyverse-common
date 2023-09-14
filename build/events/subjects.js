"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subjects = void 0;
var Subjects;
(function (Subjects) {
    /*
     * This will list all of the possible types of subjects (events) that will be emitted from the location service
     */
    Subjects["LocationCreated"] = "location:created";
    Subjects["LocationPatched"] = "location:patched";
    Subjects["LocationRetrievedById"] = "location:retrieved:id";
    Subjects["LocationRetrievedByEmail"] = "location:retrieved:email";
    Subjects["LocationDeleted"] = "location:deleted";
    /*
     * This will list all of the possible types of subjects (events) that will be emitted from the image service
     */
    Subjects["ImageUploaded"] = "image:uploaded";
})(Subjects || (exports.Subjects = Subjects = {}));
