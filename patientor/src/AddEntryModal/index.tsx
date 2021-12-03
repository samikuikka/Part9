import React from 'react';
import { Modal} from 'semantic-ui-react';
import AddEntryForm, { HospitalEntryValues} from './AddHospitalEntry';

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: HospitalEntryValues) => void;
}

const AddEntryModal = ({modalOpen, onClose, onSubmit}: Props)  => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
        <Modal.Header>Add a new patient</Modal.Header>
        <Modal.Content>
            <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
        </Modal.Content>
    </Modal>
);

export default AddEntryModal;