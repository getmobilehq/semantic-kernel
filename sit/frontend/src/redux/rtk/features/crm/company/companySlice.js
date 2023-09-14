import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import queryGenerator from "../../../../../utils/queryGenerator";

const initialState = {
	list: [],
	company: null,
	error: "",
	total: null,
	loading: false,
};

// ADD_company
export const addSingleCompany = createAsyncThunk(
	"company/addSingleCompany",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				url: `company/`,
				data: {
					...values,
				},
			});
			toast.success("company Added");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding company try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// DELETE_company
export const deleteCompany = createAsyncThunk(
	"company/deleteCompany ",
	async (id) => {
		try {
			const resp = await axios({
				method: "patch",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `company/${id}`,
				data: {
					status: false,
				},
			});

			toast.success("company Deleted");
			return {
				data: resp.data.id,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting company try again");
			console.log(error.message);
		}
	}
);

// DELETE Many_contact
export const deleteManyCompany = createAsyncThunk(
	"contact/deleteManyCompany ",
	async (data) => {
		try {
			const resp = await axios({
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `company?query=deletemany`,
				data: data,
			});

			toast.success("Company Deleted");
			return {
				data: resp.data.id,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting company, try again");
			console.log(error.message);
		}
	}
);

// company_DETAILS
export const loadSinglCompany = createAsyncThunk(
	"company/loadSinglCompany",
	async (id) => {
		try {
			const data = await axios.get(`company/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// companyS
export const loadAllCompany = createAsyncThunk(
	"company/loadAllCompany",
	async () => {
		try {
			const { data } = await axios.get(`company?query=all`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// loadAllCompany paginated
export const loadAllCompanyPaginated = createAsyncThunk(
	"company/loadAllCompanyPaginated",
	async (arg) => {
		try {
			const query = queryGenerator(arg);
			const { data } = await axios.get(`company?${query}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const updateCompany = createAsyncThunk(
	"company/updateCompany",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `company/${id}`,
				data: {
					...values,
				},
			});
			toast.success("company Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating company try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const companySlice = createSlice({
	name: "company",
	initialState,
	reducers: {
		clearCompany: (state) => {
			state.company = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllCompany ======

		builder.addCase(loadAllCompany.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllCompany.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllCompany.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for loadAllCompanyPaginated ======

		builder.addCase(loadAllCompanyPaginated.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllCompanyPaginated.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload?.getAllCompany;
			state.total = action.payload?.totalCompanyCount?._count?.id;
		});

		builder.addCase(loadAllCompanyPaginated.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addSingleCompany  ======

		builder.addCase(addSingleCompany.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addSingleCompany.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addSingleCompany.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSinglCompany ======

		builder.addCase(loadSinglCompany.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSinglCompany.fulfilled, (state, action) => {
			state.loading = false;
			state.company = action.payload?.data;
		});

		builder.addCase(loadSinglCompany.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for company ======

		builder.addCase(updateCompany.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateCompany.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(updateCompany.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteCompany  ======

		builder.addCase(deleteCompany.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteCompany.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteCompany.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
		// 4) ====== builders for delete many Company  ======

		builder.addCase(deleteManyCompany.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteManyCompany.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteManyCompany.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default companySlice.reducer;
export const { clearCompany } = companySlice.actions;
