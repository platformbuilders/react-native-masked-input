"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.validateCPF = exports.CPF_MASK = void 0;

var _base = _interopRequireDefault(require("./_base.mask"));

var _custom = _interopRequireDefault(require("./custom.mask"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CPF_MASK = '999.999.999-99';
exports.CPF_MASK = CPF_MASK;

const validateCPF = cpf => {
  if (cpf === '') {
    return true;
  }

  cpf = cpf.replace(/\./gi, '').replace(/-/gi, '');
  var isValid = true;
  var sum;
  var rest;
  var i;
  i = 0;
  sum = 0;

  if (cpf.length !== 11 || cpf === '00000000000' || cpf === '11111111111' || cpf === '22222222222' || cpf === '33333333333' || cpf === '44444444444' || cpf === '55555555555' || cpf === '66666666666' || cpf === '77777777777' || cpf === '88888888888' || cpf === '99999999999') {
    isValid = false;
  }

  for (i = 1; i <= 9; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
  }

  rest = sum * 10 % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }

  if (rest !== parseInt(cpf.substring(9, 10), 10)) {
    isValid = false;
  }

  sum = 0;

  for (i = 1; i <= 10; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
  }

  rest = sum * 10 % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }

  if (rest !== parseInt(cpf.substring(10, 11), 10)) {
    isValid = false;
  }

  return isValid;
};

exports.validateCPF = validateCPF;
const maskOptions = {
  mask: CPF_MASK
};

class CpfMask extends _base.default {
  static getType() {
    return 'cpf';
  }

  getValue(value, settings) {
    return _custom.default.shared.getValue(value, maskOptions);
  }

  getRawValue(maskedValue, settings) {
    return super.removeNotNumbers(maskedValue);
  }

  validate(value, settings) {
    var isEmpty = (value || '').trim().length === 0;
    return !isEmpty && validateCPF(value);
  }

  getMask(value, settings) {
    return CPF_MASK;
  }

}

exports.default = CpfMask;
//# sourceMappingURL=cpf.mask.js.map