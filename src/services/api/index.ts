import { http } from "../client/http.ts";
import { Book } from "./entities.ts";

export const api = {
  books: {
    get: () => http.get<Book>("books"),
    post: (book: Omit<Book, "id">): Promise<Book> => http.post("books", book),
    patch: (book: Book) => http.patch(`books/${book.id}`, book),
    delete: (id: number) => http.delete(`books/${id}`),
  },
};
