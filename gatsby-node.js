const path = require("path");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const blogresult = await graphql(`
    query {
      allContentfulGatsbyBlogPost(sort: { fields: publishDate, order: DESC }) {
        edges {
          node {
            id
            slug
          }
          next {
            title
            slug
          }
          previous {
            title
            slug
          }
        }
      }
      allContentfulGatsbyCategory {
        edges {
          node {
            gatsbyCategorySlug
            id
            gatsbyCategory
            gatsbyblogpost {
              title
            }
          }
        }
      }
    }
  `);

  if (blogresult.errors) {
    reporter.panicOnBuild(`GraphQLのクエリエラーが発生しました`);
    return;
  }

  blogresult.data.allContentfulGatsbyBlogPost.edges.forEach(
    ({ node, next, previous }) => {
      createPage({
        path: `/blog/post/${node.slug}/`,
        component: path.resolve(`./src/templates/blogpost-template.js`),
        context: {
          id: node.id,
          next,
          previous,
        },
      });
    }
  );

  // 記事一覧ページの設定
  const blogPostsPerPage = 2; // 1ページに表示する記事の数
  const blogPosts = blogresult.data.allContentfulGatsbyBlogPost.edges.length; // 記事の総数
  const blogPages = Math.ceil(blogPosts / blogPostsPerPage); // 記事一覧ページの総数

  Array.from({ length: blogPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog/` : `/blog/${i + 1}`,
      component: path.resolve("./src/templates/blog-template.js"),
      context: {
        skip: blogPostsPerPage * i,
        limit: blogPostsPerPage,
        currentPage: i + 1, // 現在のページ番号
        isFirst: i + 1 === 1, // 最初のページ
        isLast: i + 1 === blogPages, // 最後のページ
      },
    });
  });

  // カテゴリーページの設定
  blogresult.data.allContentfulGatsbyCategory.edges.forEach(({ node }) => {
    const catPostsPerPage = 1; // 1ページに表示する記事の数
    const catPosts = node.gatsbyblogpost.length; // カテゴリーに属した記事の総数
    const catPages = Math.ceil(catPosts / catPostsPerPage); // カテゴリーページの総数

    Array.from({ length: catPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `/cat/${node.gatsbyCategorySlug}/`
            : `/cat/${node.gatsbyCategorySlug}/${i + 1}`,
        component: path.resolve(`./src/templates/cat-template.js`),
        context: {
          catid: node.id,
          catname: node.gatsbyCategory,
          catslug: node.gatsbyCategorySlug,
          skip: catPostsPerPage * i,
          limit: catPostsPerPage,
          currentPage: i + 1, // 現在のページ番号
          isFirst: i + 1 === 1, // 最初のページ
          isLast: i + 1 === catPages, // 最後のページ
        },
      });
    });
  });
};


const {
  documentToPlainTextString,
} = require("@contentful/rich-text-plain-text-renderer");

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `contentfulGatsbyBlogPostContentsRichTextNode`) {
    createNodeField({
      node,
      name: `description`,
      value: `${documentToPlainTextString(JSON.parse(JSON.stringify(node.content))).slice(
        0,
        70
      )}...`,
    });
  }
};
