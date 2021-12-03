import React from 'react';
import { HospitalEntry } from '../types';
import { useStateValue } from '../state';
import { Field, Formik, Form } from 'formik';
import { Button, Grid } from 'semantic-ui-react';
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import * as Yup from 'yup';


export type HospitalEntryValues = Omit<HospitalEntry, 'id'>;

interface Props {
    onSubmit: (values: HospitalEntryValues) => void;
    onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();
  
    return (
      <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: "Hospital",
        discharge: {
            date: "",
            criteria: ""
        }
      }}
      onSubmit={onSubmit}
      validationSchema={Yup.object().shape({
        description: Yup.string().required('Required'),
        date: Yup.date().required('Required'),
        specialist: Yup.string().required('Required'),
        type: Yup.string().oneOf(['Hospital']).required('Required'),
        discharge: Yup.object().shape({
            date: Yup.date().required('Required'),
            criteria: Yup.string().required('Required')
        })
      })}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
            />
            <Field
                label="Date"
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
            />
            <Field
                label="Specialist"
                placeholder="Specialist name"
                name="specialist"
                component={TextField}
            />
            <Field
                label="Type"
                placeholder="Hospital"
                name="type"
                component={TextField}
            />
            <Field
                label="Discharge date"
                placeholder="YYYY-MM-DD"
                name="discharge.date"
                component={TextField}
            />
            <Field
                label="Discharge criteria"
                placeholder="criteria"
                name="discharge.criteria"
                component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
    );
};

export default AddEntryForm;