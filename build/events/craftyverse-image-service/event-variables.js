"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageBucketVariables = exports.imageQueueVariables = exports.imageEventVariables = void 0;
var imageEventVariables;
(function (imageEventVariables) {
    imageEventVariables["IMAGE_UPLOADED_EVENT"] = "image_uploaded";
})(imageEventVariables || (exports.imageEventVariables = imageEventVariables = {}));
var imageQueueVariables;
(function (imageQueueVariables) {
    imageQueueVariables["IMAGE_UPLOADED_QUEUE"] = "image_upload_queue";
})(imageQueueVariables || (exports.imageQueueVariables = imageQueueVariables = {}));
var imageBucketVariables;
(function (imageBucketVariables) {
    imageBucketVariables["IMAGE_BUCKET_NAME"] = "craftyverse-image-bucket";
})(imageBucketVariables || (exports.imageBucketVariables = imageBucketVariables = {}));
