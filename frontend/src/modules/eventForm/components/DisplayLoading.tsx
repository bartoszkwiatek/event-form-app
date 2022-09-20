import { ReactElement } from 'react';
import { bool } from 'prop-types';

export const DisplayLoading = ({ loading }: { loading: boolean }): ReactElement => {
    if (loading) return <p data-testid="display-loading-message">Submitting...</p>;
    return <></>;
};

DisplayLoading.propTypes = {
    loading: bool,
};
