import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  list: [],
  opportunityType: null,
  error: "",
  loading: false,
};

// ADD_Opportunity
export const addSingleOpportunityType = createAsyncThunk(
  "opportunity-type/addSingleOpportunityType ",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        url: `opportunity-type/`,
        data: {
          ...values,
        },
      });
      toast.success("opportunity type Added");
      return {
        data,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in adding opportunity-type try again");
      console.log(error.message);
      return {
        message: "error",
      };
    }
  }
);

// DELETE_Opportunity
export const deleteOpportunityType = createAsyncThunk(
  "opportunity-type/deleteOpportunityType ",
  async (id, api) => {
    try {
      const resp = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `opportunity-type/${id}`,
      });
      api.dispatch(loadAllOpportunityType());
      toast.success("Opportunity type Deleted");
      return {
        data: resp.data.id,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in deleting opportunity-type try again");
      console.log(error.message);
    }
  }
);

// Opportunity_DETAILS
export const loadSingleOpportunityType = createAsyncThunk(
  "opportunity-type/loadSingleOpportunityType",
  async (id) => {
    try {
      const data = await axios.get(`opportunity-type/${id}`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// OpportunityS
export const loadAllOpportunityType = createAsyncThunk(
  "opportunity-type/loadAllOpportunityType",
  async () => {
    try {
      const { data } = await axios.get(`opportunity-type`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// loadAllOpportunityType paginated
export const loadAllOpportunityTypePaginated = createAsyncThunk(
  "opportunity-type/loadAllOpportunityTypePaginated",
  async ({ page, count, status }) => {
    try {
      const { data } = await axios.get(
        `opportunity-type?status=${status}&page=${page}&count=${count}`
      );
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const updateOpportunityType = createAsyncThunk(
  "opportunity-type/updateOpportunityType",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",

        url: `opportunity-type/${id}`,
        data: {
          ...values,
        },
      });
      toast.success("opportunity-type Updated");
      return {
        data,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in updating opportunity-type try again");
      console.log(error.message);
      return {
        message: "error",
      };
    }
  }
);

const opportunityTypeSlice = createSlice({
  name: "opportunityType",
  initialState,
  reducers: {
    clearOpportunityType: (state) => {
      state.opportunityType = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllOpportunityType ======

    builder.addCase(loadAllOpportunityType.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllOpportunityType.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });

    builder.addCase(loadAllOpportunityType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for loadAllOpportunityTypePaginated ======

    builder.addCase(loadAllOpportunityTypePaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      loadAllOpportunityTypePaginated.fulfilled,
      (state, action) => {
        state.loading = false;
        state.list = action.payload;
      }
    );

    builder.addCase(
      loadAllOpportunityTypePaginated.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );

    // 2) ====== builders for addSingleOpportunityType  ======

    builder.addCase(addSingleOpportunityType.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addSingleOpportunityType.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addSingleOpportunityType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for loadSingleOpportunityType ======

    builder.addCase(loadSingleOpportunityType.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleOpportunityType.fulfilled, (state, action) => {
      state.loading = false;
      state.opportunityType = action.payload.data;
    });

    builder.addCase(loadSingleOpportunityType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for opportunity-type ======

    builder.addCase(updateOpportunityType.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateOpportunityType.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateOpportunityType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for deleteOpportunityType  ======

    builder.addCase(deleteOpportunityType.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteOpportunityType.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteOpportunityType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default opportunityTypeSlice.reducer;
export const { clearOpportunityType } = opportunityTypeSlice.actions;
