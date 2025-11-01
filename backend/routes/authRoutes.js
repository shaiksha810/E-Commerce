import { Router } from "express";
import authController from "../controllers/authController.js";
import authMiddlware from "../middlewares/authMiddlware.js"
import productController from "../controllers/productController.js";
import upload from '../middlewares/upload.js'

const router = Router()


//user routes
router.post('/auth/user/register', 
    authController.userRegister
)

router.post('/auth/user/login', 
    authController.userLogin
)

router.get('/auth/user/profile',
    authMiddlware.protect,
    authController.userProfile
)

router.get('/auth/user/logout',
    authMiddlware.protect,
    authMiddlware.authorize('user', 'admin'),
    authController.userLogout
)





//product routes
router.post('/api/admin/addProducts',
    upload.single('image'),
    authMiddlware.protect,
    authMiddlware.authorize('admin'),
    productController.addProduct
);

router.get('/api/allproducts', 
    productController.getAllProducts
);

router.get('/api/productDetails/:id',
    productController.getProductDetail
);

router.post('/api/addtocart/:id', 
    authMiddlware.protect,
    authMiddlware.authorize('user'), 
    productController.addtocart)


router.get('/api/mycart',
    authMiddlware.protect,
    productController.getCartItems
)    

router.put("/api/update-quantity",
    authMiddlware.protect,
    productController.updateQuantity
)



export default router;