import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "SET_PATIENT";
    payload: Patient;
  }
  | {
    type: "GET_DIAGNOSES";
    payload: Diagnosis[];
  }
  | {
    type: "NEW_ENTRY";
    payload: Entry;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT": {
      return {
        ...state,
        patient: action.payload
      };
    }
    case "GET_DIAGNOSES": {
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose}),
            {}
          ),
          ...state.diagnoses
        }
          
      };
    }
    case "NEW_ENTRY":
      state.patient?.entries.push(action.payload);
      return {
        ...state
      };
    default:
      return state;
  }
};

export const addEntry = (payload: Entry) => {
  return {
    type: "NEW_ENTRY" as const,
    payload: payload
  };
};

export const setPatientList = (payload: Patient[]) => {
  return {
    type: "SET_PATIENT_LIST" as const,
    payload: payload
  };
};

export const setDiagnoses = (payload: Diagnosis[]) => {
  return {
    type: "GET_DIAGNOSES" as const,
    payload: payload
  };
};

export const addPatient = (payload: Patient) => {
  return {
    type: "ADD_PATIENT" as const,
    payload: payload
  };
};

export const setPatient = (payload: Patient) => {
  return {
    type: "SET_PATIENT" as const,
    payload: payload
  };
};
