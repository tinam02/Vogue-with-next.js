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
            }
          }
        }
      }
    }
  }
`;
