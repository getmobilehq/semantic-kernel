import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
	list: [],
	ticketCategory: null,
	error: "",
	total: null,
	loading: false,
};

// ADD_ticket
export const addSingleTicketCategory = createAsyncThunk(
	"ticket-category/addSingleTicketCategory ",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				url: `ticket-category/`,
				data: values,
			});
			toast.success("Ticket Category category Added");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding ticket-category try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// DELETE_ticket
export const deleteTicketCategory = createAsyncThunk(
	"ticket-category/deleteTicketCategory ",
	async (id) => {
		try {
			const resp = await axios({
				method: "delete",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `ticket-category/${id}`,
			});

			toast.success("ticket-category Deleted");
			return {
				data: resp.data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting ticket-category try again");
			console.log(error.message);
		}
	}
);

// ticket_DETAILS
export const loadSingleTicketCategory = createAsyncThunk(
	"ticket-category/loadSingleTicketCategory",
	async (id) => {
		try {
			const data = await axios.get(`ticket-category/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// ticketS
export const loadAllTicketCategory = createAsyncThunk(
	"ticket-category/loadAllTicketCategory",
	async () => {
		try {
			const { data } = await axios.get(`ticket-category`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const updateTicketCategory = createAsyncThunk(
	"ticket-category/updateTicketCategory",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `ticket-category/${id}`,
				data: {
					...values,
				},
			});
			toast.success("ticket-category Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating ticket-category try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const ticketCategory = createSlice({
	name: "ticket-category",
	initialState,
	reducers: {
		clearTicketCategory: (state) => {
			state.ticketCategory = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllTicketCategory ======

		builder.addCase(loadAllTicketCategory.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllTicketCategory.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllTicketCategory.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addSingleTicketCategory  ======

		builder.addCase(addSingleTicketCategory.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addSingleTicketCategory.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addSingleTicketCategory.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSingleTicketCategory ======

		builder.addCase(loadSingleTicketCategory.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleTicketCategory.fulfilled, (state, action) => {
			state.loading = false;
			state.ticketCategory = action.payload.data;
		});

		builder.addCase(loadSingleTicketCategory.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for ticket-category ======

		builder.addCase(updateTicketCategory.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateTicketCategory.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(updateTicketCategory.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteTicketCategory  ======

		builder.addCase(deleteTicketCategory.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteTicketCategory.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteTicketCategory.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default ticketCategory.reducer;
export const { clearTicketCategory } = ticketCategory.actions;
