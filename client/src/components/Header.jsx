import React from "react";
import Logo from "./Logo";

import "./header.css"

function Header() {
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      {/* === LOGO === */}
      <Logo />
      {/* === SEARCH BAR === */}
      {/* === NAV === */}
    </header>
  );
}

export default Header;
