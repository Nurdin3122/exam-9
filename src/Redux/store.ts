import {configureStore} from "@reduxjs/toolkit";
import {CategoriesReducer} from "./Slice/CategoriesSlice.ts";
import {TransactionsReducer} from "./Slice/TransactionsSlice.ts";

export const store = configureStore({

    reducer: {
        categories:CategoriesReducer,
        transactions:TransactionsReducer,
    }

});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;