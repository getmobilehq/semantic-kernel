import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
	list: [],
	ticketPriority: null,
	error: "",
	total: null,
	loading: false,
};

// ADD_ticket
export const addSingleTicketPriority = createAsyncThunk(
	"ticket-priority/addSingleTicketPriority ",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				url: `ticket-priority/`,
				data: values,
			});
			toast.success("Ticket Priority Added");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding ticket-priority try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// DELETE_ticket
export const deleteTicketPriority = createAsyncThunk(
	"ticket-priority/deleteTicketPriority ",
	async (id) => {
		try {
			const resp = await axios({
				method: "delete",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `ticket-priority/${id}`,
			});

			toast.success("ticket-priority Deleted");
			return {
				data: resp.data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting ticket-priority try again");
			console.log(error.message);
		}
	}
);

// ticket_DETAILS
export const loadSingleTicketPriority = createAsyncThunk(
	"ticket-priority/loadSingleTicketPriority",
	async (id) => {
		try {
			const data = await axios.get(`ticket-priority/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// ticketS
export const loadAllTicketPriority = createAsyncThunk(
	"ticket-priority/loadAllTicketPriority",
	async () => {
		try {
			const { data } = await axios.get(`ticket-priority`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const updateTicketPriority = createAsyncThunk(
	"ticket-priority/updateTicketPriority",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `ticket-priority/${id}`,
				data: {
					...values,
				},
			});
			toast.success("ticket-priority Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating ticket-priority try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const ticketPrioritySlice = createSlice({
	name: "ticket-priority",
	initialState,
	reducers: {
		clearTicketPriority: (state) => {
			state.ticketPriority = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllTicketPriority ======

		builder.addCase(loadAllTicketPriority.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllTicketPriority.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllTicketPriority.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addSingleTicketPriority  ======

		builder.addCase(addSingleTicketPriority.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addSingleTicketPriority.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addSingleTicketPriority.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSingleTicketPriority ======

		builder.addCase(loadSingleTicketPriority.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleTicketPriority.fulfilled, (state, action) => {
			state.loading = false;
			state.ticketPriority = action.payload.data;
		});

		builder.addCase(loadSingleTicketPriority.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for ticket-priority ======

		builder.addCase(updateTicketPriority.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateTicketPriority.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(updateTicketPriority.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteTicketPriority  ======

		builder.addCase(deleteTicketPriority.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteTicketPriority.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteTicketPriority.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default ticketPrioritySlice.reducer;
export const { clearTicketPriority } = ticketPrioritySlice.actions;
