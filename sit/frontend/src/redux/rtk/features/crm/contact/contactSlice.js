import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import queryGenerator from "../../../../../utils/queryGenerator";

const initialState = {
	list: [],
	contact: null,
	error: "",
	total: null,
	loading: false,
};

// ADD_contact
export const addSingleContact = createAsyncThunk(
	"contact/addSingleContact ",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				url: `contact/`,
				data: {
					...values,
				},
			});
			toast.success("Contact Added");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding contact try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// DELETE_contact
export const deleteContact = createAsyncThunk(
	"contact/deleteContact ",
	async (id) => {
		try {
			const resp = await axios({
				method: "patch",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `contact/${id}`,
				data: {
					status: false,
				},
			});

			toast.success("contact Deleted");
			return {
				data: resp.data.id,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting contact try again");
			console.log(error.message);
		}
	}
);

// DELETE Many_contact
export const deleteManyContact = createAsyncThunk(
	"contact/deleteManyContact ",
	async (data) => {
		try {
			const resp = await axios({
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `contact?query=deletemany`,
				data: data,
			});

			toast.success("Contacts Deleted");
			return {
				data: resp.data.id,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting contacts, try again");
			console.log(error.message);
		}
	}
);

// contact_DETAILS
export const loadSingleContact = createAsyncThunk(
	"contact/loadSingleContact",
	async (id) => {
		try {
			const data = await axios.get(`contact/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// contactS
export const loadAllContact = createAsyncThunk(
	"contact/loadAllContact",
	async () => {
		try {
			const { data } = await axios.get(`contact?query=all`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// loadAllContact paginated
export const loadAllContactPaginated = createAsyncThunk(
	"contact/loadAllContactPaginated",
	async (arg) => {
		try {
			const query = queryGenerator(arg);
			const { data } = await axios.get(`contact?${query}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const updateContact = createAsyncThunk(
	"contact/updateContact",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `contact/${id}`,
				data: {
					...values,
				},
			});
			toast.success("contact Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating contact try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const contactSlice = createSlice({
	name: "contact",
	initialState,
	reducers: {
		clearContact: (state) => {
			state.contact = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllContact ======

		builder.addCase(loadAllContact.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllContact.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllContact.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for loadAllContactPaginated ======

		builder.addCase(loadAllContactPaginated.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllContactPaginated.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload?.getAllContact;
			state.total = action.payload?.totalContactCount?._count?.id;
		});

		builder.addCase(loadAllContactPaginated.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addSingleContact  ======

		builder.addCase(addSingleContact.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addSingleContact.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addSingleContact.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSingleContact ======

		builder.addCase(loadSingleContact.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleContact.fulfilled, (state, action) => {
			state.loading = false;
			state.contact = action.payload.data;
		});

		builder.addCase(loadSingleContact.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for contact ======

		builder.addCase(updateContact.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateContact.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(updateContact.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteContact  ======

		builder.addCase(deleteContact.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteContact.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteContact.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 5) ====== builders for deleteManyContact  ======

		builder.addCase(deleteManyContact.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteManyContact.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteManyContact.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default contactSlice.reducer;
export const { clearContact } = contactSlice.actions;
