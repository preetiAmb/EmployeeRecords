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
  employeeToEdit: null,
  currentPage: 1,
  itemsPerPage: 2,
  SuccessMessage: null,
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
    },
    editEmployee: (draftState, action) => {
      const updateEmployee = action.payload;
      const indexToUpdate = draftState.employees_records.findIndex(
        employee => employee.id === updateEmployee.id
      );
      if (indexToUpdate !== -1) {
        draftState.employees_records[indexToUpdate] = updateEmployee;
      }
    },
    resetEmployeeToEdit: draftState => {
      draftState.employeeToEdit = null;
    },
    updateCurrentPage: (draftState, action) => {
      draftState.currentPage = action.payload;
    },
    setSuccessMessage: (draftState, action) => {
      draftState.successMessage = action.payload;
    },
    clearSuccessMessage: draftState => {
      draftState.successMessage = null;
    },
  },
});

export const {
  saveNewEmployee,
  deleteEmployee,
  editEmployee,
  resetEmployeeToEdit,
  updateCurrentPage,
  setSuccessMessage,
  clearSuccessMessage,
} = employeeSlice.actions;

export default employeeSlice.reducer;
