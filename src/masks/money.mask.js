import BaseMask from './_base.mask';
import VanillaMasker from '../internal-dependencies/vanilla-masker';

const MONEY_MASK_SETTINGS = {
  precision: 2,
  separator: ',',
  delimiter: '.',
  unit: 'R$',
  suffixUnit: '',
};

export default class MoneyMask extends BaseMask {
  static getType() {
    return 'money';
  }

  getValue(value, settings) {
    const mergedSettings = super.mergeSettings(MONEY_MASK_SETTINGS, settings);

    const raw = this.getRawValueForMask(value, mergedSettings);

    // empty content should return empty string
    if (raw === '') {
      return '';
    }

    return VanillaMasker.toMoney(raw, mergedSettings);
  }

  handleInit(maskedValue, settings) {
    const opts = super.mergeSettings(MONEY_MASK_SETTINGS, settings);

    return this.includeSuffix(maskedValue, opts);
  }

  handleBlur(maskedValue, settings) {
    const opts = super.mergeSettings(MONEY_MASK_SETTINGS, settings);

    return this.includeSuffix(maskedValue, opts);
  }

  includeSuffix(maskedValue, opts) {
    const includeSuffix = opts.suffixUnit ? opts.suffixUnit : '';
    let { maskedText, rawText } = {
      maskedText: this.clearSuffix(maskedValue, includeSuffix),
      rawText: this.getRawValue(maskedValue, opts),
    };
    maskedText = this.getValue(maskedText, opts);
    maskedText = `${maskedText}${includeSuffix}`;
    return { maskedText, rawText };
  }

  handleChange(value, settings) {
    const opts = super.mergeSettings(MONEY_MASK_SETTINGS, {
      ...settings,
      zeroCents: false,
    });

    if (value === undefined || value === null) {
      return { maskedText: '', rawText: 0 };
    }
    let maskedText = this.getValue(value, opts);
    return { maskedText, rawText: this.getRawValue(maskedText) };
  }
  clearSuffix(value, suffixUnit) {
    if (typeof value === 'number' || suffixUnit === '') {
      return value;
    }

    return value.includes(suffixUnit) ? value.replace(suffixUnit, '') : value;
  }

  handleFocus(maskedValue, settings) {
    const opts = super.mergeSettings(MONEY_MASK_SETTINGS, {
      ...settings,
      zeroCents: false,
    });

    if (typeof maskedValue === 'number') {
      return {
        maskedText: maskedValue === 0 ? '' : this.getValue(maskedValue, opts),
        rawText: maskedValue,
      };
    }

    const rawValue = this.getRawValue(maskedValue, opts);

    return {
      maskedText:
        rawValue !== 0
          ? this.clearSuffix(maskedValue, opts.suffixUnit || '')
          : '',
      rawText: rawValue,
    };
  }

  normalizeValue(maskedValue, settings) {
    if (typeof maskedValue === 'number') {
      return maskedValue;
    }

    const mergedSettings = super.mergeSettings(MONEY_MASK_SETTINGS, settings);
    const cleaned = super
      .removeNotNumbersForMoney(maskedValue)
      .toString()
      .split(mergedSettings.separator);

    // if seperator and delimeter are the same we cannot use the way we did before
    // this should not happen but if happens for some reason we will try to find decimals
    if (mergedSettings.separator === mergedSettings.delimiter) {
      if (cleaned.length === 1) {
        return cleaned[0];
      }

      const lastPart = cleaned.pop();
      const isLastPartDecimal = lastPart.length <= mergedSettings.precision;

      return cleaned.join('') + (isLastPartDecimal ? '.' + lastPart : lastPart);
    }

    return cleaned.join('').replace(mergedSettings.delimiter, '.');
  }

  getRawValueForMask(maskedValue, settings) {
    const normalized = this.normalizeValue(maskedValue, settings);

    if (normalized === '') {
      return '';
    }

    return normalized;
  }

  getRawValue(maskedValue, settings) {
    const mergedSettings = super.mergeSettings(MONEY_MASK_SETTINGS, settings);
    const normalized = this.normalizeValue(maskedValue, mergedSettings);
    return Number(normalized);
  }

  validate(value, settings) {
    return true;
  }

  _sanitize(value, settings) {
    if (typeof value === 'number') {
      return value.toFixed(settings.precision);
    }

    return value;
  }

  _insert(text, index, string) {
    if (index > 0) {
      return (
        text.substring(0, index) + string + text.substring(index, text.length)
      );
    } else {
      return string + text;
    }
  }
}
