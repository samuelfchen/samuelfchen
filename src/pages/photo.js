import React from "react"
import { graphql } from 'gatsby'

//Import component
import Layout from "../templates/Layout.js"

import AlbumLink from "../components/photo/AlbumLink"

// const PhotoPage = () => {
//   return (
//     <Layout>
//       <h1>
//         🚧 Photos 🚧
//       </h1>
//     </Layout>
//   );
// }

const PhotoPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  
  const Albums = edges
    .filter(edge => !!edge.node.frontmatter.date) 
    .map(edge => <AlbumLink key={edge.node.id} post={edge.node}/>)

  return (
    <Layout>
      <h1>
        Albums
      </h1>
      <div>
        {Albums}
      </div>
    </Layout>
  );
}

export default PhotoPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, filter: { frontmatter: {type: {eq: "photoAlbum" }}}) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "MMMM YYYY")
            slug
            title
            subtitle
            featuredImage
          }
        }
      }
    }
  }
`

