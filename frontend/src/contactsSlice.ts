/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPublic } from "./hooks/axiosPublic";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";

interface Contact {
  name: string;
  email?: string;
  address: string;
  phone: string;
  photo: string;
}

interface ContactsState {
  updateState: boolean;
  loading: boolean;
  contacts: Contact[];
  error: string;
  response: string;
}

const initialState: ContactsState = {
  updateState: false,
  loading: false,
  contacts: [],
  error: "",
  response: "",
};

export const addContact = createAsyncThunk(
  "contacts/addContacts",
  async (data: Contact, { rejectWithValue }) => {
    try {
      const res = await axiosPublic.post("/api/v1/contact-information", data, {
        withCredentials: true,
      });
      toast.success("Contact updates successful.");
      return res.data.response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;
        if (axiosError.response && axiosError?.response?.data?.error) {
          console.log(axiosError?.response?.data?.error);
          toast.error(axiosError?.response?.data?.error);
          return rejectWithValue(axiosError?.response?.data?.error);
        }
      }
      return rejectWithValue("An error occurred");
    }
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addContact.pending, state => {
        state.loading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default contactsSlice.reducer;
