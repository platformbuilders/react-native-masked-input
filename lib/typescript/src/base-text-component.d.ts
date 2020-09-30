import { PureComponent } from 'react';
import type { MaskHandlerInterface, MaskHandlerReturnType, TextInputMaskProps, ValueType } from '../index';
export default class BaseTextComponent<T extends TextInputMaskProps> extends PureComponent<T> {
    _maskHandler: MaskHandlerInterface<any>;
    constructor(props: T);
    componentDidMount(): void;
    componentDidUpdate(prevProps: T): void;
    updateValue(text: string): MaskHandlerReturnType;
    isValid(): void;
    getRawValueFor(value: ValueType): number;
    getRawValue(): number;
    getDisplayValueFor(value: ValueType): string;
    _getOptions(): T["options"] | undefined;
    _mustUpdateValue(newValue: ValueType): boolean;
    _resolveMaskHandler(): void;
    _bindProps(nextProps: T): void;
    _getDefaultMaskedValue(value: ValueType): string;
    _getMaskedValue(value: ValueType): string;
    _getDefaultValue(value: ValueType): import("react").ReactText;
}
