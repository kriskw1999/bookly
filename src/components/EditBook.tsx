import React, {
  FormEventHandler,
  useCallback,
  useContext,
  useState,
} from "react";
import GoHomeBtn from "./GoHomeBtn.tsx";
import { useHistory, useParams } from "react-router-dom";
import { Book } from "../services/api/entities.ts";
import { BooksContext } from "../services/contexts.ts";
import { api } from "../services/api";

const initialBook = {
  title: "",
  description: "",
  favorite: false,
  rating: 0,
  author: "",
};

const EditBook: React.FC = () => {
  const history = useHistory();

  const params = useParams<{ id?: string }>();
  const bookContext = useContext(BooksContext);
  const book = bookContext?.books.find(({ id }) => id === Number(params.id));

  const [bookToPush, setBookToPush] = useState<Omit<Book, "id">>(
    book ?? initialBook
  );

  const onTextValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setBookToPush((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const onSubmit = useCallback<FormEventHandler>(
    (e) => {
      e.preventDefault();

      if (book) {
        api.books.patch({ ...bookToPush, id: book.id });
        bookContext?.setBooks(
          bookContext.books.map((currentBook) =>
            currentBook.id === book.id
              ? { ...bookToPush, id: book.id }
              : currentBook
          )
        );
      } else {
        api.books
          .post(bookToPush)
          .then((newBook) =>
            bookContext?.setBooks([...(bookContext?.books ?? []), newBook])
          );
      }

      history.push("/");
    },
    [book, bookContext, bookToPush, history]
  );

  return (
    <div className="create-container glass-card">
      <GoHomeBtn />

      <form className="edit-form" onSubmit={onSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={bookToPush.title}
          onChange={onTextValueChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={bookToPush.author}
          onChange={onTextValueChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={bookToPush.description}
          onChange={onTextValueChange}
        />
        <input
          type="text"
          name="rating"
          placeholder="Rating"
          value={bookToPush.rating}
          onChange={(e) => {
            const { value } = e.target;

            setBookToPush((prev) => ({
              ...prev,
              rating: Number(value),
            }));
          }}
        />
        <div className="boolean-input">
          Favorite
          <input
            type="checkbox"
            name="favorite"
            placeholder="Favorite"
            defaultChecked={bookToPush.favorite}
            onChange={() => {
              setBookToPush((prev) => ({
                ...prev,
                favorite: !prev.favorite,
              }));
            }}
          />
        </div>

        <button className="create-book-button" type="submit">
          {book ? "Save" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default EditBook;
