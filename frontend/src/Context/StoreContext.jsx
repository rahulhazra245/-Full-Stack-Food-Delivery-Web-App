import { createContext, useEffect, useState } from "react";
import { food_list as asset_food_list, menu_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = "https://food-del-backend-w602.onrender.com";
    const [food_list, setFoodList] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const currency = "₹";
    const deliveryCharge = 50;

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId: itemId.replace("backend-", "") }, {
                headers: { token }
            });
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId: itemId.replace("backend-", "") }, {
                headers: { token }
            });
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };



const fetchFoodList = async () => {
  try {
    const response = await axios.get(url + "/api/food/list");
    const backendFoodList = response.data.data;

    const updatedBackendFoodList = backendFoodList.map((item) => ({
      ...item,
      _id: `backend-${item._id}`, // distinguish backend items
      isLocal: false              // ✅ Needed for correct image src
    }));

    const updatedStaticFoodList = asset_food_list.map((item) => ({
      ...item,
      _id: `local-${item._id}`,   // distinguish local items
      isLocal: true               // ✅ Needed for correct image src
    }));

    setFoodList([...updatedStaticFoodList, ...updatedBackendFoodList]);
  } catch (err) {
    console.error("Failed to fetch food list:", err);
  }
};



    const loadCartData = async (tokenObj) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, {
                headers: tokenObj
            });

            // Prefix keys for backend items
            const cartData = {};
            for (const id in response.data.cartData) {
                cartData[`backend-${id}`] = response.data.cartData[id];
            }

            setCartItems(cartData);
        } catch (err) {
            console.error("Error loading cart data:", err);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchFoodList();

            const savedToken = localStorage.getItem("token");
            if (savedToken) {
                setToken(savedToken);
                await loadCartData({ token: savedToken });
            }
        };

        loadData();
    }, []);

    const contextValue = {
        url,
        food_list,
        menu_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        loadCartData,
        setCartItems,
        currency,
        deliveryCharge
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
