import React from "react";
import { Filters } from "./BookList.tsx";

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};
const Drawer: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  setFilters,
  filters,
}) => {
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // callback function that will be called when the user types in the input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={`drawer ${isOpen ? "open" : ""}`}>
      <button className="toggle-button" onClick={handleToggle}>
        Toggle Drawer
      </button>
      <div className="content">
        <input
          name="title"
          type="text"
          placeholder="Search by title"
          value={filters.title}
          onChange={handleInputChange}
        />
        <input
          name="author"
          type="text"
          placeholder="Search by author"
          value={filters.author}
          onChange={handleInputChange}
        />
        <input
          name="description"
          type="text"
          placeholder="Search by description"
          value={filters.description}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default Drawer;
