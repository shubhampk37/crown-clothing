import { createContext, useEffect, useState } from "react";

// import SHOP_DATA from '../shop-data.js';
import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
    categoriesMap: {},
})

export const CategoriesProvider = ({children})=>{
    const [categoriesMap, setCategoriesMap] = useState({});
    // useEffect(()=>{ addCollectionAndDocuments('categories', SHOP_DATA)}, [])
    useEffect(()=>{
        const getCatgoriesMap = async ()=>{
            const categoryMap = await getCategoriesAndDocuments()
            setCategoriesMap(categoryMap)
        }
        getCatgoriesMap()
    },[])
    const value= {categoriesMap};
    return(
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}