import { gql } from "@apollo/client";

export const personFields = gql`
  fragment personFields on Person {
    id
    name
    bio
    title
    startYear
    endYear
    roles
  }
`;

export const fashionShowGalleryFields = gql`
  fragment fashionShowGalleryFields on FashionShowGallery {
    id
    title
    slideCount
    slidesV2 {
      slide {
        ... on Slide {
          photosTout {
            ... on Image {
              url
              resizedUrl(w: 300)
            }
          }
        }
      }
    }
  }
`;

export const articleFields = gql`
  fragment articleFields on ArticleCopilot {
    title
    url
    slug
    seoDescription
    GMTPubDate
    contributor {
      author {
        name
        photosTout {
          ... on Image {
            url
          }
        }
      }
      photographer {
        name
        photosTout {
          ... on Image {
            url
          }
        }
      }
    }
    body(enableEnhancedLinks: true)
    bodyEmbeds {
      ... on Product {
        name
        id
        photosTout {
          ... on Image {
            url
            resizedUrl(w: 500)
          }
        }
        offers {
          sellerName
          price
          purchaseUri
        }
      }
      ... on Image {
        id
        url
        resizedUrl(w: 800)
      }
      ... on Gallery {
        url
        body
      }
      ... on GalleryCopilot {
        url
        body
      }
    }
    photosTout {
      ... on Image {
        url
        width
        height
        resizedUrl(w: 600)
        altText
      }
    }
    channel {
      name
      slug
      id
    }
    channels {
      name
      slug
      id
    }
  }
`;
