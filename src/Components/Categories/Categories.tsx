import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../Redux/store.ts";
import {fetchCategories, fetchDelete} from "../../Redux/Slice/CategoriesSlice.ts";
import Spinner from "../Spinner/Spinner.tsx";
import {c} from "vite/dist/node/types.d-aGj9QkWt";

const Categories = () => {
    const dispatch:AppDispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);
    const loading = useSelector(state => state.categories.loading);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [fetchCategories]);

    const Delete = (id:string) => {
        console.log(id)
        dispatch(fetchDelete(id));
        dispatch((fetchCategories()));
    }
    return (
        <>
          <div className="d-flex mt-5">
              <h3>Categories</h3>
              <Link to="/add-category" className="btn btn-success ms-auto">Add</Link>
          </div>
           <div className="mt-5">
               {loading ? <Spinner/> : (
                   categories.map(category => (
                       <div key={category.id} className="border mb-3">
                           <div className="body-category d-flex align-items-center p-3">
                               <p className="m-0 text-primary">{category.category.name}</p>
                               <p className="ms-auto m-0">{category.category.type}</p>
                               <Link to={`/edit-category/${category.id}`} className="btn btn-success ms-4 me-2">Edit</Link>
                               <button type="button" className="btn btn-danger" onClick={() => {Delete(category.id)}}>Delete</button>
                           </div>
                       </div>
                   ))
               )}
           </div>
        </>
    );
};

export default Categories;