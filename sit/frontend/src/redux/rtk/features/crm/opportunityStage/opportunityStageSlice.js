import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  list: [],
  opportunityStage: null,
  error: "",
  loading: false,
};

// ADD_Opportunity
export const addSingleOpportunityStage = createAsyncThunk(
  "opportunity-stage/addSingleOpportunityStage ",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        url: `opportunity-stage/`,
        data: {
          ...values,
        },
      });
      toast.success("opportunity-stage Added");
      return {
        data,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in adding opportunity-stage try again");
      console.log(error.message);
      return {
        message: "error",
      };
    }
  }
);

// DELETE_Opportunity
export const deleteOpportunityStage = createAsyncThunk(
  "opportunity-stage/deleteOpportunityStage ",
  async (id, api) => {
    try {
      const resp = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `opportunity-stage/${id}`,
      });
      api.dispatch(loadAllOpportunityStage());
      toast.success("opportunity stage Deleted");
      return {
        data: resp.data.id,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in deleting opportunity-stage try again");
      console.log(error.message);
    }
  }
);

// Opportunity_DETAILS
export const loadSingleOpportunityStage = createAsyncThunk(
  "opportunity-stage/loadSingleOpportunityStage",
  async (id) => {
    try {
      const data = await axios.get(`opportunity-stage/${id}`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// OpportunityS
export const loadAllOpportunityStage = createAsyncThunk(
  "opportunity-stage/loadAllOpportunityStage",
  async () => {
    try {
      const { data } = await axios.get(`opportunity-stage`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// loadAllOpportunityStage paginated
export const loadAllOpportunityStagePaginated = createAsyncThunk(
  "opportunity-stage/loadAllOpportunityStagePaginated",
  async ({ page, count, status }) => {
    try {
      const { data } = await axios.get(
        `opportunity-stage?status=${status}&page=${page}&count=${count}`
      );
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const updateOpportunityStage = createAsyncThunk(
  "opportunity-stage/updateOpportunityStage",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",

        url: `opportunity-stage/${id}`,
        data: {
          ...values,
        },
      });
      toast.success("opportunity-stage Updated");
      return {
        data,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in updating opportunity-stage try again");
      console.log(error.message);
      return {
        message: "error",
      };
    }
  }
);

const opportunityStageSlice = createSlice({
  name: "opportunityStage",
  initialState,
  reducers: {
    clearOpportunityStage: (state) => {
      state.opportunityStage = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllOpportunityStage ======

    builder.addCase(loadAllOpportunityStage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllOpportunityStage.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });

    builder.addCase(loadAllOpportunityStage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for loadAllOpportunityStagePaginated ======

    builder.addCase(loadAllOpportunityStagePaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      loadAllOpportunityStagePaginated.fulfilled,
      (state, action) => {
        state.loading = false;
        state.list = action.payload;
      }
    );

    builder.addCase(
      loadAllOpportunityStagePaginated.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );

    // 2) ====== builders for addSingleOpportunityStage  ======

    builder.addCase(addSingleOpportunityStage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addSingleOpportunityStage.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addSingleOpportunityStage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for loadSingleOpportunityStage ======

    builder.addCase(loadSingleOpportunityStage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleOpportunityStage.fulfilled, (state, action) => {
      state.loading = false;
      state.opportunityStage = action.payload.data;
    });

    builder.addCase(loadSingleOpportunityStage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for opportunity-stage ======

    builder.addCase(updateOpportunityStage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateOpportunityStage.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateOpportunityStage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for deleteOpportunityStage  ======

    builder.addCase(deleteOpportunityStage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteOpportunityStage.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteOpportunityStage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default opportunityStageSlice.reducer;
export const { clearOpportunityStage } = opportunityStageSlice.actions;
