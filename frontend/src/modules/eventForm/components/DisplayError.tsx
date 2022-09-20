import { object } from 'prop-types';
import { ReactElement } from 'react';

import { ValidationOutputError } from '../models/types';

export const DisplayError = ({
    error,
}: {
    error: ValidationOutputError | Error | null;
}): ReactElement => {
    function isError(error: ValidationOutputError | Error): error is Error {
        return (error as Error).message !== undefined;
    }

    if (error === null) return <></>;
    if (isError(error))
        return (
            <div>
                <p>error.message</p>
            </div>
        );
    return (
        <div>
            {Object.entries(error).map(([key, value]) => (
                <p key={key}>
                    {key}: {value}
                </p>
            ))}
        </div>
    );
};
DisplayError.propTypes = {
    error: object,
};
