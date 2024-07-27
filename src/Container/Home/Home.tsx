import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../Components/Spinner/Spinner.tsx";
import {AppDispatch} from "../../Redux/store.ts";
import {fetchTransactions} from "../../Redux/Slice/TransactionsSlice.ts";


const Home = () => {
    const dispatch:AppDispatch = useDispatch()
    const transactions = useSelector(state => state.transactions.transactions);
    console.log(transactions)
    const loading = useSelector(state => state.transactions.loading);

    useEffect(() => {
        dispatch(fetchTransactions())
    }, [fetchTransactions]);
    return (
        <>
            {loading ? <Spinner/> : (
                transactions.map(transaction => (
                    <div key={transaction.id} className="block-transactions border">
                        <div className="block-body-transactions">
                            <p>{transaction.category.type}</p>
                            <p>{transaction.category.createdAt}</p>
                        </div>
                    </div>
                ))
            )}
        </>
    );
};

export default Home;