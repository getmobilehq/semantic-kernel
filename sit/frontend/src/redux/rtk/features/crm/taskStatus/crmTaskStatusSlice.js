import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  list: [],
  taskStatus: null,
  error: "",
  total: null,
  loading: false,
};

// ADD_taskStatus
export const addSingleTaskStatus = createAsyncThunk(
  "taskStatus/addSingleTaskStatus",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        url: `crm-task-status/`,
        data: {
          ...values,
        },
      });
      toast.success("Task Status Added");
      return {
        data,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in adding task status try again");
      console.log(error.message);
      return {
        message: "error",
      };
    }
  }
);

// DELETE_taskStatus
export const deleteTaskStatus = createAsyncThunk(
  "taskStatus/deleteTaskStatus ",
  async (id, api) => {
    try {
      const resp = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `crm-task-status/${id}`,
      });
      api.dispatch(loadAllTaskStatus());
      toast.success("Task Status Deleted");
      return {
        data: resp.data.id,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in deleting task status try again");
      console.log(error.message);
    }
  }
);

// taskStatus_DETAILS
export const loadSingleTaskStatus = createAsyncThunk(
  "taskStatus/loadSingleTaskStatus",
  async (id) => {
    try {
      const data = await axios.get(`crm-task-status/${id}`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// taskStatusS
export const loadAllTaskStatus = createAsyncThunk(
  "taskStatus/loadAllTaskStatus",
  async () => {
    try {
      const { data } = await axios.get(`crm-task-status?query=all`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// loadAllTaskStatus paginated
export const loadAllTaskStatusPaginated = createAsyncThunk(
  "taskStatus/loadAllTaskStatusPaginated",
  async ({ page, count, status }) => {
    try {
      const { data } = await axios.get(
        `crm-task-status?status=${status}&page=${page}&count=${count}`
      );
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const updateTaskStatus = createAsyncThunk(
  "taskStatus/updateTaskStatus",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",

        url: `crm-task-status/${id}`,
        data: {
          ...values,
        },
      });
      toast.success("Task Status Updated");
      return {
        data,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in updating task status try again");
      console.log(error.message);
      return {
        message: "error",
      };
    }
  }
);

const crmTaskStatusSlice = createSlice({
  name: "taskStatus",
  initialState,
  reducers: {
    clearTaskStatus: (state) => {
      state.taskStatus = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllTaskStatusStatus ======

    builder.addCase(loadAllTaskStatus.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllTaskStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });

    builder.addCase(loadAllTaskStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for loadAllTaskStatusPaginated ======

    builder.addCase(loadAllTaskStatusPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllTaskStatusPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.getAllTaskStatus;
      state.total = action.payload.totalTaskStatusCount?._count?.id;
    });

    builder.addCase(loadAllTaskStatusPaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addSingleTaskStatus  ======

    builder.addCase(addSingleTaskStatus.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addSingleTaskStatus.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addSingleTaskStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for loadSingleTaskStatus ======

    builder.addCase(loadSingleTaskStatus.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleTaskStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.taskStatus = action.payload.data;
    });

    builder.addCase(loadSingleTaskStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for taskStatus ======

    builder.addCase(updateTaskStatus.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateTaskStatus.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateTaskStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for deleteTaskStatus  ======

    builder.addCase(deleteTaskStatus.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteTaskStatus.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteTaskStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default crmTaskStatusSlice.reducer;
export const { clearTaskStatus } = crmTaskStatusSlice.actions;
