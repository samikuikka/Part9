import React from 'react';
import { HealthCheckEntry, Diagnosis } from '../types';
import { Segment, Icon } from 'semantic-ui-react';
import HealthRatingIcon from './HealthRatingIcon';

const HealthCheckInfo: React.FC<{entry: HealthCheckEntry, diagnoses: {
    [id: string]: Diagnosis;
}}> = ({ entry, diagnoses }) => {
    return(
        <Segment>
            <h3>{entry.date} <Icon name="user md" /></h3>
            {entry.description}
            <ul>
                    {entry.diagnosisCodes
                        ? entry.diagnosisCodes.map( code => <li key={code}>{code} {diagnoses[code].name}</li>)
                        : null }
            </ul>
            <HealthRatingIcon rating={entry.healthCheckRating} />

        </Segment>
    );
};

export default HealthCheckInfo;