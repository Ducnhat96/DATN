import {ReactElement} from 'react';
import {State} from 'react-select/lib/Select';
import {OptionProps} from 'react-select/lib/components/Option';

export interface SelectStylesAction<T = any> extends OptionProps<T>{
  classes: any
  data: T
  value: string
}
