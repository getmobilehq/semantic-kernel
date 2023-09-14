import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  list: [],
  ticketComment: null,
  error: "",
  total: null,
  loading: false,
};

// ADD_ticket
export const addSingleTicketComment = createAsyncThunk(
  "ticket-comment/addSingleTicketComment ",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        url: `ticket-comment/`,
        data: values,
      });
      toast.success("Ticket Comment added");
      return {
        data,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in adding ticket-comment try again");
      console.log(error.message);
      return {
        message: "error",
      };
    }
  }
);

// ticketS
export const loadAllTicketComment = createAsyncThunk(
  "ticket-comment/loadAllTicketComment",
  async () => {
    try {
      const { data } = await axios.get(`ticket-comment`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// LoadAllTicketCommentByTicketId
export const loadAllTicketCommentByTicketId = createAsyncThunk(
  "ticket-comment/loadAllTicketCommentByTicketId",
  async (ticketId) => {
    try {
      const { data } = await axios.get(`ticket-comment/${ticketId}`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

const ticketStatusSlice = createSlice({
  name: "ticket-comment",
  initialState,
  reducers: {
    clearTicketStatus: (state) => {
      state.ticketComment = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllTicketComment ======

    builder.addCase(loadAllTicketComment.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllTicketComment.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });

    builder.addCase(loadAllTicketComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addSingleTicketComment  ======

    builder.addCase(addSingleTicketComment.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addSingleTicketComment.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addSingleTicketComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for loadAllTicketCommentByTicketId ======

    builder.addCase(loadAllTicketCommentByTicketId.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      loadAllTicketCommentByTicketId.fulfilled,
      (state, action) => {
        state.loading = false;
        state.list = action.payload;
      }
    );

    builder.addCase(
      loadAllTicketCommentByTicketId.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
  },
});

export default ticketStatusSlice.reducer;
export const { clearTicketStatus } = ticketStatusSlice.actions;
