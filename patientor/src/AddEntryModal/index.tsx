import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddEntryForm, { HospitalEntryValues} from './AddHospitalEntry';

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: HospitalEntryValues) => void;
    error?: string;
}

const AddEntryModal = ({modalOpen, onClose, onSubmit, error}: Props)  => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
        <Modal.Header>Add a new patient</Modal.Header>
        <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
        </Modal.Content>
    </Modal>
);

export default AddEntryModal;