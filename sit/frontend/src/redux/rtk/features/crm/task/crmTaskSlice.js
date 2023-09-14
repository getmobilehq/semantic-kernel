import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
	list: [],
	task: null,
	error: "",
	total: null,
	loading: false,
};

// ADD_task
export const addSingleTask = createAsyncThunk(
	"task/addSingleTask",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				url: `crm-task/`,
				data: {
					...values,
				},
			});
			toast.success("Task Added");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding task try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// DELETE_task
export const deleteTask = createAsyncThunk("task/deleteTask ", async (id) => {
	try {
		const resp = await axios({
			method: "patch",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			url: `crm-task/${id}`,
			data: {
				status: false,
			},
		});

		toast.success("Task Deleted");
		return {
			data: resp.data.id,
			message: "success",
		};
	} catch (error) {
		toast.error("Error in deleting task try again");
		console.log(error.message);
	}
});

// DELETE Many_contact
export const deleteManyTask = createAsyncThunk(
	"contact/deleteManyTask ",
	async (data) => {
		try {
			const resp = await axios({
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `task?query=deletemany`,
				data: data,
			});

			toast.success("Task Deleted");
			return {
				data: resp.data.id,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting Task, try again");
			console.log(error.message);
		}
	}
);

// task_DETAILS
export const loadSingleTask = createAsyncThunk(
	"task/loadSingleTask",
	async (id) => {
		try {
			const data = await axios.get(`crm-task/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// taskS
export const loadAllTask = createAsyncThunk("task/loadAllTask", async () => {
	try {
		const { data } = await axios.get(`crm-task?query=all`);
		return data;
	} catch (error) {
		console.log(error.message);
	}
});

// loadAllTask paginated
export const loadAllTaskPaginated = createAsyncThunk(
	"task/loadAllTaskPaginated",
	async ({ page, count, status }) => {
		try {
			const { data } = await axios.get(
				`crm-task?status=${status}&page=${page}&count=${count}`
			);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const updateTask = createAsyncThunk(
	"task/updateTask",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `crm-task/${id}`,
				data: {
					...values,
				},
			});
			toast.success("Task Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating task try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const crmTaskSlice = createSlice({
	name: "task",
	initialState,
	reducers: {
		clearTask: (state) => {
			state.task = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAlltask ======

		builder.addCase(loadAllTask.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllTask.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllTask.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for loadAllTaskPaginated ======

		builder.addCase(loadAllTaskPaginated.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllTaskPaginated.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload?.getAllTask;
			state.total = action.payload?.aggregation?._count?.id;
		});

		builder.addCase(loadAllTaskPaginated.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addSingleTask  ======

		builder.addCase(addSingleTask.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addSingleTask.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addSingleTask.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSingletask ======

		builder.addCase(loadSingleTask.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleTask.fulfilled, (state, action) => {
			state.loading = false;
			state.task = action.payload.data;
		});

		builder.addCase(loadSingleTask.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for task ======

		builder.addCase(updateTask.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateTask.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(updateTask.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteTask  ======

		builder.addCase(deleteTask.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteTask.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteTask.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
		// 4) ====== builders for deleteTask  ======

		builder.addCase(deleteManyTask.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteManyTask.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteManyTask.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default crmTaskSlice.reducer;
export const { clearTask } = crmTaskSlice.actions;
