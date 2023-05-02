import React, {useEffect,useRef,useState} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Header from '../components/header';
import Orders from '../components/row';

import axios from 'axios';



export default function Dashboard(){
    let auth = useRef(null);
    let user = useRef(null);
    let fares = useRef(null);
    const [faresState, setFaresState] = useState(null);
    const [userState, setUserState] = useState(null);
    useEffect(() => {
        if(localStorage.getItem('token') != null){
            auth.current = 'Bearer ' + localStorage.getItem('token').replace(/["]+/g, '');
        }
        axios({
            method: 'get',
            url: '../api/account/',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth.current
                }
            })
            .then((response) => {
                user.current = response.data;
                setUserState(user.current);
            })
            .catch((e) => {
                console.log(e);
                });
           },[]);
    useEffect(() => {
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
                fares.current = response.data;
                setFaresState(fares.current);
            })
            .catch((e) => {
                console.log(e);
            });
    },[userState]);   
    let listItems = useRef(null);
    const [reRender, setReRender] = useState(false);
    useEffect(() => {
        if(fares.current == null) return;
        listItems.current = fares.current.map((fare) => <Orders date={fare.massimo_tariffa} distance={fare.massimo_km} cost_km={fare.tariffa_per_km}/>);
        setReRender(true);
    },[faresState]);
    return(
        <Paper>
        <Grid item maxWidth={true} marginTop={10} maxHeight={true} style={{backgroundColor: "red"}}> 
                <Header />            
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Tariffa</TableCell>
                        <TableCell>Distanza</TableCell>
                        <TableCell>Costo al chilometro</TableCell>
                        <TableCell>Feedback</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                        {reRender && listItems.current}
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
        </Paper>
    )
}
