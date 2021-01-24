import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"

import SEO from "../components/seo"

export default ({data, location}) => (
  <Layout>
    <SEO
      pagetitle="ブログ"
      pagedescription="ESSENTILSのブログです"
      pagepath={location.pathname}
    />
    <section className="content bloglist">
      <div className="container">
        <h1 className="bar">RECENT POSTS</h1>
        <div className="posts">
          {data.allContentfulGatsbyBlogPost.edges.map(({node}) => (

            <article className="post" key={node.id}>
              <Link to={`/blog/post/${node.slug}`}>
                <figure>
                  <Img
                    fluid={node.eyecatch.fluid}
                    alt={node.eyecatch.description}
                    style={{height: "100%"}}
                  />
                </figure>
                <h3>{node.title}</h3>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  </Layout>
)


export const query = graphql`
  query {
    allContentfulGatsbyBlogPost(
      sort: { fields: publishDate, order: DESC }
      skip: 0
      limit: 2
    ) {
      edges {
        node {
          title
          id
          slug
          eyecatch {
            description
            fluid(maxWidth: 500) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
