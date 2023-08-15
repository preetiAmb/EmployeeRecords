import React, { useCallback, useMemo, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Header, SuccessMessage } from "../styled";
import FormField from "./FormField";
import FormButtons from "./FormButtons";
import formValidationSchema from "./formValidationSchema";
import {
  saveNewEmployee,
  editEmployee,
  resetEmployeeToEdit,
  setSuccessMessage,
  clearSuccessMessage,
} from "../../redux/employees/actionCreators";

const Create = () => {
  const { employeeId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const employees = useSelector(state => state.employees.employees_records);
  const successMessage = useSelector(state => state.employees.successMessage);

  const employeeToEdit = useMemo(
    () =>
      employees.find(employee => employee.id === parseInt(employeeId, 10)) ||
      {},
    [employees, employeeId]
  );

  const validationSchema = useMemo(
    () => formValidationSchema(employees, employeeToEdit.id),
    [employees, employeeToEdit.id]
  );

  const submitForm = useCallback(
    employee => {
      if (employeeToEdit.id) {
        dispatch(editEmployee({ ...employee, id: employeeToEdit.id }));
        dispatch(resetEmployeeToEdit());
        dispatch(setSuccessMessage("Employee details updated successfully"));
      } else {
        dispatch(saveNewEmployee(employee));
        dispatch(setSuccessMessage("Employee details created successfully"));
      }
      setTimeout(() => {
        dispatch(clearSuccessMessage());
        history.push("/");
      }, 3000);
    },
    [dispatch, employeeToEdit, history]
  );

  const initialValues = useMemo(() => {
    if (employeeToEdit && Object.keys(employeeToEdit).length > 0) {
      return { ...employeeToEdit };
    }
    return {
      firstName: "",
      surname: "",
      email: "",
      birthDate: "",
      status: "",
      jobTitle: "",
    };
  }, [employeeToEdit]);

  useEffect(() => {
    return () => {
      if (employeeToEdit.id) {
        dispatch(resetEmployeeToEdit());
      }
    };
  }, [dispatch, employeeToEdit]);

  return (
    <>
      <Header>
        {employeeToEdit.id !== undefined
          ? "Edit employee"
          : "Create new employee"}
      </Header>
      {successMessage && (
        <SuccessMessage data-cy="successMessage">
          {successMessage}
        </SuccessMessage>
      )}
      <Formik
        validationSchema={validationSchema}
        onSubmit={submitForm}
        initialValues={initialValues}
      >
        <Flex alignItems="center" justifyContent="center" height="100%">
          <Flex alignItems="left" direction="column" width="300px">
            <FormField name="firstName" placeholder="First name" />
            <FormField name="surname" placeholder="Surname" />
            <FormField name="email" placeholder="Email" />
            <FormField name="birthDate" placeholder="Birth Date (YYYY-MM-DD)" />
            <FormField name="status" placeholder="status" />
            <FormField name="jobTitle" placeholder="Job Title" />
            <FormButtons />
          </Flex>
        </Flex>
      </Formik>
    </>
  );
};

export default Create;
