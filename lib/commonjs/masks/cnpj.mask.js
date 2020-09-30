"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.validateCnpj = exports.CNPJ_MASK = void 0;

var _base = _interopRequireDefault(require("./_base.mask"));

var _custom = _interopRequireDefault(require("./custom.mask"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CNPJ_MASK = '99.999.999/9999-99';
exports.CNPJ_MASK = CNPJ_MASK;

const validateCnpj = cnpj => {
  var valida = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  var dig1 = 0;
  var dig2 = 0;
  var i;
  var exp = /\.\//g;
  cnpj = cnpj.toString().replace(exp, '');
  var digito = parseInt(cnpj.charAt(12) + cnpj.charAt(13), 10);

  for (i = 0; i < valida.length; i++) {
    dig1 += i > 0 ? cnpj.charAt(i - 1) * valida[i] : 0;
    dig2 += cnpj.charAt(i) * valida[i];
  }

  dig1 = dig1 % 11 < 2 ? 0 : 11 - dig1 % 11;
  dig2 = dig2 % 11 < 2 ? 0 : 11 - dig2 % 11;
  return dig1 * 10 + dig2 === digito;
};

exports.validateCnpj = validateCnpj;
const customMaskOptions = {
  mask: CNPJ_MASK
};

class CnpjMask extends _base.default {
  static getType() {
    return 'cnpj';
  }

  getValue(value, settings) {
    return _custom.default.shared.getValue(value, customMaskOptions);
  }

  getRawValue(maskedValue, settings) {
    return super.removeNotNumbers(maskedValue);
  }

  validate(value, settings) {
    var isEmpty = (value || '').trim().length === 0;
    return !isEmpty && validateCnpj(value);
  }

  getMask(value, settings) {
    return CNPJ_MASK;
  }

}

exports.default = CnpjMask;
//# sourceMappingURL=cnpj.mask.js.map