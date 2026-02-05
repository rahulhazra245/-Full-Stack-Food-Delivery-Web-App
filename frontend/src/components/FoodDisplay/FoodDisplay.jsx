import React, { useContext } from 'react';
import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from '../../Context/StoreContext';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className='food-display-list'>
        {food_list
          .filter(item => category === 'All' || item.category === category)
          .map(item => (
          <FoodItem
  key={item._id}
  image={item.image}
  name={item.name}
  desc={item.description}
  price={item.price}
  id={item._id}
  isLocal={item.isLocal} // ✅ IMPORTANT
/>

        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
