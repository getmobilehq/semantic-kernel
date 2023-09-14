import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  list: [],
  contactSource: null,
  error: "",
  loading: false,
};

// ADD_contact
export const addContactSource = createAsyncThunk(
  "contactSource/addSingleContactSource ",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        url: `contact-source/`,
        data: {
          ...values,
        },
      });
      toast.success("Contact Source Added");
      return {
        data,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in adding Contact Source try again");
      console.log(error.message);
      return {
        message: "error",
      };
    }
  }
);

// DELETE_contact
export const deleteContactSource = createAsyncThunk(
  "contactSource/deleteContactSource ",
  async (id, api) => {
    try {
      const resp = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `contact-source/${id}`,
      });

      api.dispatch(loadAllContactSource());
      toast.success("Contact Source Deleted");
      return {
        data: resp.data.id,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in deleting Contact Source try again");
      console.log(error.message);
    }
  }
);

// contact_DETAILS
export const loadSingleContactSource = createAsyncThunk(
  "contactSource/loadSingleContactSource",
  async (id) => {
    try {
      const data = await axios.get(`contact-source/${id}`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// contactS
export const loadAllContactSource = createAsyncThunk(
  "contactSource/loadAllContactSource",
  async () => {
    try {
      const { data } = await axios.get(`contact-source`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// loadAllContactSource paginated
export const loadAllContactSourcePaginated = createAsyncThunk(
  "contactSource/loadAllContactSourcePaginated",
  async ({ page, count, status }) => {
    try {
      const { data } = await axios.get(
        `contact-source?status=${status}&page=${page}&count=${count}`
      );
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const updateContactSource = createAsyncThunk(
  "contactSource/updateContactSource",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",

        url: `contact-source/${id}`,
        data: {
          ...values,
        },
      });
      toast.success("Contact Source Updated");
      return {
        data,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in updating Contact Source try again");
      console.log(error.message);
      return {
        message: "error",
      };
    }
  }
);

const contactSourceSlice = createSlice({
  name: "contactSource",
  initialState,
  reducers: {
    clearContactSource: (state) => {
      state.contactSource = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllContactSource ======

    builder.addCase(loadAllContactSource.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllContactSource.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });

    builder.addCase(loadAllContactSource.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for loadAllContactSourcePaginated ======

    builder.addCase(loadAllContactSourcePaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      loadAllContactSourcePaginated.fulfilled,
      (state, action) => {
        state.loading = false;
        state.list = action.payload;
      }
    );

    builder.addCase(loadAllContactSourcePaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addSingleContactSource  ======

    builder.addCase(addContactSource.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addContactSource.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addContactSource.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for loadSingleContactSource ======

    builder.addCase(loadSingleContactSource.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleContactSource.fulfilled, (state, action) => {
      state.loading = false;
      state.contactSource = action.payload.data;
    });

    builder.addCase(loadSingleContactSource.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for contactSource ======

    builder.addCase(updateContactSource.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateContactSource.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateContactSource.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for deleteContactSource  ======

    builder.addCase(deleteContactSource.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteContactSource.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteContactSource.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default contactSourceSlice.reducer;
export const { clearContactSource } = contactSourceSlice.actions;
