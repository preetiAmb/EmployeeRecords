import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Box, Button, Flex, Header } from "../styled";
import { deleteEmployee } from "../../redux/employees/actionCreators";

const View = () => {
  const employees = useSelector(state => state.employees.employees_records);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = employeeId => {
    dispatch(deleteEmployee(employeeId));
  };

  return (
    <>
      <Header data-cy="header">View Employees</Header>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        marginTop="lg"
      >
        <Box>
          <Button data-cy="backButton" onClick={() => history.goBack()}>
            Back
          </Button>
        </Box>
        <Box marginTop="md">
          <table>
            <thead>
              <tr>
                <th>FirstName</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Birth Date</th>
                <th>Status</th>
                <th>Job Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees &&
                employees.map(employee => (
                  <tr key={employee.id}>
                    <td>{employee.firstName}</td>
                    <td>{employee.surname}</td>
                    <td>{employee.email}</td>
                    <td>{employee.birthDate}</td>
                    <td>{employee.status}</td>
                    <td>{employee.jobTitle}</td>
                    <td>{employee.actions}</td>
                    <td>
                      <Button
                        data-cy={`deleteButton-${employee.id}`}
                        onClick={() => handleDelete(employee.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Box>
      </Flex>
    </>
  );
};

export default View;
