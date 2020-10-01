"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const mergeMoneyOptions = function (opts) {
  opts = opts || {};
  opts = {
    precision: opts.hasOwnProperty('precision') ? opts.precision : 2,
    separator: opts.separator || ',',
    delimiter: opts.delimiter || '.',
    unit: opts.unit ? opts.unit : '',
    //unit: opts.unit && (opts.unit.replace(/[\s]/g,'') + " ") || "",
    suffixUnit: opts.suffixUnit && ' ' + opts.suffixUnit.replace(/[\s]/g, '') || '',
    zeroCents: opts.zeroCents,
    lastOutput: opts.lastOutput
  };
  opts.moneyPrecision = opts.zeroCents ? 0 : opts.precision;
  return opts;
};

const addSeparators = (value, separator = ',') => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};

class VMasker {
  toMoney(value, opts) {
    opts = mergeMoneyOptions(opts);

    if (value === '-') {
      return '-';
    }

    value = value.toString();
    const isNegative = value.includes('-');
    const decimalSeparator = opts.delimiter;
    const [int, decimals] = value.split('.');
    const valueOnlyInt = isNegative ? int.replace('-', '') : int;
    const includePrefix = opts.unit ? opts.unit : '';
    const includeNegative = isNegative ? '-' : '';
    const formattedInt = addSeparators(valueOnlyInt, opts.separator);
    const fillWithZeroCount = opts.zeroCents ? opts.precision - (decimals ? decimals.length : 0) : 0;
    const includedZeroCents = fillWithZeroCount && fillWithZeroCount > 0 ? Array(fillWithZeroCount).fill(0).join('') : '';
    const includeDecimals = (value.includes('.') ? "".concat(decimalSeparator).concat(decimals).concat(includedZeroCents) : fillWithZeroCount ? decimalSeparator + includedZeroCents : '').slice(0, opts.precision + 1);
    let data = "".concat(includeNegative).concat(includePrefix).concat(formattedInt).concat(includeDecimals);
    return data;
  }

}
/*VMasker.toPattern = function (value, opts) {
  var pattern = typeof opts === 'object' ? opts.pattern : opts,
    patternChars = pattern.replace(/\W/g, ''),
    output = pattern.split(''),
    values = value.toString().replace(/\W/g, ''),
    charsValues = values.replace(/\W/g, ''),
    index = 0,
    i,
    outputLength = output.length,
    placeholder = typeof opts === 'object' ? opts.placeholder : undefined;
  for (i = 0; i < outputLength; i++) {
    // Reached the end of input
    if (index >= values.length) {
      if (patternChars.length === charsValues.length) {
        return output.join('');
      } else if (
        placeholder !== undefined &&
        patternChars.length > charsValues.length
      ) {
        return addPlaceholdersToOutput(output, i, placeholder).join('');
      } else {
        break;
      }
    }
    // Remaining chars in input
    else {
      if (
        (output[i] === DIGIT && values[index].match(/[0-9]/)) ||
        (output[i] === ALPHA && values[index].match(/[a-zA-Z]/)) ||
        (output[i] === ALPHANUM && values[index].match(/[0-9a-zA-Z]/))
      ) {
        output[i] = values[index++];
      } else if (
        output[i] === DIGIT ||
        output[i] === ALPHA ||
        output[i] === ALPHANUM
      ) {
        if (placeholder !== undefined) {
          return addPlaceholdersToOutput(output, i, placeholder).join('');
        } else {
          return output.slice(0, i).join('');
        }
      }
    }
  }
  return output.join('').substr(0, i);
};*/


const VMaskerObject = new VMasker();
var _default = VMaskerObject;
exports.default = _default;
//# sourceMappingURL=vanilla-masker.js.map