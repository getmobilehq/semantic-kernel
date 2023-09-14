import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
	list: [],
	ticketStatus: null,
	error: "",
	total: null,
	loading: false,
};

// ADD_ticket
export const addSingleTicketStatus = createAsyncThunk(
	"ticket-status/addSingleTicketStatus ",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				url: `ticket-status/`,
				data: values,
			});
			toast.success("Ticket Status Added");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding ticket-status try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// DELETE_ticket
export const deleteTicketStatus = createAsyncThunk(
	"ticket-status/deleteTicketStatus ",
	async (id) => {
		try {
			const resp = await axios({
				method: "delete",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `ticket-status/${id}`,
			});

			toast.success("ticket-status Deleted");
			return {
				data: resp.data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting ticket-status try again");
			console.log(error.message);
		}
	}
);

// ticket_DETAILS
export const loadSingleTicketStatus = createAsyncThunk(
	"ticket-status/loadSingleTicketStatus",
	async (id) => {
		try {
			const data = await axios.get(`ticket-status/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// ticketS
export const loadAllTicketStatus = createAsyncThunk(
	"ticket-status/loadAllTicketStatus",
	async () => {
		try {
			const { data } = await axios.get(`ticket-status`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const updateTicketStatus = createAsyncThunk(
	"ticket-status/updateTicketStatus",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `ticket-status/${id}`,
				data: {
					...values,
				},
			});
			toast.success("ticket-status Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating ticket-status try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const ticketStatusSlice = createSlice({
	name: "ticket-status",
	initialState,
	reducers: {
		clearTicketStatus: (state) => {
			state.ticketStatus = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllTicketStatus ======

		builder.addCase(loadAllTicketStatus.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllTicketStatus.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllTicketStatus.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addSingleTicketStatus  ======

		builder.addCase(addSingleTicketStatus.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addSingleTicketStatus.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addSingleTicketStatus.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSingleTicketStatus ======

		builder.addCase(loadSingleTicketStatus.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleTicketStatus.fulfilled, (state, action) => {
			state.loading = false;
			state.ticketStatus = action.payload.data;
		});

		builder.addCase(loadSingleTicketStatus.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for ticket-status ======

		builder.addCase(updateTicketStatus.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateTicketStatus.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(updateTicketStatus.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteTicketStatus  ======

		builder.addCase(deleteTicketStatus.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteTicketStatus.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteTicketStatus.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default ticketStatusSlice.reducer;
export const { clearTicketStatus } = ticketStatusSlice.actions;
