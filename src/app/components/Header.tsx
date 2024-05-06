import "../css/header.css";
import Link from "next/link";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-md" id="navbar">
      <Link className="navbar-brand" href="/">
        <div className="header-container">
          <img
            src="/images/pokeball.webp"
            width="30"
            height="30"
            className="d-inline-block align-top header-image"
            alt=""
          />
          <span className="navbar-text" id="header-text">
            Poké Atlas: Explore the Pokémon World
          </span>
        </div>
      </Link>
    </nav>
  );
};

export default Header;
