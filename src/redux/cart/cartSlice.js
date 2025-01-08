import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    error: null,
    loading: false,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const item = action.payload;

            if (!item || !item._id || !item.weight || (!item.availableWeights && !item.price)) {
                console.error("Invalid item payload:", item);
                return;
            }

            const existingItem = state.cartItems.find(
                (cartItem) => cartItem._id === item._id && cartItem.weight === item.weight
            );

            if (existingItem) {
                existingItem.quantity += item.quantity || 1;
            } else {
                if (item.availableWeights) {
                    const weightData = item.availableWeights.find(
                        (w) => w.weight === item.weight
                    );

                    if (weightData) {
                        state.cartItems.push({
                            _id: item._id,
                            name: item.name,
                            roastLevel: item.roastLevel,
                            image: item.image,
                            quantity: item.quantity || 1,
                            weight: item.weight,
                            price: weightData.price,
                        });
                    } else {
                        console.error("Selected weight not found in availableWeights:", item);
                    }
                } else {
                    state.cartItems.push({
                        _id: item._id,
                        name: item.name,
                        roastLevel: item.roastLevel,
                        image: item.image,
                        quantity: item.quantity || 1,
                        weight: item.weight,
                        price: item.price,
                    });
                }
            }
        },

        removeItemFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (cartItem) => cartItem._id !== action.payload
            );
        },
        increaseQty: (state, action) => {
            const item = state.cartItems.find((cartItem) => cartItem._id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decreaseQty: (state, action) => {
            const item = state.cartItems.find((cartItem) => cartItem._id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
    },
});

export const { addItemToCart, removeItemFromCart, increaseQty, decreaseQty, clearCart } =
    cartSlice.actions;

export default cartSlice.reducer;
