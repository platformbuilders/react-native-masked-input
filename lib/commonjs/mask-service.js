"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _maskResolver = _interopRequireDefault(require("./mask-resolver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MaskService {
  static toMask(type, value, options) {
    return _maskResolver.default.resolve(type).getValue(value, options);
  }

  static toRawValue(type, maskedValue, options) {
    return _maskResolver.default.resolve(type).getRawValue(maskedValue, options);
  }

  static isValid(type, value, options) {
    return _maskResolver.default.resolve(type).validate(value, options);
  }

  static getMask(type, value, options) {
    return _maskResolver.default.resolve(type).getMask(value, options);
  }

}

exports.default = MaskService;
//# sourceMappingURL=mask-service.js.map