import React from "react";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';


export default function Orders(props) {
  return (
    <>
        <TableRow key={props.id}>
          <TableCell>{props.date} €</TableCell>
          <TableCell>{props.distance} km</TableCell>
          <TableCell>{props.cost_km}/km</TableCell>
          <TableCell><Button variant="outlined">Feedback</Button></TableCell> 
        </TableRow>
    </>
  );
}
