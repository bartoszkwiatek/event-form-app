import { ReactElement } from 'react';
import { bool } from 'prop-types';

export const DisplaySuccess = ({ success }: { success: boolean }): ReactElement => {
    if (success) return <p>Event succesfully saved!</p>;
    return <></>;
};

DisplaySuccess.propTypes = {
    success: bool,
};
