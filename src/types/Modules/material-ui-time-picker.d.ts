declare module 'material-ui-time-picker' {
  import {StyledComponentProps} from '@material-ui/core';
  import {InputClassKey} from '@material-ui/core/Input';
  import {Component} from 'react';

  export interface TimeRange {
    start: Date
    end: Date
  }

  export interface MaterialUiTimePickerProps extends StyledComponentProps<InputClassKey> {
    /**
     * If true, automatically accept and close the picker on set minutes.
     * @default false
     */
    autoOk?: boolean

    /**
     * Override the label of the cancel button
     * @default 'Cancel'
     */
    cancelLabel?: string

    /**
     *  The default value of the input and picker.
     */
    defaultValue?: Date

    /**
     *  The initial value of the time picker.
     */
    initialTime?: Date

    /**
     *  The initial value of the actual input before a value is selected.
     */
    placeholder?: string

    /**
     * Sets the clock mode, 12-hour or 24-hour clocks are supported.
     * @default '12h'
     */
    mode?: '12h' | '24h'

    /**
     * Override the label of the ok button.
     * @default 'Ok'
     */
    okLabel?: string

    /**
     * Callback that is called with the new date (as Date instance) when the value is changed.
     * @param {Date} time
     */
    onChange?: (date: Date) => void

    value?: Date
  }

  export default class TimePicker extends Component<MaterialUiTimePickerProps, any> {

  }
}

