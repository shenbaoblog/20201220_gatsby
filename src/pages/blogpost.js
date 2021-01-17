import * as React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/layout";

import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS } from "@contentful/rich-text-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faFolderOpen,
  faCheckSquare,
} from "@fortawesome/free-solid-svg-icons";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default ({ data }) => (
  <Layout>
    <div className="eyecatch">
      <figure>
        <Img
          fluid={data.contentfulGatsbyBlogPost.eyecatch.fluid}
          alt={data.contentfulGatsbyBlogPost.eyecatch.description}
        />
        {/* <img src="images-baseblog/eyecatch.jpg" alt="アイキャッチ画像の説明" /> */}
      </figure>
    </div>
    <article className="content">
      <div className="container">
        <h1 className="bar">{data.contentfulGatsbyBlogPost.title}</h1>
        <aside className="info">
          <time dateTime={data.contentfulGatsbyBlogPost.publishDate}>
            <FontAwesomeIcon icon={faClock} />
            {data.contentfulGatsbyBlogPost.publishDateJP}
          </time>
          <div className="cat">
            <FontAwesomeIcon icon={faFolderOpen} />
            {/* <i className="far fa-folder-open" /> */}
            <ul>
              {/* <li className="スラッグ">カテゴリーＡ</li>
              <li className="スラッグ">カテゴリーＢ</li> */}
              {data.contentfulGatsbyBlogPost.category.map((cat) => (
                <li className={cat.gatsbyCategorySlug} key={cat.id}>
                  {cat.gatsbyCategory}
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <div className="postbody">
          {/* <p>
            記事の本文です。記事の本文です。記事の本文です。記事の本文です。記事の本文です。
            記事の本文です。記事の本文です。記事の本文です。記事の本文です。記事の本文です。
            記事の本文です。記事の本文です。記事の本文です。記事の本文です。記事の本文です。
          </p> */}
          {renderRichText(data.contentfulGatsbyBlogPost.contents, options)}
        </div>
        <ul className="postlink">
          <li className="prev">
            <a href="base-blogpost.html" rel="prev">
              <FontAwesomeIcon icon={faChevronLeft} />
              {/* <i className="fas fa-chevron-left" /> */}
              <span>前の記事</span>
            </a>
          </li>
          <li className="next">
            <a href="base-blogpost.html" rel="next">
              <span>次の記事</span>
              <FontAwesomeIcon icon={faChevronRight} />
              {/* <i className="fas fa-chevron-right" /> */}
            </a>
          </li>
        </ul>
      </div>
    </article>
  </Layout>
);

const options = {
  renderNode: {
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2>
        <FontAwesomeIcon icon={faCheckSquare} />
        {children}
      </h2>
    ),
  },
  renderText: (text) => {
    return text.split("\n").reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
};

export const query = graphql`
  query {
    contentfulGatsbyBlogPost {
      title
      publishDate
      publishDateJP: publishDate(formatString: "YYYY年MM月DD日")
      category {
        gatsbyCategory
        gatsbyCategorySlug
        id
      }
      eyecatch {
        fluid(maxWidth: 1600) {
          ...GatsbyContentfulFluid_withWebp
        }
        description
      }
      contents {
        raw
      }
    }
  }
`;
