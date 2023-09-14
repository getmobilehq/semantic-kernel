import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  list: [],
  quoteStage: null,
  error: "",
  total: null,
  loading: false,
};

// ADD_quoteStage
export const addSingleQuoteStage = createAsyncThunk(
  "quoteStage/addSingleQuoteStage",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        url: `quote-stage/`,
        data: {
          ...values,
        },
      });
      toast.success("Quote Stage Added");
      return {
        data,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in adding quote stage try again");
      console.log(error.message);
      return {
        message: "error",
      };
    }
  }
);

// DELETE_quoteStage
export const deleteQuoteStage = createAsyncThunk(
  "quoteStage/deleteQuoteStage ",
  async (id, api) => {
    try {
      const resp = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `quote-stage/${id}`,
      });
      api.dispatch(loadAllQuoteStage());
      toast.success("Quote Stage Deleted");
      return {
        data: resp.data.id,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in deleting quote stage try again");
      console.log(error.message);
    }
  }
);

// quoteStage_DETAILS
export const loadSingleQuoteStage = createAsyncThunk(
  "quoteStage/loadSingleQuoteStage",
  async (id) => {
    try {
      const data = await axios.get(`quote-stage/${id}`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// quoteStageS
export const loadAllQuoteStage = createAsyncThunk(
  "quoteStage/loadAllQuoteStage",
  async () => {
    try {
      const { data } = await axios.get(`quote-stage?query=all`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// loadAllQuoteStage paginated
export const loadAllQuoteStagePaginated = createAsyncThunk(
  "quoteStage/loadAllQuoteStagePaginated",
  async ({ page, count, status }) => {
    try {
      const { data } = await axios.get(
        `quote-stage?status=${status}&page=${page}&count=${count}`
      );
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const updateQuoteStage = createAsyncThunk(
  "quoteStage/updateQuoteStage",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",

        url: `quote-stage/${id}`,
        data: {
          ...values,
        },
      });
      toast.success("Quote Stage Updated");
      return {
        data,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in updating quote stage try again");
      console.log(error.message);
      return {
        message: "error",
      };
    }
  }
);

const quoteStageSlice = createSlice({
  name: "quoteStage",
  initialState,
  reducers: {
    clearQuoteStage: (state) => {
      state.quoteStage = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllQuoteStage ======

    builder.addCase(loadAllQuoteStage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllQuoteStage.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });

    builder.addCase(loadAllQuoteStage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for loadAllQuoteStagePaginated ======

    builder.addCase(loadAllQuoteStagePaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllQuoteStagePaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.getAllQuoteStage;
      state.total = action.payload.totalQuoteStageCount?._count?.id;
    });

    builder.addCase(loadAllQuoteStagePaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addSingleQuoteStage  ======

    builder.addCase(addSingleQuoteStage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addSingleQuoteStage.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addSingleQuoteStage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for loadSingleQuoteStage ======

    builder.addCase(loadSingleQuoteStage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleQuoteStage.fulfilled, (state, action) => {
      state.loading = false;
      state.quoteStage = action.payload.data;
    });

    builder.addCase(loadSingleQuoteStage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for quoteStage ======

    builder.addCase(updateQuoteStage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateQuoteStage.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateQuoteStage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for deleteQuoteStage  ======

    builder.addCase(deleteQuoteStage.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteQuoteStage.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteQuoteStage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default quoteStageSlice.reducer;
export const { clearQuoteStage } = quoteStageSlice.actions;
