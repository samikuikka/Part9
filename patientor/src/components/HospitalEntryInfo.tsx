import React from 'react';
import { Diagnosis, HospitalEntry} from '../types';
import { Segment, Icon } from 'semantic-ui-react';

const HospitalEntryInfo: React.FC<{entry: HospitalEntry, diagnoses: {
    [id: string]: Diagnosis;
}}> = ({ entry, diagnoses }) => {

    return (      
            <Segment>
                <h3>{entry.date} <Icon name="hospital" /></h3>
                 {entry.description}
                <ul>
                    {entry.diagnosisCodes
                        ? entry.diagnosisCodes.map( code => <li key={code}>{code} {diagnoses[code].name}</li>)
                        : null }
                </ul>
                <b>discharge date:</b> {entry.discharge.date} <br/>
                <b>discharge criteria:</b> {entry.discharge.criteria}
            </Segment>
    );
};

export default HospitalEntryInfo;