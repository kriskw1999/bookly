import React, { useEffect, useState } from "react";
import BookList from "./components/BookList.tsx";
import Header from "./components/Header.tsx";
import { Book } from "./services/api/entities.ts";
import { api } from "./services/api";
import { BooksContext } from "./services/contexts.ts";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EditBook from "./components/EditBook.tsx";

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    api.books.get().then((books) => setBooks(books));
  }, []);

  return (
    <>
      <Header />
      <div className="layout">
        <BooksContext.Provider value={{ books, setBooks }}>
          <Router>
            <Switch>
              <Route path="/edit/:id">
                <EditBook />
              </Route>
              <Route path="/create">
                <EditBook />
              </Route>
              <Route path="/">
                <BookList books={books} />
              </Route>
            </Switch>
          </Router>
        </BooksContext.Provider>
      </div>
    </>
  );
};

export default App;
