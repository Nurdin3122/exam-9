import {ApiCategories, ApiCategory, Category} from "../../type.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";

interface Categories {
    categories:Category[];
    category?:Category | null
    loading:boolean;
    error:boolean;
}

const initialState:Categories = {
    categories:[],
    category:null,
    loading:false,
    error:false,
}

export const fetchCategories = createAsyncThunk<Category[]>(
    "categories/fetchCategories",
    async () => {
        const response = await axiosApi.get<ApiCategories[] | null>(`/categories.json`);
        const categories = Object.keys(response.data).map(id => ({
            ...response.data[id],
            id,
        }));
        return categories ?? [];
    }
);


export const fetchCategory = createAsyncThunk<Category,string>(
    "categories/fetchCategory",
    async (id:string) => {
        const response = await axiosApi.get<ApiCategories | null>(`/categories/${id}.json`);
        if (response.data) {
            return { ...response.data, id};
        } else {
            return console.log("Not find");
        }
    }
)

export const fetchPost = createAsyncThunk(
    "categories/fetchPost",
    async (category:Categories) => {
        const response = await axiosApi.post<ApiCategory | null>('/categories.json',{category});
        return response.data;
    }
);

export const fetchPut = createAsyncThunk(
    "categories/fetchPut",
    async ({id,category}) => {
        const response = await axiosApi.put<ApiCategory | null>(`/categories/${id}.json`, {category});
        return response.data;
    }
);


export const fetchDelete = createAsyncThunk<string,string>(
    "categories/fetchDelete",
    async (id:string) => {
        await axiosApi.delete(`/categories/${id}.json`);
        return id;
    }
)

const CategoriesSlice = createSlice<Categories>({
    name:"categories",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(fetchCategories.pending,(state) => {
            state.loading = true;
            state.error = false
        });
        builder.addCase(fetchCategories.fulfilled,(state,action:PayloadAction<Category[]>) => {
            state.loading = false;
            state.categories = action.payload
        });
        builder.addCase(fetchCategories.rejected,(state) => {
            state.loading = false;
            state.error = true
        });

        builder.addCase(fetchCategory.pending,(state) => {
            state.loading = true;
            state.error = false
        });
        builder.addCase(fetchCategory.fulfilled,(state,action:PayloadAction<Category>) => {
            state.loading = false;
            state.category = action.payload
        });
        builder.addCase(fetchCategory.rejected,(state) => {
            state.loading = false;
            state.error = true
        });

        builder.addCase(fetchPost.pending,(state) => {
                state.loading = true;
                state.error = false
            });
        builder.addCase(fetchPost.fulfilled,(state,action:PayloadAction<Category>) => {
                state.loading = false;
                state.category = action.payload
            });
        builder.addCase(fetchPost.rejected,(state) => {
                state.loading = false;
                state.error = true
            });

        builder.addCase(fetchPut.pending,(state) => {
            state.loading = true;
            state.error = false
        });
        builder.addCase(fetchPut.fulfilled,(state,action:PayloadAction<Category>) => {
            state.loading = false;
            state.category = action.payload
        });
        builder.addCase(fetchPut.rejected,(state) => {
            state.loading = false;
            state.error = true
        });

        builder.addCase(fetchDelete.pending,(state) => {
                state.loading = true;
                state.error = false
            });
        builder.addCase(fetchDelete.fulfilled,(state,action:PayloadAction<string>) => {
                state.loading = false;
                state.categories = state.categories.filter(category => category.id !== action.payload);
            });
        builder.addCase(fetchDelete.rejected,(state) => {
                state.loading = false;
                state.error = true
            });
    }
})

export const CategoriesReducer = CategoriesSlice.reducer;