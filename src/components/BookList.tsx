import React, { useCallback } from "react";
import BookCard from "./BookCard.tsx";
import plusIcon from "../assets/plus_icon.svg";
import { Book } from "../services/api/entities.ts";
import { useHistory } from "react-router-dom";
import Drawer from "./Drawer.tsx";
import filterSVG from "../assets/filter-icon.svg";

type Props = {
  books: Book[];
};

export type Filters = {
  title: string;
  author: string;
  description: string;
};

const BookList: React.FC<Props> = ({ books }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [filters, setFilters] = React.useState<Filters>({
    title: "",
    author: "",
    description: "",
  });

  const history = useHistory();
  const goToCreateBook = useCallback(() => {
    history.push("/create");
  }, [history]);

  const filterCallback = useCallback(
    (book: Book) => {
      return (
        book.title.toLowerCase().includes(filters.title.toLowerCase()) &&
        book.author.toLowerCase().includes(filters.author.toLowerCase()) &&
        book.description
          .toLowerCase()
          .includes(filters.description.toLowerCase())
      );
    },
    [filters.author, filters.description, filters.title]
  );

  return (
    <div className="list-container">
      <div className="upper-section">
        <button className="add-element-btn" onClick={goToCreateBook}>
          <img src={plusIcon} alt="icon that indicates the plus sign" />
          Add
        </button>
        <div
          className="glass-card filters-container"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <img src={filterSVG} alt="icon representig filters" />
        </div>
        <Drawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
      {books.filter(filterCallback).map((book) => (
        <BookCard book={book} key={`book-card-${book.id}`} />
      ))}
    </div>
  );
};

export default BookList;
