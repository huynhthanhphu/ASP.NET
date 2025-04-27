import React from 'react';
import { Star, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
  if (!product) return <div>Loading...</div>;

  const discountPercent = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const getLabel = () => {
    if (product.salePrice) return 'Sale';
    if (product.quantity > 100) return 'Hot';
    if (product.createdAt) return 'New';
    return null;
  };

  const label = getLabel();
  const imageUrl = product.imageUrl || '/images/product/default.jpg';

  return (
    <div className="product-item flex flex-col h-full ">
      <div className="relative h-96 overflow-hidden bg-gray-100 rounded-t-lg">
        {label && (
          <span className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold z-10">
            {label}
          </span>
        )}
        {discountPercent > 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold z-10">
            -{discountPercent}%
          </span>
        )}
        <Link to={`/san-pham/${product.id}`}>
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>

      <div className="flex flex-col justify-between flex-grow p-3">
        <div className="text-sm font-medium text-gray-900 line-clamp-2 min-h-[2.5rem]">
          <Link to={`/san-pham/${product.id}`} className="hover:underline">
            {product.name}
          </Link>
        </div>

        <div className="mt-2 flex justify-between items-center">
          <div>
            <span className="text-red-600 font-bold text-base">
              {(product.salePrice || product.price).toLocaleString()}<sup>đ</sup>
            </span>
            {product.salePrice && (
              <del className="ml-2 text-gray-500 text-sm">
                {product.price.toLocaleString()}<sup>đ</sup>
              </del>
            )}
          </div>

          <div className="flex space-x-2">
            <Star className="w-5 h-5 text-gray-400 hover:text-yellow-400 cursor-pointer" />
            <ShoppingBag className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer" />
          </div>
        </div>

        {product.quantity > 100 && (
          <>
            <div className="text-xs text-gray-500 mt-2">Đã bán {product.quantity} sản phẩm 🔥</div>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
              <div
                className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (product.quantity / 9999) * 100)}%` }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
