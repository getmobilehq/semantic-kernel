import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  list: [],
  contactStage: null,
  error: "",
  loading: false,
};

// ADD_contact
export const addSingleContactStage = createAsyncThunk(
  "contactStage/addSingleContactStage ",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        url: `contact-stage/`,
        data: {
          ...values,
        },
      });
      toast.success("Contact stage Added");
      return {
        data,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in adding Contact stage try again");
      console.log(error.message);
      return {
        message: "error",
      };
    }
  }
);

// DELETE_contact
export const deleteContactStage = createAsyncThunk(
  "contactStage/deleteContactStage ",
  async (id, api) => {
    try {
      const resp = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `contact-stage/${id}`,
      });
      api.dispatch(loadAllContactStage());
      toast.success("Contact stage Deleted");
      return {
        data: resp.data.id,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in deleting Contact stage try again");
      console.log(error.message);
    }
  }
);

// contact_DETAILS
export const loadSingleContactStage = createAsyncThunk(
  "contactStage/loadSingleContactStage",
  async (id) => {
    try {
      const data = await axios.get(`contact-stage/${id}`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// contactS
export const loadAllContactStage = createAsyncThunk(
  "contactStage/loadAllContactStage",
  async () => {
    try {
      const { data } = await axios.get(`contact-stage/`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// loadAllContactStage paginated
export const loadAllContactStagePaginated = createAsyncThunk(
  "contactStage/loadAllContactStagePaginated",
  async ({ page, count, status }) => {
    try {
      const { data } = await axios.get(
        `contact-stage?status=${status}&page=${page}&count=${count}`
      );
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const updateContactStage = createAsyncThunk(
  "contactStage/updateContactStage",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",

        url: `contact-stage/${id}`,
        data: {
          ...values,
        },
      });
      toast.success("Contact stage Updated");
      return {
        data,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in updating Contact stage try again");
      console.log(error.message);
      return {
        message: "error",
      };
    }
  }
);

const contactStageSlice = createSlice({
  name: "contactStage",
  initialState,
  reducers: {
    clearContactStage: (state) => {
      state.contactStage = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllContactStage ======

    builder.addCase(loadAllContactStage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllContactStage.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });

    builder.addCase(loadAllContactStage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for loadAllContactStagePaginated ======

    builder.addCase(loadAllContactStagePaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllContactStagePaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });

    builder.addCase(loadAllContactStagePaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addSingleContactStage  ======

    builder.addCase(addSingleContactStage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addSingleContactStage.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addSingleContactStage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for loadSinglContactStage ======

    builder.addCase(loadSingleContactStage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleContactStage.fulfilled, (state, action) => {
      state.loading = false;
      state.contactStage = action.payload.data;
    });

    builder.addCase(loadSingleContactStage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for ContactStage ======

    builder.addCase(updateContactStage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateContactStage.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateContactStage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for deleteContactStage  ======

    builder.addCase(deleteContactStage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteContactStage.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteContactStage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default contactStageSlice.reducer;
export const { clearContactStage } = contactStageSlice.actions;
