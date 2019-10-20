import {FormikHandlers, FormikState, FormikActions} from 'formik';

export interface FormikProps<V> extends FormikHandlers, FormikState<V>, FormikActions<V> {
  
}
