import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import queryGenerator from "../../../../../utils/queryGenerator";

const initialState = {
	list: [],
	note: null,
	error: "",
	total: null,
	loading: false,
};

// ADD_note
export const addSingleNote = createAsyncThunk(
	"note/addSingleNote ",
	async (values) => {
		try {
			const { data } = await axios({
				method: "post",
				url: `note`,
				data: {
					...values,
				},
			});
			toast.success("Note Added");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding note try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

// DELETE_note
export const deleteNote = createAsyncThunk("note/deleteNote ", async (id) => {
	try {
		const resp = await axios({
			method: "patch",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			url: `note/${id}`,
			data: {
				status: false,
			},
		});

		toast.success("Note Deleted");
		return {
			data: resp.data.id,
			message: "success",
		};
	} catch (error) {
		toast.error("Error in deleting note try again");
		console.log(error.message);
	}
});

// DELETE Many_note
export const deleteManyNote = createAsyncThunk(
	"note/deleteManyNote ",
	async (data) => {
		try {
			const resp = await axios({
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `note?query=deletemany`,
				data: data,
			});

			toast.success("Notes Deleted");
			return {
				data: resp.data.id,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in deleting notes, try again");
			console.log(error.message);
		}
	}
);

// note_DETAILS
export const loadSingleNote = createAsyncThunk(
	"note/loadSingleNote",
	async (id) => {
		try {
			const data = await axios.get(`note/${id}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

// noteS
export const loadAllNote = createAsyncThunk("note/loadAllNote", async () => {
	try {
		const { data } = await axios.get(`note?query=all`);
		return data;
	} catch (error) {
		console.log(error.message);
	}
});

// loadAllNote paginated
export const loadAllNotePaginated = createAsyncThunk(
	"note/loadAllNotePaginated",
	async (arg) => {
		try {
			const query = queryGenerator(arg);
			const { data } = await axios.get(`note?${query}`);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	}
);

export const updateNote = createAsyncThunk(
	"note/updateNote",
	async ({ id, values }) => {
		try {
			const { data } = await axios({
				method: "put",

				url: `note/${id}`,
				data: {
					...values,
				},
			});
			toast.success("note Updated");
			return {
				data,
				message: "success",
			};
		} catch (error) {
			toast.error("Error in updating note try again");
			console.log(error.message);
			return {
				message: "error",
			};
		}
	}
);

const crmNoteSlice = createSlice({
	name: "note",
	initialState,
	reducers: {
		clearNote: (state) => {
			state.note = null;
		},
	},
	extraReducers: (builder) => {
		// 1) ====== builders for loadAllNote ======

		builder.addCase(loadAllNote.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllNote.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload;
		});

		builder.addCase(loadAllNote.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for loadAllNotePaginated ======

		builder.addCase(loadAllNotePaginated.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadAllNotePaginated.fulfilled, (state, action) => {
			state.loading = false;
			state.list = action.payload?.getAllNote;
			state.total = action.payload?.totalNoteCount?._count?.id;
		});

		builder.addCase(loadAllNotePaginated.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 2) ====== builders for addSingleNote  ======

		builder.addCase(addSingleNote.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(addSingleNote.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(addSingleNote.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for loadSingleNote ======

		builder.addCase(loadSingleNote.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(loadSingleNote.fulfilled, (state, action) => {
			state.loading = false;
			state.note = action.payload.data;
		});

		builder.addCase(loadSingleNote.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 3) ====== builders for note ======

		builder.addCase(updateNote.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(updateNote.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(updateNote.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 4) ====== builders for deleteNote  ======

		builder.addCase(deleteNote.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteNote.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteNote.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});

		// 5) ====== builders for deleteManyNote  ======

		builder.addCase(deleteManyNote.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(deleteManyNote.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(deleteManyNote.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default crmNoteSlice.reducer;
export const { clearNote } = crmNoteSlice.actions;
