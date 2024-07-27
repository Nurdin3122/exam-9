import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../Components/Spinner/Spinner.tsx";
import {AppDispatch, RootState} from "../../Redux/store.ts";
import {fetchDeleteT, fetchTransactions} from "../../Redux/Slice/TransactionsSlice.ts";
import dayjs from "dayjs";
import {Link} from "react-router-dom";


const Home = () => {
    const dispatch:AppDispatch = useDispatch()
    const transactions = useSelector((state:RootState) => state.transactions.transactions);
    const loading = useSelector(state => state.transactions.loading);

    useEffect(() => {
        dispatch(fetchTransactions())
    }, [dispatch]);

    const Delete = async (id:string) => {
        if (window.confirm('Are you sure you want to delete this transaction?')){
            await dispatch(fetchDeleteT(id));
            await dispatch(fetchTransactions);
        }
    };

    const totalAmount = transactions.reduce((acc, transaction) => {
        return acc + transaction.transaction.amount * (transaction.transaction.type === 'income' ? 1 : -1);
    }, 0);

    return (
        <>
            <div>
                <h2>Total: {totalAmount} KGS</h2>
            </div>

            {loading ? <Spinner/> : (
                transactions.map(transaction => (
                    <div key={transaction.id} className="block-transactions border mt-3">
                        <div className="block-body-transactions p-4 d-flex align-items-center">
                            <span>{dayjs(transaction.transaction.createdAt).format('DD.MM.YYYY HH:mm:ss')}</span>
                            <span className="ms-auto">{transaction.transaction.type === 'income' ? '+' : '-'}{transaction.transaction.amount} KGS</span>
                            <div className="block-btn-transactions ms-4">
                                <button onClick={() => Delete(transaction.id)} className="btn btn-danger me-3">
                                    Delete
                                </button>
                                <Link to="/edit-add" className="btn btn-primary">Edit</Link>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </>
    );
};

export default Home;