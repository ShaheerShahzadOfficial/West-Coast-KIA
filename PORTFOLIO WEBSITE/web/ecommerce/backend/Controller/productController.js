
import Product from "../model/ProductModel.js"
import ErrorHandler from "../utils/errorhandler.js";
import ApiFeature from "../utils/apiFeature.js";


//// CREATE NEW PRODUCT  --ADMIN

const createProduct = async (req, res, next) => {
    req.body.User = req.user.id
    const product = await Product.create(req.body).then((result) => {
        res.status(201).json({
            success: true,
            product: result
        })
    }).catch((err) => {
        res.status(500).json({
            err: err.message
        })
    });



}






//// GET ALL PRODUCT 

const getAllProduct = async (req, res) => {

    const resultPerPage = 8
    const productsCount = await Product.countDocuments()

    const apiFeature = new ApiFeature(Product.find(), req.query)
        .search()
        .filter()
    // .pagination(resultPerPage)

    let products = await apiFeature.query

    let filteredProductCount = products.length

    apiFeature.pagination(resultPerPage)

    products = await apiFeature.query.clone()

    // const products = await apiFeature.query

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductCount
    })
}



////UPDATE PRODUCT --ADMIN

const updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidator: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        product
    })

}


////DELETE PRODUCT --ADMIN


const deleteProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }

    await product.remove()
    res.status(200).json({
        success: true,
        msg: "product is deleted successfully"
    })

}



const oneProductDetail = async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }

    res.status(200).json({
        success: true,
        product
    })

}


const CreateProductReview = async (req, res, next) => {

    let { rating, comment, productId } = req.body

    const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId)

    const isReviewed = product.Review.find(
        (rev) => rev.user.toString() === req.user.id
    )

    if (isReviewed) {
        product.Review.forEach((rev) => {
            if (rev.user.toString() === req.user.id)
                (rev.rating = rating), (rev.comment = comment)
        })

    } else {
        product.Review.push(review)
        product.NumOfReview = product.Review.length
    }
    let avg = 0
    product.Review.forEach(rev => {
        avg += rev.rating
    });

    product.Ratings = avg / product.Review.length

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true
    })

}


const getProductReviews = async (req, res, next) => {

    const product = await Product.findById(req.query.id)

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }


    res.status(200).json({
        success: true,
        Review: product.Review
    })

}


const DeleteProductReview = async (req, res, next) => {

    const product = await Product.findById(req.query.productId)

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }

    const reviews = product.Review.filter(rev => rev._id.toString() !== req.query.id.toString())


    let avg = 0
    reviews.forEach(rev => {
        avg += rev.rating
    });

    const Ratings = product.Ratings = avg / reviews.length

    const NumOfReview = reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        Review: reviews,
        Ratings,
        NumOfReview
    },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        }
    )

    res.status(200).json({
        success: true,
    })

}


export { getAllProduct, createProduct, updateProduct, deleteProduct, oneProductDetail, CreateProductReview, getProductReviews, DeleteProductReview }  