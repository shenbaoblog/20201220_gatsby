import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/layout";

// fontawesome呼び出し
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronLeft,
  faChevronRight,
  faCheckSquare,
} from "@fortawesome/free-solid-svg-icons";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import useContentfulImage from "../utils/useContentfulImage";

const options = {
  renderNode: {
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2>
        <FontAwesomeIcon icon={faCheckSquare} />
        {children}
      </h2>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node) => (
      <Img
        fluid={useContentfulImage(node.data.target.fields.file["ja-JP"].url)}
        alt={
          node.data.target.fields.description
            ? node.data.target.fields.description["ja-JP"]
            : node.data.target.fields.title["ja-JP"]
        }
      />
    ),
  },
  renderText: (text) => {
    return text.split("\n").reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
};

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
            <i className="far fa-folder-open" />
            <FontAwesomeIcon icon={faFolderOpen} />
            <ul>
              {data.contentfulGatsbyBlogPost.category.map((cat) => (
                <li className={cat.gatsbyCategorySlug} key={cat.id}>
                  {cat.gatsbyCategory}
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <div className="postbody">
          {documentToReactComponents(
            data.contentfulGatsbyBlogPost.contents.json,
            options
          )}
        </div>
        <ul className="postlink">
          <li className="prev">
            <a href="base-blogpost.html" rel="prev">
              <FontAwesomeIcon icon={faChevronLeft} />
              <span>前の記事</span>
            </a>
          </li>
          <li className="next">
            <a href="base-blogpost.html" rel="next">
              <span>次の記事</span>
              <FontAwesomeIcon icon={faChevronRight} />
            </a>
          </li>
        </ul>
      </div>
    </article>
  </Layout>
);

export const query = graphql`
  query {
    contentfulGatsbyBlogPost {
      title
      publishDateJP: publishDate(formatString: "YYYY年MM月DD日")
      publishDate
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
        json
      }
    }
    allContentfulAsset {
      nodes {
        file {
          url
        }
      }
    }
  }
`;
