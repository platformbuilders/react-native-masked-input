"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _maskResolver = _interopRequireDefault(require("./mask-resolver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MaskService {
  static toMask(type, value, settings) {
    return _maskResolver.default.resolve(type).getValue(value, settings);
  }

  static toRawValue(type, maskedValue, settings) {
    return _maskResolver.default.resolve(type).getRawValue(maskedValue, settings);
  }

  static isValid(type, value, settings) {
    return _maskResolver.default.resolve(type).validate(value, settings);
  }

  static getMask(type, value, settings) {
    return _maskResolver.default.resolve(type).getMask(value, settings);
  }

}

exports.default = MaskService;
//# sourceMappingURL=mask-service.js.map