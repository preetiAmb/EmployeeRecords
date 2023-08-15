import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  Box,
  Button,
  Flex,
  Header,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableBody,
} from "../styled";
import {
  deleteEmployee,
  editEmployee,
  updateCurrentPage,
} from "../../redux/employees/actionCreators";

const View = () => {
  const currentPage = useSelector(state => state.employees.currentPage);
  const employees = useSelector(state => state.employees.employees_records);
  const dispatch = useDispatch();
  const history = useHistory();
  const sentinelRef = useRef(null);

  const handleEdit = employeeId => {
    const employeeToEdit = employees.find(
      employee => employee.id === employeeId
    );
    dispatch(editEmployee(employeeToEdit));
    history.push(`/edit/${employeeId}`);
  };

  const handleDelete = employeeId => {
    dispatch(deleteEmployee(employeeId));
  };

  useEffect(() => {
    const handleIntersect = entries => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        const nextPage = currentPage + 1;
        dispatch(updateCurrentPage(nextPage));
      }
    };

    const observer = new IntersectionObserver(handleIntersect);
    const currentSentinelRef = sentinelRef.current;
    if (currentSentinelRef) {
      observer.observe(currentSentinelRef);
    }
    return () => {
      if (currentSentinelRef) {
        observer.unobserve(currentSentinelRef);
      }
    };
  }, [currentPage, dispatch]);

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
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>FirstName</TableCell>
                <TableCell>Surname</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Birth Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees &&
                employees.map(employee => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.firstName}</TableCell>
                    <TableCell>{employee.surname}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.birthDate}</TableCell>
                    <TableCell>{employee.status}</TableCell>
                    <TableCell>{employee.jobTitle}</TableCell>
                    <TableCell>
                      <Button
                        data-cy={`editButton-${employee.id}`}
                        onClick={() => handleEdit(employee.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        data-cy={`deleteButton-${employee.id}`}
                        onClick={() => handleDelete(employee.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
        <div ref={sentinelRef} style={{ height: "8px" }} />
      </Flex>
    </>
  );
};

export default View;
