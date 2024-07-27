import {ApiTransaction, ApiTransactions, Transaction} from "../../type.ts";
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
        const response = await axiosApi.get<ApiTransactions[] | null>(`/transactions.json`);
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
        const response = await axiosApi.get<ApiTransaction | null>(`/transactions/${id}.json`);
        if (response.data) {
            return { ...response.data, id};
        } else {
            return console.log("Not find");
        }
    }
);

export const fetchPostT = createAsyncThunk<ApiTransaction | null, Transaction>(
    "transactions/fetchPost",
    async (transaction:Transaction) => {
        const response = await axiosApi.post<ApiTransaction | null>(`/transactions.json`,{transaction});
        if (response.data) {
            const id = response.data.name;
            return { ...transaction, id };
        } else {
            throw new Error("Not find");
        }
    }
);


export const fetchDeleteT = createAsyncThunk<string,string>(
    "transactions/fetchDelete",
    async (id:string) => {
        await axiosApi.delete(`/transactions/${id}.json`);
        return id;
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


        builder.addCase(fetchPostT.pending, (state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(fetchPostT.fulfilled, (state, action: PayloadAction<Transaction>) => {
            state.loading = false;
            state.transaction = action.payload;
        });
        builder.addCase(fetchPostT.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });


        builder.addCase(fetchDeleteT.pending,(state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(fetchDeleteT.fulfilled,(state,action:PayloadAction<string>) => {
            state.loading = false;
            state.transactions = state.transactions.filter(transaction => transaction.id !== action.payload);
        });
        builder.addCase(fetchDeleteT.rejected,(state) => {
            state.loading = false;
            state.error = true;
        });


    }
})

export const TransactionsReducer = TransactionsSlice.reducer