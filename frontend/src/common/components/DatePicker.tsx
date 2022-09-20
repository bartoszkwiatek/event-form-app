import { FieldHookConfig, useField, useFormikContext } from 'formik';

export const DatePicker = (props: FieldHookConfig<string> & { label: string }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.name}>{props.label}</label>
            <input
                type="date"
                {...field}
                placeholder={props.placeholder}
                onChange={event => {
                    setFieldValue(field.name, event.target.value);
                }}
            />
            {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
        </>
    );
};
