import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ image, name, price, desc, id, isLocal }) => {
  const { cartItems, addToCart, removeFromCart, url, currency } = useContext(StoreContext);

  if (!cartItems) {
    return null;
  }

  return (
    <div className='food-item'>
      <div className='food-item-img-container'>
        <img
          className='food-item-image'
          src={isLocal ? assets[image] : `${url}/images/${image}`} // ✅ Load correctly
          alt={name}
        />

        {cartItems?.[id] > 0 ? (
          <div className="food-item-counter">
            <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)} alt="Remove" />
            <p>{cartItems[id]}</p>
            <img src={assets.add_icon_green} onClick={() => addToCart(id)} alt="Add" />
          </div>
        ) : (
          <img
            className='add'
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add to cart"
          />
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{desc}</p>
        <p className="food-item-price">{currency}{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
