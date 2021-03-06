import * as React from "react"
import Layout from "../components/layout"

import SEO from "../components/seo"

// markup
const NotFoundPage = ({ location }) => {
  return (
    <Layout>
      <SEO
        pagetitle="ページが見つかりません"
        pagepath={location.pathname}
      />
      <h1 style={{ padding: "20vh 0", textAlign: "center" }}>お探しのページは見つかりませんでした</h1>
    </Layout>
  )
}

export default NotFoundPage
