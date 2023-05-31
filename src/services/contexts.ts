import React from "react";
import { Book } from "./api/entities.ts";

export const BooksContext = React.createContext<
  | {
      books: Book[];
      setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
    }
  | undefined
>(undefined);
