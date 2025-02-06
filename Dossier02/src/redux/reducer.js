// src/redux/reducer.js
const initialState = {
    books: [
      { id: 1, title: "Le Seigneur des Anneaux", author: "J.R.R. Tolkien", likes: 0 },
      { id: 2, title: "1984", author: "George Orwell", likes: 0 },
      { id: 3, title: "Harry Potter à l'école des sorciers", author: "J.K. Rowling", likes: 0 }
    ]
  };
  
  const booksReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INCREMENT_LIKE':
        return {
          ...state,
          books: state.books.map((book) =>
            book.id === action.payload ? { ...book, likes: book.likes + 1 } : book
          )
        };
      default:
        return state;
    }
  };
  
  export default booksReducer;
  