import { Box, TextField } from '@mui/material';
import { FieldHookConfig, useField } from 'formik';

export const TextArea = (
    props: FieldHookConfig<string> & { label: string; 'data-testid': string },
) => {
    const [field, meta] = useField(props);

    return (
        <Box data-testid={props['data-testid']}>
            <TextField
                {...field}
                multiline
                rows={4}
                label={props.label}
                placeholder={props.placeholder}
                type={props.type}
                error={meta.touched && !!meta.error}
                helperText={(meta.touched && meta.error) || ' '}
            />
        </Box>
    );
};
