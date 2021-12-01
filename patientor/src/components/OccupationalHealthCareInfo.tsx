import React from 'react';
import { Diagnosis, OccupationalHealthcareEntry } from '../types';
import { Segment, Icon } from 'semantic-ui-react';

const OccupationalHealthcareInfo: React.FC<{entry: OccupationalHealthcareEntry, diagnoses: {
    [id: string]: Diagnosis;
}}> = ({ entry, diagnoses }) => {

    return(
        <Segment>
            <h3>{entry.date} <Icon name="stethoscope"/></h3>
            {entry.description}
            <ul>
                    {entry.diagnosisCodes
                        ? entry.diagnosisCodes.map( code => <li key={code}>{code} {diagnoses[code].name}</li>)
                        : null }
            </ul>
            <b>employer:</b> {entry.employerName} <br/>
            { entry.sickLeave
                ? <p><b>sick leave:</b> from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p>
                : null}

        </Segment>
    );
};

export default OccupationalHealthcareInfo;