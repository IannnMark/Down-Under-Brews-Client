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
            const existingItem = state.cartItems.find(
                (cartItem) => cartItem._id === item._id
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                const selectedWeight = item.selectedWeight;
                const weightData = item.availableWeights.find(w => w.weight === selectedWeight);

                if (weightData) {
                    state.cartItems.push({
                        ...item,
                        quantity: 1,
                        price: weightData.price,
                        weight: selectedWeight,
                    });
                } else {
                    console.error("Selected weight not found in availableWeights");
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

export const { addItemToCart, removeItemFromCart, increaseQty, decreaseQty, clearCart } = cartSlice.actions;

export default cartSlice.reducer;