import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getCartFromLocalStorage } from 'components/utils/getCartFromLocalStorage';
import { RootState } from 'redux/store'

export type CartItemType = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

interface InitialStateType {
  totalCoast: number,
  items: CartItemType[],
}

const localStorageData = getCartFromLocalStorage ()

const initialState: InitialStateType = {
  totalCoast: localStorageData.totalCoast || 0,
  items: localStorageData.items || [],
}

function resetTotalCoast(state: InitialStateType) {
  state.totalCoast = state.items.reduce((sum, obj) => {
    return obj.count * obj.price + sum
  }, 0)
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find(
        (obj) => obj.id === action.payload.id && obj.size === action.payload.size && obj.type === action.payload.type,
      )
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        })
      }

      resetTotalCoast(state)
    },
    plusItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find(
        (obj) => obj.id === action.payload.id && obj.size === action.payload.size && obj.type === action.payload.type,
      )
      if (findItem) {
        findItem.count++
        resetTotalCoast(state)
      }
    },
    minusItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find(
        (obj) => obj.id === action.payload.id && obj.size === action.payload.size && obj.type === action.payload.type,
      )
      if (findItem) {
        findItem.count--
        resetTotalCoast(state)
      }
    },
    removeItem(state, action: PayloadAction<CartItemType>) {
      if (window.confirm('Are you sure?')) {
        state.items = state.items.filter(
          (obj) =>
            !(obj.id === action.payload.id && obj.size === action.payload.size && obj.type === action.payload.type),
        )
        console.log(state.items, state.totalCoast)
        resetTotalCoast(state)
      }
    },
    clearItems(state) {
      if (window.confirm('Are you sure?')) {
        state.items = []
        resetTotalCoast(state)
      }
    },
  },
})

export const selectPizzasById = (id:string) => (state: RootState) => state.cartReducer.items.filter((item) => item.id === id)
export const selectCart = (state: RootState) => state.cartReducer

export const { addItem, removeItem, clearItems, minusItem, plusItem } = cartSlice.actions

export default cartSlice.reducer
