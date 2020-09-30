"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("./_base.mask"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class OnlyLettersMask extends _base.default {
  static getType() {
    return 'only-letters';
  }

  getValue(value, settings) {
    return this.removeNotLetters(String(value));
  }

  getRawValue(maskedValue, settings) {
    return super.removeNotLetters(String(maskedValue));
  }

  validate(value, settings) {
    return true;
  }

  getMask(value, settings) {
    return '';
  }

}

exports.default = OnlyLettersMask;
//# sourceMappingURL=only-letters.mask.js.map