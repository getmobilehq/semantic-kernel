import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import queryGenerator from "../../../../../utils/queryGenerator";

const initialState = {
	list: [],
	opportunity: null,
	error: "",
	total: null,
	loading: false,
};

// ADD_Opportunity
export const addSingleOpportunity = createAsyncThunk(
	"opportunity/addSingleOpportunity ",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				url: `opportunity/`,
				data: {
					...values,
				},
			});
			toast.success("opportunity Added");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding opportunity try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// DELETE_Opportunity
export const deleteOpportunity = createAsyncThunk(
	"opportunity/deleteOpportunity ",
	async (id) => {
		try {
			const resp = await axios({
				method: "patch",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `opportunity/${id}`,
				data: {
					status: false,
				},
			});

			toast.success("opportunity Deleted");
			return {
				data: resp.data.id,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting opportunity try again");
			console.log(error.message);
		}
	}
);

// DELETE Many_contact
export const deleteManyOpportunity = createAsyncThunk(
	"contact/deleteManyOpportunity ",
	async (data) => {
		try {
			const resp = await axios({
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `opportunity?query=deletemany`,
				data: data,
			});

			toast.success("Opportunity Deleted");
			return {
				data: resp.data.id,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting Opportunity, try again");
			console.log(error.message);
		}
	}
);

// Opportunity_DETAILS
export const loadSingleOpportunity = createAsyncThunk(
	"opportunity/loadSingleOpportunity",
	async (id) => {
		try {
			const data = await axios.get(`opportunity/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// OpportunityS
export const loadAllOpportunity = createAsyncThunk(
	"opportunity/loadAllOpportunity",
	async () => {
		try {
			const { data } = await axios.get(`opportunity?query=all`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// loadAllOpportunity paginated
export const loadAllOpportunityPaginated = createAsyncThunk(
	"opportunity/loadAllOpportunityPaginated",
	async (arg) => {
		try {
			const query = queryGenerator(arg);
			const { data } = await axios.get(`opportunity?${query}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const updateOpportunity = createAsyncThunk(
	"opportunity/updateOpportunity",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `opportunity/${id}`,
				data: {
					...values,
				},
			});
			toast.success("opportunity Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating opportunity try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const opportunitySlice = createSlice({
	name: "opportunity",
	initialState,
	reducers: {
		clearOpportunity: (state) => {
			state.opportunity = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllOpportunity ======

		builder.addCase(loadAllOpportunity.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllOpportunity.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllOpportunity.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for loadAllOpportunityPaginated ======

		builder.addCase(loadAllOpportunityPaginated.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllOpportunityPaginated.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload?.getAllOpportunity;
			state.total = action.payload?.totalOpportunityCount?._count?.id;
		});

		builder.addCase(loadAllOpportunityPaginated.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addSingleOpportunity  ======

		builder.addCase(addSingleOpportunity.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addSingleOpportunity.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addSingleOpportunity.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSingleOpportunity ======

		builder.addCase(loadSingleOpportunity.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleOpportunity.fulfilled, (state, action) => {
			state.loading = false;
			state.opportunity = action.payload.data;
		});

		builder.addCase(loadSingleOpportunity.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for opportunity ======

		builder.addCase(updateOpportunity.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateOpportunity.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(updateOpportunity.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteOpportunity  ======

		builder.addCase(deleteOpportunity.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteOpportunity.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteOpportunity.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
		// 5) ====== builders for delete many Opportunity  ======

		builder.addCase(deleteManyOpportunity.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteManyOpportunity.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteManyOpportunity.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default opportunitySlice.reducer;
export const { clearOpportunity } = opportunitySlice.actions;
