import { createSlice } from "@reduxjs/toolkit";

const defaultEmployee = {
  id: new Date().getTime(),
  firstName: "Abe",
  surname: "Simpson",
  email: "abe.simpson@springfield.com",
  birthDate: "1907-05-25",
  jobTitle: "Work grouch",
  status: "ACTIVE",
};

const initialState = {
  employees_records: [defaultEmployee],
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    saveNewEmployee: {
      prepare: employee => ({
        payload: {
          ...employee,
          id: new Date().getTime(),
        },
      }),
      reducer(draftState, action) {
        draftState.employees_records = [
          ...draftState.employees_records,
          action.payload,
        ];
      },
    },
    deleteEmployee: (draftState, action) => {
      const employeeIdToDelete = action.payload;
      const indexToDelete = draftState.employees_records.findIndex(
        employee => employee.id === employeeIdToDelete
      );
      if (indexToDelete !== -1) {
        draftState.employees_records.splice(indexToDelete, 1);
      }
      return draftState;
    },
  },
});

export const { saveNewEmployee, deleteEmployee, editEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
