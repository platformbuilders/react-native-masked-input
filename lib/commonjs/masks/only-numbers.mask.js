"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("./_base.mask"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class OnlyNumbersMask extends _base.default {
  static getType() {
    return 'only-numbers';
  }

  getValue(value, settings) {
    return this.removeNotNumbers(String(value));
  }

  getRawValue(maskedValue, settings) {
    return super.removeNotNumbers(String(maskedValue));
  }

  validate(value, settings) {
    return true;
  }

  getMask(value, settings) {
    return '';
  }

}

exports.default = OnlyNumbersMask;
//# sourceMappingURL=only-numbers.mask.js.map