import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  list: [],
  emailConfig: null,
  error: "",
  loading: false,
};

// ADD_emailConfig
export const addSingleEmailConfig = createAsyncThunk(
  "emailConfig/addSingleEmailConfig ",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        url: `email-config/`,
        data: {
          ...values,
        },
      });
      toast.success("Email-config Added");
      return {
        data,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in adding Email-config try again");
      console.log(error.message);
      return {
        message: "error",
      };
    }
  }
);

// DELETE_emailConfig
export const deleteEmailConfig = createAsyncThunk(
  "emailConfig/deleteEmailConfig ",
  async (id, api) => {
    try {
      const resp = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `email-config/${id}`,
      });
      api.dispatch(loadAllEmailConfig());
      toast.success("Email-config Deleted");
      return {
        data: resp.data.id,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in deleting Email-config try again");
      console.log(error.message);
    }
  }
);

// DELETE Many_emailConfig
export const deleteManyEmailConfig = createAsyncThunk(
  "emailConfig/deleteManyEmailConfig ",
  async (data) => {
    try {
      const resp = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `email-config?query=deletemany`,
        data: data,
      });

      toast.success("Email Configs Deleted");
      return {
        data: resp.data.id,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in deleting email configs, try again");
      console.log(error.message);
    }
  }
);

// emailConfig_DETAILS
export const loadSingleEmailConfig = createAsyncThunk(
  "emailConfig/loadSingleEmailConfig",
  async (id) => {
    try {
      const data = await axios.get(`email-config/${id}`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// emailConfigS
export const loadAllEmailConfig = createAsyncThunk(
  "emailConfig/loadAllEmailConfig",
  async () => {
    try {
      const { data } = await axios.get(`email-config/`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// loadAllEmailConfig paginated
export const loadAllEmailConfigPaginated = createAsyncThunk(
  "emailConfig/loadAllEmailConfigPaginated",
  async ({ page, count, status }) => {
    try {
      const { data } = await axios.get(
        `email-config?status=${status}&page=${page}&count=${count}`
      );
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const updateEmailConfig = createAsyncThunk(
  "emailConfig/updateEmailConfig",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",

        url: `email-config/${id}`,
        data: {
          ...values,
        },
      });
      toast.success("Email-config Updated");
      return {
        data,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in updating Email-config try again");
      console.log(error.message);
      return {
        message: "error",
      };
    }
  }
);

const emailConfigSlice = createSlice({
  name: "emailConfig",
  initialState,
  reducers: {
    clearEmailConfig: (state) => {
      state.emailConfig = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllEmailConfig ======

    builder.addCase(loadAllEmailConfig.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllEmailConfig.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });

    builder.addCase(loadAllEmailConfig.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for loadAllEmailConfigPaginated ======

    builder.addCase(loadAllEmailConfigPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllEmailConfigPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });

    builder.addCase(loadAllEmailConfigPaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addSingleEmailConfig  ======

    builder.addCase(addSingleEmailConfig.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addSingleEmailConfig.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addSingleEmailConfig.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for loadSinglEmailConfig ======

    builder.addCase(loadSingleEmailConfig.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleEmailConfig.fulfilled, (state, action) => {
      state.loading = false;
      state.emailConfig = action.payload.data;
    });

    builder.addCase(loadSingleEmailConfig.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for EmailConfig ======

    builder.addCase(updateEmailConfig.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateEmailConfig.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateEmailConfig.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for deleteEmailConfig  ======

    builder.addCase(deleteEmailConfig.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteEmailConfig.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteEmailConfig.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // 4) ====== builders for delete many EmailConfig  ======

    builder.addCase(deleteManyEmailConfig.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteManyEmailConfig.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteManyEmailConfig.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default emailConfigSlice.reducer;
export const { clearEmailConfig } = emailConfigSlice.actions;
