import React from 'react'
import {useStaticQuery, graphql} from 'gatsby'


const Images = () => {
    const data = useStaticQuery(graphql`
        query CloudinaryImages {
            allCloudinaryMedia {
              edges {
                node {
                  secure_url,
                  public_id,
                }
              }
            }
        }
        `
    );
    const clImages = data.allCloudinaryMedia.edges;

    return (
        <div>
          <div>
            {clImages.map((image, index) => (
                  <div key={`${index}-cl`}>
                    <img src={image.node.secure_url} />
                  </div>
                ))
            }
          </div>
        </div>
      )
};

export default Images;