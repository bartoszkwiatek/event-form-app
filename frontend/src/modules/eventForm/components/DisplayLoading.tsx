import { ReactElement } from 'react';
import { bool } from 'prop-types';

export const DisplayLoading = ({ loading }: { loading: boolean }): ReactElement => {
    if (loading) return <p>Submitting...</p>;
    return <></>;
};

DisplayLoading.propTypes = {
    loading: bool,
};
