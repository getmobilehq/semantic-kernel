import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  list: [],
  industry: null,
  error: "",
  loading: false,
};

// ADD_contact
export const addSingleIndustry = createAsyncThunk(
  "industry/addSingleIndustry ",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        url: `industry/`,
        data: {
          ...values,
        },
      });
      toast.success("industry Added");
      return {
        data,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in adding industry try again");
      console.log(error.message);
      return {
        message: "error",
      };
    }
  }
);

// DELETE_contact
export const deleteIndustry = createAsyncThunk(
  "industry/deleteIndustry ",
  async (id, api) => {
    try {
      const resp = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `industry/${id}`,
      });
      api.dispatch(loadAllIndustry());
      toast.success("industry Deleted");
      return {
        data: resp.data.id,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in deleting industry try again");
      console.log(error.message);
    }
  }
);

// contact_DETAILS
export const loadSinglIndustry = createAsyncThunk(
  "industry/loadSinglIndustry",
  async (id) => {
    try {
      const data = await axios.get(`industry/${id}`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// contactS
export const loadAllIndustry = createAsyncThunk(
  "industry/loadAllIndustry",
  async () => {
    try {
      const { data } = await axios.get(`industry`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// loadAllIndustry paginated
export const loadAllIndustryPaginated = createAsyncThunk(
  "industry/loadAllIndustryPaginated",
  async ({ page, count, status }) => {
    try {
      const { data } = await axios.get(
        `industry?status=${status}&page=${page}&count=${count}`
      );
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const updateIndustry = createAsyncThunk(
  "industry/updateIndustry",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",

        url: `industry/${id}`,
        data: {
          ...values,
        },
      });
      toast.success("industry Updated");
      return {
        data,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in updating industry try again");
      console.log(error.message);
      return {
        message: "error",
      };
    }
  }
);

const industrySlice = createSlice({
  name: "industry",
  initialState,
  reducers: {
    clearIndustry: (state) => {
      state.industry = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllIndustry ======

    builder.addCase(loadAllIndustry.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllIndustry.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });

    builder.addCase(loadAllIndustry.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for loadAllIndustryPaginated ======

    builder.addCase(loadAllIndustryPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllIndustryPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });

    builder.addCase(loadAllIndustryPaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addSingleIndustry  ======

    builder.addCase(addSingleIndustry.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addSingleIndustry.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addSingleIndustry.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for loadSinglIndustry ======

    builder.addCase(loadSinglIndustry.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSinglIndustry.fulfilled, (state, action) => {
      state.loading = false;
      state.industry = action.payload.data;
    });

    builder.addCase(loadSinglIndustry.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for industry ======

    builder.addCase(updateIndustry.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateIndustry.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateIndustry.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for deleteIndustry  ======

    builder.addCase(deleteIndustry.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteIndustry.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteIndustry.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default industrySlice.reducer;
export const { clearIndustry } = industrySlice.actions;
