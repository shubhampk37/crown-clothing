import {useParams} from 'react-router-dom'
import { useState, useEffect, Fragment } from 'react';
import './category.styles.jsx';
import ProductCard from '../../components/product-card/product-card.component';
import { useSelector } from 'react-redux';
import {selectCategoriesIsLoading, selectCategoriesMap} from '../../store/categories/category.selector'
import Spinner from '../../components/spinner/spinner.component'
import { CategoryContainer, Title } from './category.styles.jsx';
const Category = ()=>{
    const {category} = useParams();
    console.log('CATEGORY....', category)
    console.log('render/re-rendering category component')
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading)
    const [products, setProducts] = useState(categoriesMap[category]);
    useEffect(()=>{
        setProducts(categoriesMap[category])
    },[categoriesMap,category])
    return(
        <Fragment>
            <Title>{category.toUpperCase()}</Title>
            {
                isLoading ? 

                (<Spinner/>) :
                (<CategoryContainer>
                    {
                        products &&
                        products.map((product)=><ProductCard key={product.id} product={product} />)
                    }
                </CategoryContainer>)
                
            }
            
        </Fragment>
        
    )
}
export default Category