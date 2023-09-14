import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import queryGenerator from "../../../../../utils/queryGenerator";

const initialState = {
	list: [],
	customer: null,
	error: "",
	total: null,
	loading: false,
};

// ADD_customer
export const addSingleCustomer = createAsyncThunk(
	"customer/addSingleCustomer ",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				url: `customer/`,
				data: values,
			});
			toast.success("Customer Added");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding customer try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// DELETE_customer
export const deleteCustomer = createAsyncThunk(
	"customer/deleteCustomer ",
	async (id) => {
		try {
			const resp = await axios({
				method: "patch",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `customer/${id}`,
				data: {
					status: false,
				},
			});

			toast.success("customer Deleted");
			return {
				data: resp.data.id,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting customer try again");
			console.log(error.message);
		}
	}
);

// DELETE Many_customer
export const deleteManyCustomer = createAsyncThunk(
	"customer/deleteManyCustomer ",
	async (data) => {
		try {
			const resp = await axios({
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `customer?query=deletemany`,
				data: data,
			});

			toast.success("Customer Deleted");
			return {
				data: resp.data.id,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting customer, try again");
			console.log(error.message);
		}
	}
);

// customer_DETAILS
export const loadSingleCustomer = createAsyncThunk(
	"customer/loadSingleCustomer",
	async (id) => {
		try {
			const data = await axios.get(`customer/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// customerS
export const loadAllCustomer = createAsyncThunk(
	"customer/loadAllCustomer",
	async () => {
		try {
			const { data } = await axios.get(`customer/`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

//load all customer by customer id

export const updateCustomer = createAsyncThunk(
	"customer/updateCustomer",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `customer/${id}`,
				data: {
					...values,
				},
			});
			toast.success("Account Details Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating customer try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const customerSlice = createSlice({
	name: "customer",
	initialState,
	reducers: {
		clearCustomer: (state) => {
			state.customer = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllCustomer ======

		builder.addCase(loadAllCustomer.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllCustomer.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllCustomer.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addSingleCustomer  ======

		builder.addCase(addSingleCustomer.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addSingleCustomer.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addSingleCustomer.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSingleCustomer ======

		builder.addCase(loadSingleCustomer.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleCustomer.fulfilled, (state, action) => {
			state.loading = false;
			state.customer = action.payload.data;
		});

		builder.addCase(loadSingleCustomer.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for customer ======

		builder.addCase(updateCustomer.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateCustomer.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(updateCustomer.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteCustomer  ======

		builder.addCase(deleteCustomer.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteCustomer.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteCustomer.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 5) ====== builders for deleteManyCustomer  ======

		builder.addCase(deleteManyCustomer.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteManyCustomer.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteManyCustomer.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default customerSlice.reducer;
export const { clearCustomer } = customerSlice.actions;
