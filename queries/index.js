import { gql } from "@apollo/client";

export const GET_SEASONS = gql`
  query allSeasons($searchTerm: String) {
    allSeasons(searchTerm: $searchTerm) {
      Season {
        id
        name
        slug
        year
        active
        major
        url
      }
    }
  }
`;


export const GET_COLLECTION_IMAGES = gql`
  {
    fashionGalleryByType(
      brandSlug: "chanel"
      galleryType: collection
      seasonSlug: "spring-2022-couture"
    ) {
      photosTout {
        ... on Image {
          url
        }
      }
      slidesV2 {
        slide {
          ... on CollectionSlide {
            caption
            credit
            photosTout {
              ... on Image {
                url
              }
              ... on Video {
                url
              }
            }
            details {
              photosTout {
                ... on Image {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_BRANDS = gql`
  {
    allBrands(first: 10, searchTerm: "margiela") {
      Brand {
        id
        description
        designers {
          name
          startYear
          bio
          roles
        }
        previousDesigners {
          name
          startYear
          roles
        }
        photosTout {
          url
          title
        }
        name
        slug
      }
    }
  }
`;

export const GET_BRAND = gql`
  {
    brand(
      id: "QnJhbmQ6NTVjNjRlNGZjNGU2YTJkOGRjZGUyODE2"
      slug: "maison-martin-margiela"
      url: "https://www.vogue.com/fashion-shows/designer/maison-martin-margiela"
    ) {
      name
    }
  }
`;

export const GET_CONTENT = gql`
  {
    allContent(
      first: 30
      filter: { channel: { slug: "fashion" } }
      hierarchy: null
      type: ["ArticleCopilot", "GalleryCopilot", "FashionShowV2"]
      exclude: {
        categories: [{ hierarchy: "functional-tags/noriver" }]
        contentFlags: { hideFromFeed: true }
      }
    ) {
      Content {
        id
        url
        slug
        title
        photosTout {
          ... on Image {
            url
          }
          ... on Clip {
            url
          }
        }
        channel {
          parent {
            name
          }
          name
        }
      }
    }
  }
`; //content in channel

export const GET_ARTICLE = gql`
  {
    articleCopilot(
      url: "https://www.vogue.com/slideshow/phil-ohs-best-street-style-photos-from-the-paris-spring-2023-shows"
    ) {
      title
      promoTitle
      contributor {
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
        ... on Image {
          url
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
        }
      }
      channel {
        name
        slug
        id
      }
    }
  }
`; //link to article and image

// https://graphql.vogue.com/graphql?query={allSeasons{Season{name%20slug}}}
//https://www.vogue.com/graphiql
