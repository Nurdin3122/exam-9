import {AppDispatch, RootState} from "../../Redux/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Spinner from "../Spinner/Spinner.tsx";
import React, {useEffect, useState} from "react";
import {Category, TransactionMutation} from "../../type.ts";
import {fetchCategories, fetchPost} from "../../Redux/Slice/CategoriesSlice.ts";
import {fetchTransactions} from "../../Redux/Slice/TransactionsSlice.ts";

const emptyState:TransactionMutation = {
    type:'',
    category:"",
    amount:0,
    createdAt: new Date().toISOString(),
}

interface TransactionFormProps {
    transaction?: TransactionMutation;
    transactionId?: string;
}

const Add:React.FC<TransactionFormProps> = ({transaction,transactionId}) =>  {
    const dispatch:AppDispatch = useDispatch();
    const loading = useSelector(state => state.categories.loading);
    const categories = useSelector((state: RootState) => state.categories.categories);
    const [transactionData, setTransactionData] = useState<TransactionMutation>(transaction || emptyState);
    const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        setFilteredCategories(categories.filter(category => category.category.type === transactionData.type));
    }, [transactionData.type, categories]);


    useEffect(() => {
        if (transaction) {
            setTransactionData(transaction);
        }
    }, [transaction]);

    const changeForm = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
        setTransactionData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    };

    const onFormSubmit = async (event:React.FormEvent) => {
        event.preventDefault();
        dispatch(fetchPost(transactionData))
        dispatch(fetchTransactions());
        navigate("/")
    }

    return (
        <>
            {loading ? <Spinner/> : (
                <form onSubmit={onFormSubmit}>
                    <select className="form-select"
                            aria-label="Default select example"
                            id="type"
                            name="type"
                            required
                            value={transactionData.type}
                        onChange={changeForm}
                    >

                        <option>Choose type</option>
                        <option value="income">income</option>
                        <option value="expense">expense</option>
                    </select>

                    <div className="mb-3 mt-4">
                        <label htmlFor="exampleInputPassword1" className="form-label">Category</label>
                        <select className="form-select"
                                aria-label="Default select example"
                                id="category"
                                name="category"
                                required
                                value={transactionData.category}
                            onChange={changeForm}
                        >
                            <option>Choose Category</option>
                            {filteredCategories.map(category => (
                                <option key={category.id} value={category.id}>{category.category.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Amount</label>
                        <input type="number"
                               className="form-control"
                               id="amount"
                               name="amount"
                               value={transactionData.amount}
                               required
                               onChange={changeForm}
                        />
                        <button type="submit" className="btn btn-primary mt-3">Submit</button>
                    </div>
                </form>
                )}
        </>
    )};
export default Add