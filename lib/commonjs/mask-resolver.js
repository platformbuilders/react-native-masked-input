"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var Masks = _interopRequireWildcard(require("./masks"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var maskKeys = Object.keys(Masks);

class MaskResolver {
  static resolve(type) {
    let maskKey = maskKeys.find(m => {
      var handler = Masks[m];
      return handler && handler.getType && handler.getType() === type;
    });
    let handler = Masks[maskKey];

    if (!handler) {
      throw new Error('Mask type not supported.');
    }

    return new handler();
  }

}

exports.default = MaskResolver;
//# sourceMappingURL=mask-resolver.js.map