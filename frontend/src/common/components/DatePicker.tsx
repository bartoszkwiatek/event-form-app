/* eslint-disable */
// @ts-nocheck
import { useField, useFormikContext } from 'formik';

export const DatePicker = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props);
    return (
        <>
            <input
                type="date"
                {...field}
                {...props}
                onChange={event => {
                    setFieldValue(field.name, event.target.value);
                }}
            />
            {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
        </>
    );
};
