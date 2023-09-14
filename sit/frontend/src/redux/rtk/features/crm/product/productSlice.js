import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  list: [],
  product: null,
  error: "",
  total: null,
  loading: false,
};

// ADD_product
export const addSingleProduct = createAsyncThunk(
  "product/addSingleProduct",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        url: `product/`,
        data: {
          ...values,
        },
      });
      toast.success("Product Added");
      return {
        data,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in adding product try again");
      console.log(error.message);
      return {
        message: "error",
      };
    }
  }
);

// DELETE_product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct ",
  async (id, api) => {
    try {
      const resp = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `product/${id}`,
      });
      api.dispatch(loadAllProduct());
      toast.success("Product Deleted");
      return {
        data: resp.data.id,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in deleting product try again");
      console.log(error.message);
    }
  }
);

// product_DETAILS
export const loadSingleProduct = createAsyncThunk(
  "product/loadSingleProduct",
  async (id) => {
    try {
      const data = await axios.get(`product/${id}`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// productS
export const loadAllProduct = createAsyncThunk(
  "product/loadAllProduct",
  async () => {
    try {
      const { data } = await axios.get(`product?query=all`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// loadAllProduct paginated
export const loadAllProductPaginated = createAsyncThunk(
  "product/loadAllProductPaginated",
  async ({ page, count, status }) => {
    try {
      const { data } = await axios.get(
        `product?status=${status}&page=${page}&count=${count}`
      );
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",

        url: `product/${id}`,
        data: {
          ...values,
        },
      });
      toast.success("Product Updated");
      return {
        data,
        message: "success",
      };
    } catch (error) {
      toast.error("Error in updating product try again");
      console.log(error.message);
      return {
        message: "error",
      };
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllProduct ======

    builder.addCase(loadAllProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });

    builder.addCase(loadAllProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for loadAllProductPaginated ======

    builder.addCase(loadAllProductPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllProductPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.getAllProduct;
      state.total = action.payload.totalProductCount?._count?.id;
    });

    builder.addCase(loadAllProductPaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addSingleProduct  ======

    builder.addCase(addSingleProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addSingleProduct.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addSingleProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for loadSingleProduct ======

    builder.addCase(loadSingleProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload.data;
    });

    builder.addCase(loadSingleProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for product ======

    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for deleteProduct  ======

    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default productSlice.reducer;
export const { clearProduct } = productSlice.actions;
