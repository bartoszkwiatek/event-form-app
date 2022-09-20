import { ReactElement } from 'react';
import { bool } from 'prop-types';

export const DisplaySuccess = ({ success }: { success: boolean }): ReactElement => {
    if (success) return <p data-testid="display-success-message">Event succesfully saved!</p>;
    return <></>;
};

DisplaySuccess.propTypes = {
    success: bool,
};
