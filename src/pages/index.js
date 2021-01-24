import * as React from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/layout";

import SEO from "../components/seo";

// markup
const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO />
      <section className="hero">
        <figure>
          <Img
            fluid={data.hero.childImageSharp.fluid}
            alt=""
            style={{ height: "100%" }}
          />
          {/* <img src="/images/hero.jpg" alt="" /> */}
        </figure>
        <div className="catch">
          <h1>
            There is no love sincerer than
            <br /> the love of food.
          </h1>
          <p>食物を愛するよりも誠実な愛はない ― バーナード・ショー2</p>
        </div>
        <div className="wave">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1366 229.5"
            fill="#fff"
          >
            <path
              d="M1369,6.3C1222.5-12.2,1189.5,8,919.2,96.6C665,179.8,160,141.7-2,53.1v150l1371-14.2V6.3z"
              opacity=".53"
            />
            <path d="M1369 229.5V55.8c-9.5-2.4-19.2-4.4-28.9-5.8-196.9-29.9-203.4-15.8-503.9 82.6-219.8 72-627.6 53.2-838.2-10.5v107.4h1371z" />
          </svg>
          {/* <img src="/images/wave.svg" alt="" /> */}
        </div>
      </section>
      <section className="food">
        <div className="container">
          <h2 className="bar">
            Food <span>Essence</span>
          </h2>
          <div className="details">
            <div className="detail">
              <figure>
                <img src="/images/fruit.jpg" alt="" />
              </figure>
              <h3>フルーツ</h3>
              <p>FRUIT</p>
              <p>
                甘くてすっぱくておいしい果実たち。
                <br />
                旬のフルーツを満喫します。
              </p>
            </div>
            <div className="detail">
              <figure>
                <Img fluid={data.grain.childImageSharp.fluid} alt="" />
                {/* <img src="/images/grain.jpg" alt="" /> */}
              </figure>
              <h3>穀物</h3>
              <p>GRAIN</p>
              <p>
                食事の基本となる穀物。
                <br />
                毎日の活動のエネルギー源になります。
              </p>
            </div>
            <div className="detail">
              <figure>
                <Img
                  fluid={data.beverage.childImageSharp.fluid}
                  alt=""
                  style={{ height: "100%" }}
                />
                {/* <img src="/images/beverage.jpg" alt="" /> */}
              </figure>
              <h3>飲み物</h3>
              <p>BEVERAGE</p>
              <p>
                リラックスするのに欠かせない飲み物。
                <br />
                お気に入りの一杯はありますか？
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="photo">
        <h2 className="sr-only">Photo</h2>
        <figure>
          <Img
            fluid={data.berry.childImageSharp.fluid}
            alt="赤く熟したベリー"
            style={{ height: "100%" }}
          />
          {/* <img src="/images/berry.jpg" alt="赤く熟したベリー" /> */}
        </figure>
      </section>

      <section>
        <div className="container">
          <h2 className="bar">RECENT POSTS</h2>
          <div className="posts">
            {data.allContentfulGatsbyBlogPost.edges.map(({ node }) => (
              <article className="post" key={node.id}>
                <Link to={`/blog/post/${node.slug}`}>
                  <figure>
                    <Img
                      fluid={node.eyecatch.fluid}
                      alt={node.eyecatch.description}
                      style={{ height: "100%" }}
                    />
                  </figure>
                  <h3>{node.title}</h3>
                </Link>
              </article>
            ))}
          </div>
{/*       <ul className="pagenation">
            {!pageContext.isFirst && (
              <li className="prev">
                <Link
                  to={
                    pageContext.currentPage === 2
                      ? `/blog/`
                      : `/blog/${pageContext.currentPage - 1}/`
                  }
                  rel="prev"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                  <span>前のページ</span>
                </Link>
              </li>
            )}

            {!pageContext.isLast && (
              <li className="next">
                <Link to={`/blog/${pageContext.currentPage + 1}`} rel="next">
                  <span>次のページ</span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </Link>
              </li>
            )}
          </ul> */}
        </div>
      </section>

    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    hero: file(relativePath: { eq: "hero.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1600) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
    fruit: file(relativePath: { eq: "fruit.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 320) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
    grain: file(relativePath: { eq: "grain.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 320) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
    beverage: file(relativePath: { eq: "beverage.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 320) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
    berry: file(relativePath: { eq: "berry.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1600) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
    allContentfulGatsbyBlogPost(
      sort: { fields: publishDate, order: DESC }
      skip: 0
      limit: 4
    ) {
      edges {
        node {
          title
          id
          slug
          eyecatch {
            description
            fluid(maxWidth: 573) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
