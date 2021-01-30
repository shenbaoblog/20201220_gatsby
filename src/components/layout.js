import React from "react";
import "typeface-montserrat-alternates"
// グーグルフォント
// import { Helmet } from "react-helmet"

import Header from "../components/header";
import Footer from "../components/footer";

import "./layout.css"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

export default ({ children }) => (
  <div>
    {/* グーグルフォント */}
    {/* <Helmet>
      <link
        href="https://fonts.googleapis.com/css?family=Montserrat+Alternates:wght@400;700&display=swap" rel="stylesheet"
      />
    </Helmet> */}

    <Header />
      { children }
    <Footer />
  </div>
);
