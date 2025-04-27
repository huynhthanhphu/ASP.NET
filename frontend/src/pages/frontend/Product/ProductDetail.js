import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../../../services/ProductService';
import ProductItem from '../../../components/ProductItem';
import {
  ShoppingCartIcon,
  ShoppingBagIcon,
  MinusIcon,
  PlusIcon,
  StarIcon as StarSolidIcon
} from '@heroicons/react/24/solid';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    ProductService.productDetail(id, 4)
      .then((response) => {
        if (response.status) {
          setProduct(response.product);
          setRelatedProducts(response.relatedProducts);
        } else {
          console.error("Error:", response.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [id]);

  useEffect(() => {
    const loadFacebookSDK = () => {
      if (window.FB) return;

      const script = document.createElement('script');
      script.src = `https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v21.0&appId=561247666316046&autoLogAppEvents=1`;
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.onload = () => {
        if (window.FB) {
          window.FB.init({
            appId: '561247666316046',
            xfbml: true,
            version: 'v21.0'
          });
        }
      };
      document.body.appendChild(script);
    };

    loadFacebookSDK();
  }, []);

  if (!product) return <p>Loading...</p>;

  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Vui lòng chọn kích thước');
      return;
    }

    const cartItem = {
      id: product.id,  // Thay 'Id' thành 'id' để khớp với mô hình C#
      name: product.name,  // Thay 'Name' thành 'name'
      image: product.imageUrl || '/path/to/default-image.jpg',  // Thay 'ImageUrl' thành 'imageUrl'
      price: product.salePrice || product.price,  // Thay 'SalePrice' thành 'salePrice' và 'Price' thành 'price'
      size: selectedSize,
      quantity
    };

    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = currentCart.findIndex(
      (item) => item.id === cartItem.id && item.size === cartItem.size
    );

    if (itemIndex >= 0) {
      currentCart[itemIndex].quantity += quantity;
    } else {
      currentCart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(currentCart));
    alert('Đã thêm sản phẩm vào giỏ hàng');
    window.location.reload();
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 mt-8 mb-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-4">
          <img
            src={product.imageUrl || '/path/to/default-image.jpg'}  // Thay 'imageUrl' thành 'imageUrl'
            alt={product.name}  // Thay 'name' thành 'name'
            className="w-full h-[610px] rounded-lg shadow-lg object-cover"
          />
        </div>
        <div className="md:w-1/2 p-4 flex flex-col">
          <h1 className="text-3xl font-semibold mb-2" style={{ fontFamily: 'Dancing Script' }}>{product.name}</h1> 
          <p className="text-gray-500 mb-4">{product.category.name} | {product.brand.name}</p> {/* Thay 'Category.Name' thành 'category.name' và 'Brand.Name' thành 'brand.name' */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarSolidIcon
                  key={star}
                  className={`h-5 w-5 ${star <= Math.round(product.averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}  // Thay 'AverageRating' thành 'averageRating'
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {product.totalReviews > 0 ? `${product.totalReviews} lượt đánh giá | ${product.averageRating.toFixed(1)} sao` : 'Chưa có đánh giá'}  {/* Thay 'TotalReviews' thành 'totalReviews' và 'AverageRating' thành 'averageRating' */}
            </span>
          </div>
          <div className="flex items-center mb-4">
            {product.salePrice ? (
              <>
                <span className="text-2xl font-bold text-red-500 mr-4">{formatCurrency(product.salePrice)}<sup>đ</sup></span>  {/* Thay 'SalePrice' thành 'salePrice' */}
                <span className="line-through text-gray-400">{formatCurrency(product.price)}<sup>đ</sup></span>  {/* Thay 'Price' thành 'price' */}
                <span className="ml-2 bg-red-100 text-red-500 px-2 py-1 rounded text-sm">
                  -{Math.round((1 - product.salePrice / product.price) * 100)}%
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-red-500">{formatCurrency(product.price)}<sup>đ</sup></span>
            )}
          </div>

          <div className="mb-6 mt-[264px] flex items-center">
            <div className="text-gray-700 mr-6 w-20">Kích thước</div>
            <div className="flex gap-4">
              {['M', 'L', 'XL', 'XXL'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[48px] h-12 px-4 rounded border ${selectedSize === size ? 'border-red-500 text-red-500' : 'border-gray-300 text-gray-700'} hover:border-red-500 hover:text-red-500 transition-colors`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-6 flex items-center">
            <div className="text-gray-700 mr-6 w-20">Số lượng</div>
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l hover:bg-gray-100"
                disabled={quantity <= 1}
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 h-8 text-center border-t border-b border-gray-300 focus:outline-none appearance-none"
              />
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r hover:bg-gray-100"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex gap-4 mt-auto">
            <button
              className="flex-1 flex items-center justify-center bg-gray-100 border border-red-500 text-red-500 px-6 py-3 rounded-lg hover:bg-red-50 transition-colors"
              onClick={handleAddToCart}
            >
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              Thêm vào giỏ
            </button>
            <button className="flex-1 flex items-center justify-center bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors">
              <ShoppingBagIcon className="h-5 w-5 mr-2" />
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      {/* Facebook Comments Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Bình luận</h2>
        <div
          className="fb-comments"
          data-href={window.location.href}
          data-width="100%"
          data-numposts="5"
          data-order-by="reverse_time"
        ></div>
      </div>

      {/* Related Products Section */}
      <div className="mt-12">
        <h1 className="text-3xl font-semibold mb-4" style={{ fontFamily: 'Dancing Script' }}>Sản phẩm liên quan</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="border rounded-lg p-4">  {/* Thay 'Id' thành 'id' */}
              <ProductItem product={relatedProduct} />
            </div>
          ))}
        </div>
      </div>
      {/* Product Description Section */}
      <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="font-semibold mb-4 text-3xl" style={{ fontFamily: 'Dancing Script' }}>Mô tả sản phẩm</h2>
        <p className="text-gray-700 leading-relaxed">{product.description || "Không có mô tả cho sản phẩm này."}</p>  {/* Thay 'Description' thành 'description' */}
      </div>
    </div>
  );
};

export default ProductDetail;
