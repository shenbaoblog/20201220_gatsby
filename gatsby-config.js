require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
module.exports = {
  siteMetadata: {
    title: `ESSENTIALS`,
    description: `おいしい食材と食事を探求するサイト`,
    lang: `ja`,
    siteUrl: `https://mygatsby-plactice.netlify.app/`,
    locale: `ja_JP`,
    fbappid: `xxxxxxxxxxxxxxxxxxxx`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-XXXXXXXXXX-X`,
        head: true,
        respectDNT: true,
        exclude: [`/cat/**`, `/test/`],
      },
    },
    `gatsby-transformer-sharp`,
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ESSENTIALS エッセンシャルズ`,
        short_name: `ESSENTIALS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#477294`,
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST,
      },
    },
    // `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        createLinkInHead: true,
        exclude: [`/cat/**`, `/test/`],
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            nodes {
              path
            }
          }
        }`,
        serialize: ({ site, allSitePage }) => {
          return allSitePage.nodes.map((node) => {
            return {
              url: `${site.siteMetadata.siteUrl}${node.path}`,
              changefreq: `weekly`,
              priority: 0.5,
            };
          });
        },
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allContentfulGatsbyBlogPost } }) => {
              return allContentfulGatsbyBlogPost.edges.map((edge) => {
                return Object.assign(
                  {},
                  {
                    title: edge.node.title,
                    description: edge.node.contents.fields.description,
                    date: edge.node.publishDate,
                    url: `${site.siteMetadata.siteUrl}/blog/post/${edge.node.slug}/`,
                  }
                );
              });
            },
            query: `
              {
                allContentfulGatsbyBlogPost(
                  sort: {order: DESC, fields: publishDate},
                ) {
                  edges {
                    node {
                      title
                      id
                      slug
                      publishDate
                      contents {
                        fields {
                          description
                        }
                      }
                    }
                  }
                }
              }
            `,
            output: `/rss.xml`,
            title: `Essentials RSS Feed`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts-v2`,
      options: {
        fonts: [
          {
            family: "Montserrat Alternates",
            variable: true,
            weights: [`400`, `700`],
          },
          {
            family: `Noto Sans JP`,
            variable: true,
            weights: [`400`, `700`],
          },
        ],
      },
    },
  ],
};
