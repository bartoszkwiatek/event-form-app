import { FieldHookConfig, useField } from 'formik';
import './TextArea.scss';

export const TextArea = (
    props: FieldHookConfig<string> & { label: string; 'data-testid': string },
) => {
    const [field, meta] = useField(props);
    return (
        <div className="text-area" data-testid={props['data-testid']}>
            <label htmlFor={props.name}>{props.label}</label>
            <textarea className="input" {...field} placeholder={props.placeholder} />
            {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
        </div>
    );
};
