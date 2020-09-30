"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _creditCardType = _interopRequireDefault(require("credit-card-type"));

var _base = _interopRequireDefault(require("./_base.mask"));

var _custom = _interopRequireDefault(require("./custom.mask"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultType = {
  type: 'default',
  gaps: [4, 8, 12],
  lengths: [16]
};
const MASK_TRANSLATION = {
  '*': val => '*'
};

class CreditCardMask extends _base.default {
  static getType() {
    return 'credit-card';
  }

  getValue(value, settings) {
    return _custom.default.shared.getValue(value, {
      mask: this.getMask(value, settings),
      translation: MASK_TRANSLATION
    });
  }

  validate(value) {
    if (value) {
      const type = this.getCardType(value);
      return type.lengths.includes(value.length);
    }

    return true;
  }

  getRawValue(maskedValue, settings) {
    if (!maskedValue) return [];
    return maskedValue.split(' ').map(val => {
      if (!val) return '';
      return val.trim();
    });
  }

  getMask(value, settings = {}) {
    const type = this.getCardType(value);
    const length = Math.max(...type.lengths);
    const gaps = type.gaps.map((g, i) => g + i);
    const firstGap = gaps[0];
    const lastGap = gaps[gaps.length - 1];
    return Array.from(new Array(length + gaps.length)).map((_, i) => {
      if (gaps.includes(i)) return ' ';
      if (settings.obfuscated && i > firstGap && i < lastGap) return '*';
      return 9;
    }).join('');
  }

  getCardType(value) {
    return (0, _creditCardType.default)(value)[0] || defaultType;
  }

}

exports.default = CreditCardMask;
//# sourceMappingURL=credit-card.mask.js.map