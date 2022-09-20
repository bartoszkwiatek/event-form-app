import { FieldHookConfig, useField } from 'formik';

export const TextInput = (
    props: FieldHookConfig<string> & { label: string; 'data-testid': string },
) => {
    const [field, meta] = useField(props);
    return (
        <div data-testid={props['data-testid']}>
            <label htmlFor={props.name}>{props.label}</label>
            <input
                className="text-input"
                {...field}
                placeholder={props.placeholder}
                type={props.type}
            />
            {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
        </div>
    );
};
