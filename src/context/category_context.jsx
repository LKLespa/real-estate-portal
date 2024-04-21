import React, { createContext, useContext, useReducer } from 'react';
import categories from './categories';

// Define initial state
const initialState = categories;

// Define reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_CATEGORY':
      return state.map(categoryGroup => ({
        ...categoryGroup,
        categories: categoryGroup.categories.map(category =>
          category.name === action.payload
            ? { ...category, selected: !category.selected }
            : category
        )
      }));
    default:
      return state;
  }
};

// Create context
const CategoryContext = createContext();

// Provider component
export const CategoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleCategory = categoryName => {
    dispatch({ type: 'TOGGLE_CATEGORY', payload: categoryName });
  };

  const selectedCategories = state.reduce((acc, categoryGroup) => {
    const selected = categoryGroup.categories.filter(category => category.selected);
    return [...acc, ...selected];
  }, []);

  return (
    <CategoryContext.Provider value={{ categories: state,  selectedCategories, toggleCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

// Custom hook to consume CategoryContext
export const useCategories = () => useContext(CategoryContext);