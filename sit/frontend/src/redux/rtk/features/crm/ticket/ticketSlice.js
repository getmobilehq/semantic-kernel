import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import queryGenerator from "../../../../../utils/queryGenerator";

const initialState = {
	list: [],
	ticket: null,
	error: "",
	total: null,
	loading: false,
};

// ADD_ticket
export const addSingleTicket = createAsyncThunk(
	"ticket/addSingleTicket ",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				url: `ticket/`,
				data: values,
			});
			toast.success("Ticket Added");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding ticket try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// DELETE_ticket
export const deleteTicket = createAsyncThunk(
	"ticket/deleteTicket ",
	async (id) => {
		try {
			const resp = await axios({
				method: "patch",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `ticket/${id}`,
				data: {
					status: false,
				},
			});

			toast.success("ticket Deleted");
			return {
				data: resp.data.id,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting ticket try again");
			console.log(error.message);
		}
	}
);

// DELETE Many_ticket
export const deleteManyTicket = createAsyncThunk(
	"ticket/deleteManyTicket ",
	async (data) => {
		try {
			const resp = await axios({
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `ticket?query=deletemany`,
				data: data,
			});

			toast.success("Ticket Deleted");
			return {
				data: resp.data.id,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting ticket, try again");
			console.log(error.message);
		}
	}
);

// ticket_DETAILS
export const loadSingleTicket = createAsyncThunk(
	"ticket/loadSingleTicket",
	async (id) => {
		try {
			const data = await axios.get(`ticket/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// ticketS
export const loadAllTicket = createAsyncThunk(
	"ticket/loadAllTicket",
	async () => {
		try {
			const { data } = await axios.get(`ticket?query=all`);
			console.log(data, "data");
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

//load all ticket by customer id

export const loadAllTicketByCustomerId = createAsyncThunk(
	"ticket/loadAllTicketByCustomerId",
	async ({ id, arg }) => {
		try {
			const query = queryGenerator(arg);
			const { data } = await axios.get(`ticket/customer/${id}?${query}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// loadAllTicket paginated
export const loadAllTicketPaginated = createAsyncThunk(
	"ticket/loadAllTicketPaginated",
	async (arg) => {
		try {
			const query = queryGenerator(arg);
			const { data } = await axios.get(`ticket?${query}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const updateTicket = createAsyncThunk(
	"ticket/updateTicket",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `ticket/${id}`,
				data: {
					...values,
				},
			});
			toast.success("ticket Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating ticket try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const ticketSlice = createSlice({
	name: "ticket",
	initialState,
	reducers: {
		clearTicket: (state) => {
			state.ticket = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllTicket ======

		builder.addCase(loadAllTicket.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllTicket.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllTicket.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for loadAllTicketPaginated ======

		builder.addCase(loadAllTicketPaginated.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllTicketPaginated.fulfilled, (state, action) => {
			state.loading = false;
			if (!action.payload?.getAllTicket) {
				state.list = [action.payload];
			} else {
				state.list = action.payload?.getAllTicket;
				state.total = action.payload?.totalTicketCount?._count?.id;
			}
		});

		builder.addCase(loadAllTicketPaginated.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addSingleTicket  ======

		builder.addCase(addSingleTicket.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addSingleTicket.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addSingleTicket.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSingleTicket ======

		builder.addCase(loadSingleTicket.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleTicket.fulfilled, (state, action) => {
			state.loading = false;
			state.ticket = action.payload.data;
		});

		builder.addCase(loadSingleTicket.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for ticket ======

		builder.addCase(updateTicket.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateTicket.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(updateTicket.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for loadAllTicketByCustomerId  ======

		builder.addCase(loadAllTicketByCustomerId.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllTicketByCustomerId.fulfilled, (state, action) => {
			state.loading = false;
			if (!action.payload?.getAllTicket) {
				state.list = [action.payload];
			} else {
				state.list = action.payload?.getAllTicket;
				state.total = action.payload?.totalTicketCount?._count?.id;
			}
		});

		builder.addCase(loadAllTicketByCustomerId.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteTicket  ======

		builder.addCase(deleteTicket.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteTicket.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteTicket.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 5) ====== builders for deleteManyTicket  ======

		builder.addCase(deleteManyTicket.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteManyTicket.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteManyTicket.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default ticketSlice.reducer;
export const { clearTicket } = ticketSlice.actions;
