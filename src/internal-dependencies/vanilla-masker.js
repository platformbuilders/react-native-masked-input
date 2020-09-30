(function (root, factory) {
  if (
    window.define &&
    typeof window.define === 'function' &&
    window.define.amd
  ) {
    window.define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.VMasker = factory();
  }
})(this, function () {
  var DIGIT = '9',
    ALPHA = 'A',
    ALPHANUM = 'S',
    BY_PASS_KEYS = [9, 16, 17, 18, 36, 37, 38, 39, 40, 91, 92, 93],
    isAllowedKeyCode = function (keyCode) {
      for (var i = 0, len = BY_PASS_KEYS.length; i < len; i++) {
        if (keyCode == BY_PASS_KEYS[i]) {
          return false;
        }
      }
      return true;
    },
    mergeMoneyOptions = function (opts) {
      opts = opts || {};
      opts = {
        precision: opts.hasOwnProperty('precision') ? opts.precision : 2,
        separator: opts.separator || ',',
        delimiter: opts.delimiter || '.',
        unit: opts.unit ? opts.unit : '',
        //unit: opts.unit && (opts.unit.replace(/[\s]/g,'') + " ") || "",
        suffixUnit:
          (opts.suffixUnit && ' ' + opts.suffixUnit.replace(/[\s]/g, '')) || '',
        zeroCents: opts.zeroCents,
        lastOutput: opts.lastOutput,
      };
      opts.moneyPrecision = opts.zeroCents ? 0 : opts.precision;
      return opts;
    },
    // Fill wildcards past index in output with placeholder
    addPlaceholdersToOutput = function (output, index, placeholder) {
      for (; index < output.length; index++) {
        if (
          output[index] === DIGIT ||
          output[index] === ALPHA ||
          output[index] === ALPHANUM
        ) {
          output[index] = placeholder;
        }
      }
      return output;
    };
  var VanillaMasker = function (elements) {
    this.elements = elements;
  };

  VanillaMasker.prototype.unbindElementToMask = function () {
    for (var i = 0, len = this.elements.length; i < len; i++) {
      this.elements[i].lastOutput = '';
      this.elements[i].onkeyup = false;
      this.elements[i].onkeydown = false;

      if (this.elements[i].value.length) {
        this.elements[i].value = this.elements[i].value.replace(/\D/g, '');
      }
    }
  };

  VanillaMasker.prototype.bindElementToMask = function (maskFunction) {
    var that = this,
      onType = function (e) {
        e = e || window.event;
        var source = e.target || e.srcElement;

        if (isAllowedKeyCode(e.keyCode)) {
          setTimeout(function () {
            that.opts.lastOutput = source.lastOutput;
            source.value = VMasker[maskFunction](source.value, that.opts);
            source.lastOutput = source.value;
            if (source.setSelectionRange && that.opts.suffixUnit) {
              source.setSelectionRange(
                source.value.length,
                source.value.length - that.opts.suffixUnit.length
              );
            }
          }, 0);
        }
      };
    for (var i = 0, len = this.elements.length; i < len; i++) {
      this.elements[i].lastOutput = '';
      this.elements[i].onkeyup = onType;
      if (this.elements[i].value.length) {
        this.elements[i].value = VMasker[maskFunction](
          this.elements[i].value,
          this.opts
        );
      }
    }
  };

  VanillaMasker.prototype.maskMoney = function (opts) {
    this.opts = mergeMoneyOptions(opts);
    this.bindElementToMask('toMoney');
  };

  VanillaMasker.prototype.maskNumber = function () {
    this.opts = {};
    this.bindElementToMask('toNumber');
  };

  VanillaMasker.prototype.maskAlphaNum = function () {
    this.opts = {};
    this.bindElementToMask('toAlphaNumeric');
  };

  VanillaMasker.prototype.maskPattern = function (pattern) {
    this.opts = { pattern: pattern };
    this.bindElementToMask('toPattern');
  };

  VanillaMasker.prototype.unMask = function () {
    this.unbindElementToMask();
  };

  const addSeparators = (value, separator = ',') => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  };

  var VMasker = function (el) {
    if (!el) {
      throw new Error('VanillaMasker: There is no element to bind.');
    }
    var elements = 'length' in el ? (el.length ? el : []) : [el];
    return new VanillaMasker(elements);
  };

  VMasker.toMoney = function (value, opts) {
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
    const fillWithZeroCount = opts.zeroCents
      ? opts.precision - (decimals ? decimals.length : 0)
      : 0;
    const includedZeroCents = fillWithZeroCount
      ? Array(fillWithZeroCount).fill(0).join('')
      : '';
    const includeDecimals = (value.includes('.')
      ? `${decimalSeparator}${decimals}${includedZeroCents}`
      : fillWithZeroCount
      ? decimalSeparator + includedZeroCents
      : ''
    ).slice(0, opts.precision + 1);

    let data = `${includeNegative}${includePrefix}${formattedInt}${includeDecimals}`;

    return data;
  };

  VMasker.toPattern = function (value, opts) {
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
        if (patternChars.length == charsValues.length) {
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
  };

  VMasker.toNumber = function (value) {
    return value.toString().replace(/(?!^-)[^0-9]/g, '');
  };

  VMasker.toAlphaNumeric = function (value) {
    return value.toString().replace(/[^a-z0-9 ]+/i, '');
  };

  return VMasker;
});
