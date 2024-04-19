/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPublic } from "../hooks/axiosPublic";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";

export interface Contact {
  name: string;
  email?: string;
  slug?: string;
  address: string;
  phone: string;
  photo: string;
}

interface ContactsState {
  updateState: boolean;
  loading: boolean;
  contacts: Contact[];
  error: string | AxiosError;
  response: string;
  fetchedContacts: Contact[];
  singleContact: Contact | null;
  updatedContact: Contact | null;
}

const initialState: ContactsState = {
  updateState: false,
  loading: false,
  contacts: [],
  error: "",
  response: "",
  fetchedContacts: [],
  singleContact: null,
  updatedContact: null,
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

// getting all contacts from db
export const fetchAllContacts = createAsyncThunk(
  "contacts/fetchAllContacts",
  async () => {
    try {
      const response = await axiosPublic.get("/api/v1/contact-information");
      return response.data as Contact[];
    } catch (error) {
      throw new Error("Failed to fetch contacts");
    }
  }
);

// getting single contact from db with unique slug
export const fetchContactBySlug = createAsyncThunk(
  "contacts/fetchContactBySlug",
  async (slug: string) => {
    try {
      const response = await axiosPublic.get(
        `/api/v1/contact-information/${slug}`
      );
      return response.data as Contact;
    } catch (error) {
      throw new Error("Failed to fetch contacts");
    }
  }
);

// patch single contact in db
export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ slug, contactData }: { slug: string; contactData: Contact }) => {
    const response = await axiosPublic.patch(
      `api/v1/contact-information/${slug}`,
      contactData
    );
    return response.data;
  }
);

// delete single contact in db
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await axiosPublic.delete(
        `/api/v1/contact-information/${slug}`,
        {
          withCredentials: true,
        }
      );
      toast.success("Contact deleted successfully.");
      return response;
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

export const contactsSlice = createSlice({
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
      })

      // all contacts status
      .addCase(fetchAllContacts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchAllContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.fetchedContacts = action.payload;
      })
      .addCase(fetchAllContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An error occurred";
      })

      // single contact status
      .addCase(fetchContactBySlug.pending, state => {
        state.loading = true;
      })
      .addCase(fetchContactBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.singleContact = action.payload;
      })
      .addCase(fetchContactBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An error occurred";
      })

      // single contact update status
      .addCase(updateContact.pending, state => {
        state.loading = true;
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.loading = false;
        const updatedContact = action.payload;
        if (
          state.singleContact &&
          state.singleContact.slug === updatedContact.slug
        ) {
          state.singleContact = updatedContact;
        }
        const contactIndex = state.fetchedContacts.findIndex(
          contact => contact.slug === updatedContact.slug
        );
        if (contactIndex !== -1) {
          state.fetchedContacts[contactIndex] = updatedContact;
        }
        const allContactsIndex = state.contacts.findIndex(
          contact => contact.slug === updatedContact.slug
        );
        if (allContactsIndex !== -1) {
          state.contacts[allContactsIndex] = updatedContact;
        }
      });
  },
});

export default contactsSlice.reducer;
