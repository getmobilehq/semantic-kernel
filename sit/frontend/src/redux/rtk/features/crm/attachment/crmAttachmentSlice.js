import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import queryGenerator from "../../../../../utils/queryGenerator";

const initialState = {
	list: [],
	attachment: null,
	error: "",
	total: null,
	loading: false,
};

// ADD_attachment
export const addSingleAttachment = createAsyncThunk(
	"attachment/addSingleAttachment ",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				url: `attachment`,
				headers: {
					"Content-Type": "multipart/form-data",
				},
				data: values,
			});
			toast.success("Attachment Added");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding attachment try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// DELETE_attachment
export const deleteAttachment = createAsyncThunk(
	"attachment/deleteAttachment ",
	async (id) => {
		try {
			const resp = await axios({
				method: "patch",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `attachment/${id}`,
				data: {
					status: false,
				},
			});

			toast.success("Attachment Deleted");
			return {
				data: resp.data.id,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting attachment try again");
			console.log(error.message);
		}
	}
);

// DELETE Many_attachment
export const deleteManyAttachment = createAsyncThunk(
	"attachment/deleteManyAttachment ",
	async (data) => {
		try {
			const resp = await axios({
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `attachment?query=deletemany`,
				data: data,
			});

			toast.success("Attachments Deleted");
			return {
				data: resp.data.id,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting attachments, try again");
			console.log(error.message);
		}
	}
);

// attachment_DETAILS
export const loadSingleAttachment = createAsyncThunk(
	"attachment/loadSingleAttachment",
	async (id) => {
		try {
			const data = await axios.get(`attachment/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// attachmentS
export const loadAllAttachment = createAsyncThunk(
	"attachment/loadAllAttachment",
	async () => {
		try {
			const { data } = await axios.get(`attachment?query=all`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// loadAllAttachment paginated
export const loadAllAttachmentPaginated = createAsyncThunk(
	"attachment/loadAllAttachmentPaginated",
	async (arg) => {
		try {
			const query = queryGenerator(arg);
			const { data } = await axios.get(`attachment?${query}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const updateAttachment = createAsyncThunk(
	"attachment/updateAttachment",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `attachment/${id}`,
				data: {
					...values,
				},
			});
			toast.success("attachment Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating attachment try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const crmAttachmentSlice = createSlice({
	name: "attachment",
	initialState,
	reducers: {
		clearAttachment: (state) => {
			state.attachment = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllAttachment ======

		builder.addCase(loadAllAttachment.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllAttachment.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllAttachment.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for loadAllAttachmentPaginated ======

		builder.addCase(loadAllAttachmentPaginated.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllAttachmentPaginated.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload?.getAllAttachment;
			state.total = action.payload?.totalAttachmentCount?._count?.id;
		});

		builder.addCase(loadAllAttachmentPaginated.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addSingleAttachment  ======

		builder.addCase(addSingleAttachment.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addSingleAttachment.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addSingleAttachment.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSingleAttachment ======

		builder.addCase(loadSingleAttachment.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleAttachment.fulfilled, (state, action) => {
			state.loading = false;
			state.attachment = action.payload.data;
		});

		builder.addCase(loadSingleAttachment.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for attachment ======

		builder.addCase(updateAttachment.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateAttachment.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(updateAttachment.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteAttachment  ======

		builder.addCase(deleteAttachment.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteAttachment.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteAttachment.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 5) ====== builders for deleteManyAttachment  ======

		builder.addCase(deleteManyAttachment.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteManyAttachment.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteManyAttachment.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default crmAttachmentSlice.reducer;
export const { clearAttachment } = crmAttachmentSlice.actions;
