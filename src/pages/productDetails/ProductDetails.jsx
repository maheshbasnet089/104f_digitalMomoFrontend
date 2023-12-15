import { useParams } from "react-router-dom"
import Product from "./component/product/Product"
import Review from "./component/review/Review"

const ProductDetails = () => {
    const {id} = useParams()
    console.log(id)
  return (
    <>
    <Product id={id}/>
    <Review />
    </>
  )
}

export default ProductDetails