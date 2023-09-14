import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  list: [],
  taskType: null,
  error: "",
  total: null,
  loading: false,
};

// ADD_taskType
export const addSingleTaskType = createAsyncThunk(
  "taskType/addSingleTaskType",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        url: `crm-task-type/`,
        data: {
          ...values,
        },
      });
      toast.success("Task Type Added");
      return {
        data,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in adding task type try again");
      console.log(error.message);
      return {
        message: "error",
      };
    }
  }
);

// DELETE_taskType
export const deleteTaskType = createAsyncThunk(
  "taskType/deleteTaskType ",
  async (id, api) => {
    try {
      const resp = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `crm-task-type/${id}`,
      });
      api.dispatch(loadAllTaskType());
      toast.success("Task Type Deleted");
      return {
        data: resp.data.id,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in deleting task type try again");
      console.log(error.message);
    }
  }
);

// taskType_DETAILS
export const loadSingleTaskType = createAsyncThunk(
  "taskType/loadSingleTaskType",
  async (id) => {
    try {
      const data = await axios.get(`crm-task-type/${id}`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// taskTypeS
export const loadAllTaskType = createAsyncThunk(
  "taskType/loadAllTaskType",
  async () => {
    try {
      const { data } = await axios.get(`crm-task-type?query=all`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// loadAllTaskType paginated
export const loadAllTaskTypePaginated = createAsyncThunk(
  "taskType/loadAllTaskTypePaginated",
  async ({ page, count, status }) => {
    try {
      const { data } = await axios.get(
        `crm-task-type?status=${status}&page=${page}&count=${count}`
      );
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const updateTaskType = createAsyncThunk(
  "taskType/updateTaskType",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",

        url: `crm-task-type/${id}`,
        data: {
          ...values,
        },
      });
      toast.success("TaskType Updated");
      return {
        data,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in updating task type try again");
      console.log(error.message);
      return {
        message: "error",
      };
    }
  }
);

const crmTaskTypeSlice = createSlice({
  name: "taskType",
  initialState,
  reducers: {
    clearTaskType: (state) => {
      state.taskType = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllTaskType ======

    builder.addCase(loadAllTaskType.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllTaskType.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });

    builder.addCase(loadAllTaskType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for loadAllTaskTypePaginated ======

    builder.addCase(loadAllTaskTypePaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllTaskTypePaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.getAllTaskType;
      state.total = action.payload.totalTaskTypeCount?._count?.id;
    });

    builder.addCase(loadAllTaskTypePaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addSingleTaskType  ======

    builder.addCase(addSingleTaskType.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addSingleTaskType.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addSingleTaskType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for loadSingleTaskType ======

    builder.addCase(loadSingleTaskType.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleTaskType.fulfilled, (state, action) => {
      state.loading = false;
      state.taskType = action.payload.data;
    });

    builder.addCase(loadSingleTaskType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for taskType ======

    builder.addCase(updateTaskType.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateTaskType.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateTaskType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for deleteTaskType  ======

    builder.addCase(deleteTaskType.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteTaskType.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteTaskType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default crmTaskTypeSlice.reducer;
export const { clearTaskType } = crmTaskTypeSlice.actions;
