import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  list: [],
  companyType: null,
  error: "",
  loading: false,
};

// ADD_contact
export const addSingleCompanyType = createAsyncThunk(
  "company-type/addSingleCompanyType ",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        url: `company-type/`,
        data: {
          ...values,
        },
      });
      toast.success("company-type Added");
      return {
        data,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in adding company-type try again");
      console.log(error.message);
      return {
        message: "error",
      };
    }
  }
);

// DELETE_contact
export const deleteCompanyType = createAsyncThunk(
  "company-type/deleteCompanyType ",
  async (id, api) => {
    try {
      const resp = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `company-type/${id}`,
      });
      api.dispatch(loadAllCompanyType());
      toast.success("company-type Deleted");
      return {
        data: resp.data.id,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in deleting company-type try again");
      console.log(error.message);
    }
  }
);

// contact_DETAILS
export const loadSinglCompanyType = createAsyncThunk(
  "company-type/loadSinglCompanyType",
  async (id) => {
    try {
      const data = await axios.get(`company-type/${id}`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// contactS
export const loadAllCompanyType = createAsyncThunk(
  "company-type/loadAllCompanyType",
  async () => {
    try {
      const { data } = await axios.get(`company-type`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// loadAllCompanyType paginated
export const loadAllCompanyTypePaginated = createAsyncThunk(
  "company-type/loadAllCompanyTypePaginated",
  async ({ page, count, status }) => {
    try {
      const { data } = await axios.get(
        `company-type?status=${status}&page=${page}&count=${count}`
      );
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const updateCompanyType = createAsyncThunk(
  "company-type/updateCompanyType",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",

        url: `company-type/${id}`,
        data: {
          ...values,
        },
      });
      toast.success("company-type Updated");
      return {
        data,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in updating company-type try again");
      console.log(error.message);
      return {
        message: "error",
      };
    }
  }
);

const companyTypeSlice = createSlice({
  name: "company-type",
  initialState,
  reducers: {
    clearCompanyType: (state) => {
      state.companyType = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllCompanyType ======

    builder.addCase(loadAllCompanyType.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllCompanyType.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });

    builder.addCase(loadAllCompanyType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for loadAllCompanyTypePaginated ======

    builder.addCase(loadAllCompanyTypePaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllCompanyTypePaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });

    builder.addCase(loadAllCompanyTypePaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addSingleCompanyType  ======

    builder.addCase(addSingleCompanyType.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addSingleCompanyType.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addSingleCompanyType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for loadSinglCompanyType ======

    builder.addCase(loadSinglCompanyType.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSinglCompanyType.fulfilled, (state, action) => {
      state.loading = false;
      state.companyType = action.payload.data;
    });

    builder.addCase(loadSinglCompanyType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for company-type ======

    builder.addCase(updateCompanyType.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateCompanyType.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateCompanyType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for deleteCompanyType  ======

    builder.addCase(deleteCompanyType.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteCompanyType.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteCompanyType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default companyTypeSlice.reducer;
export const { clearCompanyType } = companyTypeSlice.actions;
