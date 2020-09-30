"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("./_base.mask"));

var _custom = _interopRequireDefault(require("./custom.mask"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ZIP_CODE_MASK = '99999-999';
const MASK_OPTIONS = {
  mask: ZIP_CODE_MASK
};

class ZipCodeMask extends _base.default {
  static getType() {
    return 'zip-code';
  }

  getValue(value, settings) {
    return _custom.default.shared.getValue(value, MASK_OPTIONS);
  }

  getRawValue(maskedValue, settings) {
    return super.removeNotNumbers(maskedValue);
  }

  validate(value, settings) {
    if (value) {
      return value.length === ZIP_CODE_MASK.length;
    }

    return value.length > 0;
  }

  getMask(value, settings) {
    return ZIP_CODE_MASK;
  }

}

exports.default = ZipCodeMask;
//# sourceMappingURL=zip-code.mask.js.map