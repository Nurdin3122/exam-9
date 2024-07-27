import {AppDispatch} from "../../../Redux/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {CategoryMutation} from "../../../type.ts";
import {Simulate} from "react-dom/test-utils";
import select = Simulate.select;
import Spinner from "../../Spinner/Spinner.tsx";
import {fetchCategories, fetchCategory, fetchPost, fetchPut} from "../../../Redux/Slice/CategoriesSlice.ts";

const emptyState:CategoryMutation = {
    name:"",
    type:"",
}

const EditCategory = () => {
    const {id} = useParams()
    const dispatch:AppDispatch = useDispatch();
    const category = useSelector(state => state.categories.category);
    const loading = useSelector(state => state.categories.loading);
    const navigate = useNavigate();
    const [newCategories, setNewCategories] = useState<CategoryMutation>(emptyState);

    useEffect(() => {
        if (id) {
            dispatch(fetchCategory(id));
        }
    }, [id]);

    useEffect(() => {
        if (category) {
            setNewCategories({ ...category.category });
        }
    }, [category]);

    const onFormSubmit = async (event:React.FormEvent) => {
        event.preventDefault();
        await dispatch(fetchPut({id,category:newCategories}));
        await dispatch(fetchCategories());
        navigate('/categories');
    }

    const changeForm = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setNewCategories((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    return (
        <>
            {loading ? <Spinner/> : (
                <form onSubmit={onFormSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
                        <input type="text"
                               className="form-control"
                               id="name" name="name"
                               required
                               value={newCategories.name}
                               onChange={changeForm}
                        />
                    </div>

                    <select className="form-select"
                            aria-label="Default select example"
                            name="type"
                            required
                            value={newCategories.type}
                            onChange={changeForm}>

                        <option>Choose type</option>
                        <option>income</option>
                        <option>expense</option>
                    </select>

                    <button type="submit" className="btn btn-primary mt-3">Submit</button>
                </form>
            )}

        </>
    );
};

export default EditCategory;