import React from 'react';
import { HealthCheckRating } from '../types';
import { Icon } from 'semantic-ui-react';

const HealthRatingIcon: React.FC<{rating: HealthCheckRating}> = ({rating}) => {

    switch(rating) {
        case 0:
            return <Icon name='heart' color='green' />;
        case 1:
            return <Icon name='heart' color='yellow' />;
        case 2:
            return <Icon name='heart' color='orange' />;
        case 3:
            return <Icon name='heart' color='red' />;
        default: return null;
    }
};

export default HealthRatingIcon;