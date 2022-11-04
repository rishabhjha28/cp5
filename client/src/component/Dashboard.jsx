import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {fetchStudents,updateStudent} from '../redux/studentReducer'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Pagination} from '@mui/material';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { Link } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#00008B', //theme.palette.common.black,
      color: theme.palette.common.white,
      textAlign: 'left'
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      textAlign: 'left'
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
      textAlign: 'left'
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
      textAlign: 'left'
    },
  }));

export const Dashboard = () => {
    const dispatch = useDispatch()
    const studentData = useSelector(state=>state.studentReducer.fetchResults)
    const count = studentData.data.length ? studentData.data[0].totalElement:5
    const [page,setPage] = useState(1)
    const [limit,setLimit] = useState(10)
    const [filter,setFilter] = useState('none')
    const [search,setSearch] = useState('')
    const [tableData,setTableData] = useState([])
    
    const fetchData =()=>{
        dispatch(
            fetchStudents({
                page:page,
                limit:limit
            })
        )
    }
    useEffect(()=>{fetchData()},[page,limit])
    useEffect(()=>{
        let rows = []
        for(let i  = 0;i < studentData.data.length;i++){
            if(i === 0){
                continue;
            }
            else if((filter === "none" || filter === studentData.data[i].is_paid) &&((studentData.data[i].first_name+ " " +studentData.data[i].last_name).includes(search) || studentData.data[i].email_id.includes(search))){
                rows.push({
                    name:studentData.data[i].first_name+ " " +studentData.data[i].last_name,
                    email_id:studentData.data[i].email_id,
                    is_paid:studentData.data[i].is_paid,
                    id:studentData.data[i]._id
                })
            }
        }
        setTableData(rows)
    },[studentData.data,filter,search])
    const handlePageChange =(event,value)=>{
        setPage(value)
    }
    const handleLimitChange=(event)=>{
        setLimit(event.target.value)
        setPage(1)
    }
    const handleCheck = (id)=>{
        dispatch(updateStudent({id:id}))
        dispatch(fetchStudents({page:page,limit:limit}))
    }
    const handleFilter =(e)=>{
        const {value} = e.target
        setFilter(value)
    }

  return (
    <div className='dashboard'>
        <div className='filter'>
            <div>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">Filter</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={filter}
                        label="filter"
                        onChange={handleFilter}
                    >
                        <MenuItem value="none">
                        <em>None</em>
                        </MenuItem>
                        <MenuItem value={true}>Paid</MenuItem>
                        <MenuItem value={false}>Not Paid</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className='input'>
                <input type="search" name="search" value={search} placeholder = 'Search' onChange = {(e)=>{setSearch(e.target.value)}}/>
            </div>
        </div>    
        <TableContainer component={Paper} style={{ borderRadius: '15px', width:'70vw'}}>
        <Table aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell align="right" >Name</StyledTableCell>
                <StyledTableCell align="right"  >Email Id</StyledTableCell>
                <StyledTableCell >Amount Paid</StyledTableCell>
                <StyledTableCell align="right">Mark As Paid</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody style={{ overflowX: 'auto' }}>
            {tableData.map((row, index) => (
                <StyledTableRow key={row.id}>
                <StyledTableCell align="right" >{row.name}</StyledTableCell>
                <StyledTableCell align="right" >{row.email_id}</StyledTableCell>
                <StyledTableCell> {row.is_paid?'Yes':'No'}</StyledTableCell>
                <StyledTableCell align="right">{row.is_paid?'':<input type='checkbox' onChange={()=>handleCheck(row.id)}></input>}</StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        <div style={{display:'flex',justifyContent:'end', alignItems:'center',margin:'20px'}}>
        <Pagination  count = {Math.ceil(count/limit)} variant="outlined" page = {page} onChange = {handlePageChange} renderItem={(item)=>(<PaginationItem  components={{previous: ArrowBackIcon, next: ArrowForwardIcon }}{...item}/>)}/>
        <FormControl width= {"30px"} >
            <InputLabel id="demo-simple-select-label">Limit</InputLabel>
            <Select
            value={limit}
            label="Limit"
            onChange={handleLimitChange}
            IconComponent={(props) => (<ExpandMoreOutlinedIcon{...props}/>)}
            >
            <MenuItem value={5}>5 Per Page</MenuItem>
            <MenuItem value={10}>10 Per Page</MenuItem>
            <MenuItem value={15}>15 Per Page</MenuItem>
            </Select>
        </FormControl>
        </div>
        <Link to = '/'>Add More Students</Link>
    </div>
  )
}
