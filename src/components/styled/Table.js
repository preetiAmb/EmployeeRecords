import styled from "styled-components";

export const Table = styled.table`
  border-collapse: collapse;
  margin-top: 20px;
  margin: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const TableHeader = styled.thead`
  font-weight: bold;
  background-color: lightgray;
  font-weight: bold;
  padding: 12px;
  width: 100%;
  border-bottom: 1px solid #ddd;
`;

export const TableBody = styled.tbody`
  background-color: #ffffff;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const TableCell = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;
