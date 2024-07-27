
import './App.css'
import Loyaut from "./Container/Loyaut/Loyaut.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./Container/Home/Home.tsx";
import Categories from "./Components/Categories/Categories.tsx";
import Add from "./Components/Add/Add.tsx";
import AddCategory from "./Components/Categories/Add-Category/Add-Category.tsx";
import EditCategory from "./Components/Categories/Add-Category/EditCategory.tsx";
import EditAdd from "./Components/Add/EditAdd.tsx";

function App() {
  return (
    <>
        <Loyaut>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/categories" element={<Categories/>}/>
                <Route path="/add" element={<Add/>}/>
                <Route path="/add-category" element={<AddCategory/>}/>
                <Route path="/edit-category/:id" element={<EditCategory/>}/>
                <Route path="/edit-add/:id" element={<EditAdd/>}/>
                <Route path="*" element={<h3 className="text-center">Sorry, there is not such page</h3>}/>
            </Routes>
        </Loyaut>
    </>
  )
}

export default App
