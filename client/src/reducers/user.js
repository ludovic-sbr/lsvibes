import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from "../utils/api"
import jwt from 'jsonwebtoken'
import config from '../config.json'

const initialState = null

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (sessionToken) => {
    try {
      if (sessionToken === null || sessionToken === undefined) throw new Error()

      // On vérifie la validité du token et on récupère le payload + uuid
      let payload = await jwt.verify(sessionToken, config.env.tokenKey)

      // On fetch l'user en bdd grâce à l'uuid
      let res = await api.post('/auth/newSession', {uid: payload.userUid})

      if (res.status !== 200) throw new Error()

      localStorage.setItem("sessionToken", sessionToken)

      return res.data
    } catch {
      return initialState
    }
  }
)

const userSlice = createSlice({
  name: "user",
  initialState: {
    value: null,
    status: null
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("sessionToken")
      state.value = initialState
    }
  },
  extraReducers: {
    [fetchUser.pending]: (state, action) => {
      state.status = "loading"
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.status = "success"
      state.value = action.payload
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = "rejected"
    }
  }
})

export const { logout } = userSlice.actions

export default userSlice.reducer
