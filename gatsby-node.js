const path = require("path");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // すべての記事を取得するクエリ（結果はblogresultに取得）
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
        component: path.resolve(`./src/templates/blog-template.js`),
        context: {
          id: node.id,
          next,
          previous,
        },
      });
    }
  );

  // 生成が必要な記事一覧ページの総数（blogPages）を求める設定
  const blogPostsPerPage = 2; // 1ページに表示する記事の数
  const blogPosts = blogresult.data.allContentfulGatsbyBlogPost.edges.length; // 記事の総数
  const blogPages = Math.ceil(blogPosts / blogPostsPerPage); // 記事一覧ページの総数

  // createPageでページ生成
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
};
