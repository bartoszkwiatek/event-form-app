import { TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { FieldHookConfig, useField, useFormikContext } from 'formik';

export const DatePicker = (
    props: FieldHookConfig<string> & { label: string; 'data-testid': string },
) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta, helper] = useField(props);

    return (
        <div className="date-picker" data-testid={props['data-testid']}>
            <DateTimePicker
                {...field}
                label={props.label}
                inputFormat="dd.MM.yyyy HH:mm"
                renderInput={params => (
                    <TextField
                        {...params}
                        error={meta.touched && !!meta.error}
                        helperText={(meta.touched && meta.error) || ' '}
                        onBlur={() => helper.setTouched(true)}
                    />
                )}
                onChange={value => {
                    setFieldValue(field.name, value);
                }}
                ampm={false}
            />
        </div>
    );
};
