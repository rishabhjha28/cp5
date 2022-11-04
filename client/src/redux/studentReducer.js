import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


const link = 'http://localhost:30001/'

const fetchStudents = createAsyncThunk(
    'students/fetchStudents',
    async (payload) =>
      await axios
        .get(
          `/students?page=${payload.page}&limit=${payload.limit}`
        )
        .then((response) => {
            // console.log(response.data)
            return response.data
        })
        .catch((error) => {
          console.log(payload)
          console.log(error)
        })
  )

const updateStudent = createAsyncThunk(
    'students/updateStudents',
    async(payload)=>{
        await axios
        .put('/students',payload)
    }
)

const addStudent = createAsyncThunk(
    'students/addStudent',
    async(payload)=>{
        await axios
        .post('/students',payload)
    }
)

const dataInitialState = {
    fetchResults: {status: '', data: [], isLoading: false}
  }
  const studentsReducer = createSlice({
    name: 'students',
    initialState: dataInitialState,
    reducers: {
        setFieldList: (state, action) => {
            state.fetchResults.fieldList = action.payload
          },
    },
    extraReducers: {
      [fetchStudents.pending.type]: (state, action) => {
        state.fetchResults = {
          status: 'loading',
          data: [],
          // totalElements: 0,
          // totalPages: 0,
          isLoading: true,
        }
      },
      [fetchStudents.fulfilled.type]: (state, action) => {
        state.fetchResults = {
          status: 'idle',
          data: action.payload,
          // totalPages: action.payload.totalPages,
          // totalElements: action.payload.totalElements,
          isLoading: false,
        }
      },
      [fetchStudents.rejected.type]: (state, action) => {
        state.fetchResults = {
          status: 'failed',
          data: [],
          // totalElements: 0,
          // totalPages: 0,
          isLoading: false,
        }
      },
    },
  })
  export {fetchStudents,updateStudent,addStudent}
  export default studentsReducer.reducer
  