import { useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'
import CategoriesPreview from '../categories-preview/categories-preview.component'
import Category from '../category/category.component'
import './shop.styles.scss'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'
import { setCategories} from '../../store/categories/category.action'
import { useDispatch } from 'react-redux'
import SHOP_DATA from '../../shop-data'
const Shop = () =>{
    //categories
    const dispatch = useDispatch();
    useEffect(()=>{
        const getCatgoriesMap = async ()=>{
            //const categoriesArray = await getCategoriesAndDocuments('categories')
            const categoriesArray = SHOP_DATA;
            dispatch(setCategories(categoriesArray))
        }
        getCatgoriesMap()
    },[dispatch])
    return(
        <Routes>
            <Route index element={<CategoriesPreview/>} />
            <Route path=':category' element={<Category/>} />
        </Routes>
    )
}

export default Shop;