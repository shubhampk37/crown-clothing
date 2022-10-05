import { useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'
import CategoriesPreview from '../categories-preview/categories-preview.component'
import Category from '../category/category.component'
import './shop.styles.scss'
import { fetchCategoriesStart } from '../../store/categories/category.action'
import { useDispatch } from 'react-redux'

const Shop = () =>{
    //categories
    const dispatch = useDispatch();
    useEffect(()=>{
            dispatch(fetchCategoriesStart())
        },[dispatch])
    return(
        <Routes>
            <Route index element={<CategoriesPreview/>} />
            <Route path=':category' element={<Category/>} />
        </Routes>
    )
}

export default Shop;