import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
	list: [],
	permissionList: [],
	role: null,
	error: "",
	loading: false,
};

// ADD_role
export const addRole = createAsyncThunk("role/addRole", async (values) => {
	try {
		const { data } = await axios({
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			url: `role/`,
			data: {
				...values,
			},
		});
		toast.success("role Added");
		return {
			data,
			message: "success",
		};
	} catch (error) {
		toast.error("Error in adding role try again");
		console.log(error.message);
		return {
			message: "error",
		};
	}
});

export const addRolePermission = createAsyncThunk(
	"role/addRolePermission",
	async ({ values }) => {
		try {
			const { data } = await axios({
				method: "post",
				headers: {
					Accept: "*/*",
					"Content-Type": "application/json",
				},
				url: `role-permission`,
				data: {
					...values,
				},
			});
			toast.success("role Added");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding role try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// export const loadPermission = async () => {
//   const { data } = await axios.get(`permission?query=all`);
//   return data;
// };

//loadPermission
export const loadPermission = createAsyncThunk(
	"role/loadPermission",
	async () => {
		try {
			const { data } = await axios.get(`permission?query=all`);
			console.log(data);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// DELETE_role
export const deleteRole = createAsyncThunk("role/deleteRole", async (id) => {
	try {
		const resp = await axios({
			method: "delete",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			url: `role/${id}`,
		});

		toast.success("role Deleted");
		return resp.data.id;
	} catch (error) {
		toast.error("Error in deleting role try again");
		console.log(error.message);
	}
});

// role_DETAILS
export const loadSingleRole = createAsyncThunk(
	"role/loadSingleRole",
	async (id) => {
		try {
			const data = await axios.get(`role/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// roleS
export const loadAllRole = createAsyncThunk("role/loadAllRole", async () => {
	try {
		const { data } = await axios.get(`role?query=all`);
		return data;
	} catch (error) {
		console.log(error.message);
	}
});

export const updateRole = createAsyncThunk(
	"role/updateRole",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `role/${id}`,
				data: {
					...values,
				},
			});
			toast.success("role Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating role try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const roleSlice = createSlice({
	name: "role",
	initialState,
	reducers: {
		clearRole: (state) => {
			state.role = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllRole ======

		builder.addCase(loadAllRole.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllRole.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllRole.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addRole ======

		builder.addCase(addRole.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addRole.fulfilled, (state, action) => {
			state.loading = false;

			if (!Array.isArray(state.list)) {
				state.list = [];
			}
			const list = [...state.list];
			list.push(action.payload);
			state.list = list;
		});

		builder.addCase(addRole.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addRolePermission ======

		builder.addCase(addRolePermission.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addRolePermission.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addRolePermission.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for loadPermission ======

		builder.addCase(loadPermission.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadPermission.fulfilled, (state, action) => {
			state.loading = false;
			state.permissionList = action.payload;
		});

		builder.addCase(loadPermission.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSingleRole ======

		builder.addCase(loadSingleRole.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleRole.fulfilled, (state, action) => {
			state.loading = false;
			state.role = action.payload.data;
		});

		builder.addCase(loadSingleRole.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for updateRole ======

		builder.addCase(updateRole.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateRole.fulfilled, (state, action) => {
			state.loading = false;
			const list = [...state.list];
			const index = list.findIndex(
				(role) => role.id === parseInt(action.payload.data.id)
			);
			list[index] = action.payload.data;
			state.list = list;
		});

		builder.addCase(updateRole.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteRole ======

		builder.addCase(deleteRole.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteRole.fulfilled, (state, action) => {
			state.loading = false;
			const filterrole = state.list.filter(
				(role) => role.id !== parseInt(action.payload) && role
			);
			state.list = filterrole;
		});

		builder.addCase(deleteRole.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default roleSlice.reducer;
export const { clearRole } = roleSlice.actions;
