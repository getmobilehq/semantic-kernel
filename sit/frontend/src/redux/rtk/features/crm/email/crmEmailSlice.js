import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import queryGenerator from "../../../../../utils/queryGenerator";

const initialState = {
	list: [],
	email: null,
	error: "",
	total: null,
	loading: false,
};

// ADD_email
export const addSingleEmail = createAsyncThunk(
	"email/addSingleEmail ",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				url: `crm-email?${values.emailConfigName}`,
				data: {
					...values,
				},
			});
			toast.success("Email Added");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding email try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// DELETE_email
export const deleteEmail = createAsyncThunk(
	"email/deleteEmail ",
	async (id) => {
		try {
			const resp = await axios({
				method: "patch",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `crm-email/${id}`,
				data: {
					status: false,
				},
			});

			toast.success("Email Deleted");
			return {
				data: resp.data.id,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting email try again");
			console.log(error.message);
		}
	}
);

// DELETE Many_email
export const deleteManyEmail = createAsyncThunk(
	"email/deleteManyEmail ",
	async (data) => {
		try {
			const resp = await axios({
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `crm-email?query=deletemany`,
				data: data,
			});

			toast.success("Emails Deleted");
			return {
				data: resp.data.id,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting emails, try again");
			console.log(error.message);
		}
	}
);

// email_DETAILS
export const loadSingleEmail = createAsyncThunk(
	"email/loadSingleEmail",
	async (id) => {
		try {
			const data = await axios.get(`crm-email/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// emailS
export const loadAllEmail = createAsyncThunk("email/loadAllEmail", async () => {
	try {
		const { data } = await axios.get(`crm-email?query=all`);
		return data;
	} catch (error) {
		console.log(error.message);
	}
});

// loadAllEmail paginated
export const loadAllEmailPaginated = createAsyncThunk(
	"email/loadAllEmailPaginated",
	async (arg) => {
		try {
			const query = queryGenerator(arg);
			const { data } = await axios.get(`crm-email?${query}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

const crmEmailSlice = createSlice({
	name: "email",
	initialState,
	reducers: {
		clearEmail: (state) => {
			state.email = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllEmail ======

		builder.addCase(loadAllEmail.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllEmail.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllEmail.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for loadAllEmailPaginated ======

		builder.addCase(loadAllEmailPaginated.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllEmailPaginated.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload?.getAllCrmEmail;
			state.total = action.payload?.totalCrmEmailCount?._count?.id;
		});

		builder.addCase(loadAllEmailPaginated.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addSingleEmail  ======

		builder.addCase(addSingleEmail.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addSingleEmail.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addSingleEmail.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSingleEmail ======

		builder.addCase(loadSingleEmail.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleEmail.fulfilled, (state, action) => {
			state.loading = false;
			state.email = action.payload.data;
		});

		builder.addCase(loadSingleEmail.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteEmail  ======

		builder.addCase(deleteEmail.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteEmail.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteEmail.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 5) ====== builders for deleteManyEmail  ======

		builder.addCase(deleteManyEmail.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteManyEmail.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteManyEmail.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default crmEmailSlice.reducer;
export const { clearEmail } = crmEmailSlice.actions;
