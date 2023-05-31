import React from "react";
import bookSVG from "../assets/read_book_icon.svg";

const Header: React.FC = () => {
  return (
    <header>
      <img
        className="site-logo"
        src={bookSVG}
        alt="Icon representing an opened book"
      />
      Bookly
    </header>
  );
};

export default Header;
