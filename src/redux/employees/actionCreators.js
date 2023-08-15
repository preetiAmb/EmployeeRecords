import * as actions from ".";

/* eslint-disable import/prefer-default-export */
export const saveNewEmployee = employee => dispatch => {
  dispatch(actions.saveNewEmployee(employee));
};

export const deleteEmployee = employeeId => dispatch => {
  dispatch(actions.deleteEmployee(employeeId));
};

export const editEmployee = employee => dispatch => {
  dispatch(actions.editEmployee(employee));
};

export const resetEmployeeToEdit = () => dispatch => {
  dispatch(actions.resetEmployeeToEdit());
};

export const updateCurrentPage = page => dispatch => {
  dispatch(actions.updateCurrentPage(page));
};

export const setSuccessMessage = message => ({
  type: actions.setSuccessMessage.type,
  payload: message,
});

export const clearSuccessMessage = () => ({
  type: actions.clearSuccessMessage.type,
});
