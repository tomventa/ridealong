import React, {useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Header from '../components/header';

import axios from 'axios';
// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

function Orders() {
  return (
    <>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default function Dashboard(){
    let auth = React.useRef(null);
    let user = React.useRef(null);
    useEffect(() => {
        if(localStorage.getItem('token') != null){
            auth.current = 'Bearer ' + localStorage.getItem('token').replace(/["]+/g, '');
        }
        axios({
            method: 'get',
            url: 'http://localhost:8080/api/account/',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth.current
                }
            })
            .then((response) => {
                user.current = response.data;
            })
            .catch((e) => {
                console.log(e);
            });
        if(user.current == null) return;
        axios({
            method: 'get',
            url: 'http://localhost:8080/api/fare/get/by-user/<id>', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth.current
                },
            params:{
                id: user.current.id
            }
        })
            .then((response) => {
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    });
    return(
        <Paper>
        <Grid item maxWidth={true} marginTop={10} maxHeight={true} style={{backgroundColor: "red"}}> 
                <Header />            
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid>
        </Paper>
    )
}
