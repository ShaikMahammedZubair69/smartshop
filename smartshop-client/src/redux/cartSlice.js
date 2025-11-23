import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [], // Stores { skuCode, price, quantity, name }
    totalQuantity: 0,
    totalAmount: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.skuCode === newItem.skuCode);
            
            if (!existingItem) {
                // If item is not in cart, push it
                state.items.push({
                    skuCode: newItem.skuCode, // We use ID or Name as skuCode for simplicity
                    name: newItem.name,
                    price: newItem.price,
                    quantity: 1
                });
            } else {
                // If item exists, just increase quantity
                existingItem.quantity++;
            }
            
            state.totalQuantity++;
            state.totalAmount += newItem.price;
        },
        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        }
    },
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;