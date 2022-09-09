import {useParams} from 'react-router-dom'
import { useState, useEffect, Fragment } from 'react';
import './category.styles.scss';
import ProductCard from '../../components/product-card/product-card.component';
import { useSelector } from 'react-redux';
import {selectCategoriesMap} from '../../store/categories/category.selector'
const Category = ()=>{
    const {category} = useParams();
    console.log('CATEGORY....', category)
    console.log('render/re-rendering category component')
    const categoriesMap = useSelector(selectCategoriesMap);
    console.log('categoriesMap is.....', categoriesMap)
    const [products, setProducts] = useState(categoriesMap[category]);
    useEffect(()=>{
        console.log('effect fired calling setProducts')
        setProducts(categoriesMap[category])
    },[categoriesMap,category])
    return(
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
                {
                    products &&
                    products.map((product)=><ProductCard key={product.id} product={product} />)
                }
            </div>
        </Fragment>
        
    )
}
export default Category