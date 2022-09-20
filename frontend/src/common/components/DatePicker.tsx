import { FieldHookConfig, useField, useFormikContext } from 'formik';
import './DatePicker.scss';

export const DatePicker = (
    props: FieldHookConfig<string> & { label: string; 'data-testid': string },
) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props);
    return (
        <div className="date-picker" data-testid={props['data-testid']}>
            <label htmlFor={props.name}>{props.label}</label>
            <input
                className="input"
                type="date"
                {...field}
                placeholder={props.placeholder}
                onChange={event => {
                    setFieldValue(field.name, event.target.value);
                }}
            />
            {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
        </div>
    );
};
