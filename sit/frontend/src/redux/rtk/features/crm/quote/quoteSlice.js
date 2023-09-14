import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import queryGenerator from "../../../../../utils/queryGenerator";

const initialState = {
	list: [],
	quote: null,
	error: "",
	total: null,
	loading: false,
};

// ADD_quote
export const addSingleQuote = createAsyncThunk(
	"quote/addSingleQuote",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				url: `quote/`,
				data: {
					...values,
				},
			});
			toast.success("Quote Added");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding quote try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// DELETE_quote
export const deleteQuote = createAsyncThunk(
	"quote/deleteQuote ",
	async (id) => {
		try {
			const resp = await axios({
				method: "patch",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `quote/${id}`,
				data: {
					status: false,
				},
			});

			toast.success("Quote Deleted");
			return {
				data: resp.data.id,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting quote try again");
			console.log(error.message);
		}
	}
);

// DELETE Many_contact
export const deleteManyQuote = createAsyncThunk(
	"contact/deleteManyQuote ",
	async (data) => {
		try {
			const resp = await axios({
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `quote?query=deletemany`,
				data: data,
			});

			toast.success("Quote Deleted");
			return {
				data: resp.data.id,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting Quote, try again");
			console.log(error.message);
		}
	}
);

// quote_DETAILS
export const loadSingleQuote = createAsyncThunk(
	"quote/loadSingleQuote",
	async (id) => {
		try {
			const data = await axios.get(`quote/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// quoteS
export const loadAllQuote = createAsyncThunk("quote/loadAllQuote", async () => {
	try {
		const { data } = await axios.get(`quote?query=all`);
		return data;
	} catch (error) {
		console.log(error.message);
	}
});

// loadAllQuote paginated
export const loadAllQuotePaginated = createAsyncThunk(
	"quote/loadAllQuotePaginated",
	async (arg) => {
		try {
			const query = queryGenerator(arg);
			const { data } = await axios.get(`quote?${query}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const updateQuote = createAsyncThunk(
	"quote/updateQuote",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `quote/${id}`,
				data: {
					...values,
				},
			});
			toast.success("Quote Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating quote try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const quoteSlice = createSlice({
	name: "quote",
	initialState,
	reducers: {
		clearQuote: (state) => {
			state.quote = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllQuote ======

		builder.addCase(loadAllQuote.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllQuote.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllQuote.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for loadAllQuotePaginated ======

		builder.addCase(loadAllQuotePaginated.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllQuotePaginated.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload?.getAllQuote;
			state.total = action.payload?.totalQuoteCount?._count?.id;
		});

		builder.addCase(loadAllQuotePaginated.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addSingleQuote  ======

		builder.addCase(addSingleQuote.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addSingleQuote.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addSingleQuote.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSingleQuote ======

		builder.addCase(loadSingleQuote.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleQuote.fulfilled, (state, action) => {
			state.loading = false;
			state.quote = action.payload.data;
		});

		builder.addCase(loadSingleQuote.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for quote ======

		builder.addCase(updateQuote.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateQuote.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(updateQuote.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteQuote  ======

		builder.addCase(deleteQuote.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteQuote.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteQuote.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
		// 4) ====== builders for delete many Quote  ======

		builder.addCase(deleteManyQuote.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteManyQuote.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteManyQuote.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default quoteSlice.reducer;
export const { clearQuote } = quoteSlice.actions;
