import React, { useCallback, useContext } from "react";
import { Book } from "../services/api/entities.ts";
import StarCounter from "./StarCounter.tsx";
import filledHeart from "../assets/heart-filled.svg";
import emptyHeart from "../assets/Group.svg";
import { api } from "../services/api";
import { BooksContext } from "../services/contexts.ts";
import { useHistory } from "react-router-dom";

type Props = {
  book: Book;
};
const BookCard: React.FC<Props> = ({
  book: { title, description, favorite, rating, author, id },
}) => {
  const booksCtx = useContext(BooksContext);
  const history = useHistory();

  const deleteBook = useCallback(async () => {
    await api.books.delete(id);

    const newBooks =
      booksCtx?.books.filter(({ id: currentBookId }) => currentBookId !== id) ??
      [];
    booksCtx?.setBooks(newBooks);
  }, [booksCtx, id]);

  const editBook = useCallback(async () => {
    history.push(`/edit/${id}`);
  }, [history, id]);

  return (
    <div className="book-card glass-card">
      <div>
        <div className="title-row">
          <div className="title">{title}</div>
          <div className="heart-container">
            <img
              src={favorite ? filledHeart : emptyHeart}
              alt="heart that indicates if the book is favorite or not"
            />
          </div>
        </div>
        <div className="author">by {author}</div>
        <StarCounter count={rating} />
        <div className="description">{description}</div>
      </div>

      <div className="actions">
        <button onClick={editBook}>Edit</button>
        <button onClick={deleteBook}>Delete</button>
      </div>
    </div>
  );
};

export default BookCard;
