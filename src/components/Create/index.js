import React, { useCallback, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Header } from "../styled";
import FormField from "./FormField";
import FormButtons from "./FormButtons";
import formValidationSchema from "./formValidationSchema";
import {
  saveNewEmployee,
  editEmployee,
  resetEmployeeToEdit,
} from "../../redux/employees/actionCreators";

const Create = () => {
  const { employeeId } = useParams();
  const dispatch = useDispatch();
  const employees = useSelector(state => state.employees.employees_records);

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
      } else {
        dispatch(saveNewEmployee(employee));
      }
    },
    [dispatch, employeeToEdit]
  );

  const initialValues = employeeToEdit
    ? { ...employeeToEdit }
    : {
        firstName: "",
        surname: "",
        email: "",
        birthDate: "",
        status: "",
        jobTitle: "",
      };

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
