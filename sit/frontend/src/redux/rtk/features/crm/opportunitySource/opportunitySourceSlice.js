import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  list: [],
  opportunitySource: null,
  error: "",
  loading: false,
};

// ADD_Opportunity
export const addSingleOpportunitySource = createAsyncThunk(
  "opportunity-source/addSingleOpportunitySource ",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        url: `opportunity-source/`,
        data: {
          ...values,
        },
      });
      toast.success("opportunity-source Added");
      return {
        data,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in adding opportunity-source try again");
      console.log(error.message);
      return {
        message: "error",
      };
    }
  }
);

// DELETE_Opportunity
export const deleteOpportunitySource = createAsyncThunk(
  "opportunity-source/deleteOpportunitySource ",
  async (id, api) => {
    try {
      const resp = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `opportunity-source/${id}`,
      });
      api.dispatch(loadAllOpportunitySource());
      toast.success("opportunity-source Deleted");
      return {
        data: resp.data.id,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in deleting opportunity-source try again");
      console.log(error.message);
    }
  }
);

// Opportunity_DETAILS
export const loadSingleOpportunitySource = createAsyncThunk(
  "opportunity-source/loadSingleOpportunitySource",
  async (id) => {
    try {
      const data = await axios.get(`opportunity-source/${id}`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// OpportunityS
export const loadAllOpportunitySource = createAsyncThunk(
  "opportunity-source/loadAllOpportunitySource",
  async () => {
    try {
      const { data } = await axios.get(`opportunity-source`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// loadAllOpportunitySource paginated
export const loadAllOpportunitySourcePaginated = createAsyncThunk(
  "opportunity-source/loadAllOpportunitySourcePaginated",
  async ({ page, count, status }) => {
    try {
      const { data } = await axios.get(
        `opportunity-source?status=${status}&page=${page}&count=${count}`
      );
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const updateOpportunitySource = createAsyncThunk(
  "opportunity-source/updateOpportunitySource",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",

        url: `opportunity-source/${id}`,
        data: {
          ...values,
        },
      });
      toast.success("opportunity-source Updated");
      return {
        data,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in updating opportunity-source try again");
      console.log(error.message);
      return {
        message: "error",
      };
    }
  }
);

const opportunitySourceSlice = createSlice({
  name: "opportunitySource",
  initialState,
  reducers: {
    clearOpportunitySource: (state) => {
      state.opportunitySource = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllOpportunitySource ======

    builder.addCase(loadAllOpportunitySource.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllOpportunitySource.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });

    builder.addCase(loadAllOpportunitySource.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for loadAllOpportunitySourcePaginated ======

    builder.addCase(loadAllOpportunitySourcePaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      loadAllOpportunitySourcePaginated.fulfilled,
      (state, action) => {
        state.loading = false;
        state.list = action.payload;
      }
    );

    builder.addCase(
      loadAllOpportunitySourcePaginated.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );

    // 2) ====== builders for addSingleOpportunitySource  ======

    builder.addCase(addSingleOpportunitySource.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addSingleOpportunitySource.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addSingleOpportunitySource.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for loadSingleOpportunitySource ======

    builder.addCase(loadSingleOpportunitySource.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleOpportunitySource.fulfilled, (state, action) => {
      state.loading = false;
      state.opportunitySource = action.payload.data;
    });

    builder.addCase(loadSingleOpportunitySource.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for opportunity-source ======

    builder.addCase(updateOpportunitySource.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateOpportunitySource.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateOpportunitySource.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for deleteOpportunitySource  ======

    builder.addCase(deleteOpportunitySource.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteOpportunitySource.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteOpportunitySource.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default opportunitySourceSlice.reducer;
export const { clearOpportunitySource } = opportunitySourceSlice.actions;
