import {ApiTransaction,Transaction} from "../../type.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";

interface Transactions {
    transactions:Transaction[];
    transaction?: Transaction| null
    loading:boolean;
    error:boolean;
}

const initialState:Transactions = {
    transactions:[],
    transaction:null,
    loading:false,
    error:false,
}

export const fetchTransactions = createAsyncThunk<Transaction[]>(
    "transactions/fetchTransactions",
    async () => {
        const response = await axiosApi.get<ApiTransaction[] | null>(`/categories.json`);
        const transactions = Object.keys(response.data).map(id => ({
            ...response.data[id],
            id,
        }));
        return transactions ?? [];
    }
);

export const fetchTransaction = createAsyncThunk<Transaction,string>(
    "transactions/fetchTransaction",
    async (id:string) => {
        const response = await axiosApi.get<ApiTransaction | null>(`/categories/${id}.json`);
        if (response.data) {
            return { ...response.data, id};
        } else {
            return console.log("Not find");
        }
    }
);


export const fetchPost = createAsyncThunk(
    "transactions/fetchPost",
    async (transaction:string) => {
        const response = await axiosApi.post<ApiTransaction | null>('/categories.json',{transaction});
        return response.data;
    }
)

const TransactionsSlice = createSlice<Transactions>({
    name:"transactions",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(fetchTransactions.pending,(state) => {
            state.loading = true;
            state.error = false
        });
        builder.addCase(fetchTransactions.fulfilled,(state,action:PayloadAction<Transaction[]>) => {
            state.loading = false;
            state.transactions = action.payload

        });
        builder.addCase(fetchTransactions.rejected,(state) => {
            state.loading = false;
            state.error = true
        });

        builder.addCase(fetchTransaction.pending,(state) => {
            state.loading = true;
            state.error = false
        });
        builder.addCase(fetchTransaction.fulfilled,(state,action:PayloadAction<Transaction>) => {
            state.loading = false;
            state.transaction = action.payload
        });
        builder.addCase(fetchTransaction.rejected,(state) => {
            state.loading = false;
            state.error = true
        });


        builder.addCase(fetchPost.pending, (state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(fetchPost.fulfilled, (state, action: PayloadAction<Transaction>) => {
            state.loading = false;
            state.transaction = action.payload;
        });
        builder.addCase(fetchPost.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });


    }
})

export const TransactionsReducer = TransactionsSlice.reducer