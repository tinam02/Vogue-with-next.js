import { gql } from "@apollo/client";
import {
  personFields,
  fashionShowGalleryFields,
  articleFields,
} from "./fragments";

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
  query fashionGalleryByType($brandSlug: String!, $seasonSlug: String!) {
    fashionGalleryByType(
      brandSlug: $brandSlug
      galleryType: collection
      seasonSlug: $seasonSlug
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

export const GET_REVIEW_IMAGES = gql`
  ${fashionShowGalleryFields}
  query fashionShowV2($slug: String) {
    fashionShowV2(slug: $slug) {
      photosTout {
        ... on Image {
          url
        }
      }
      GMTPubDate
      GMTModDate
      channel {
        name
      }
      livestream
      city {
        id
        name
      }
      brand {
        id
        name
        slug
        designers {
          name
        }
      }
      season {
        slug
        name
      }
      review {
        title
        body
        contributor {
          author {
            name
            photosTout {
              ... on Image {
                url
                resizedUrl(w: 100)
              }
            }
          }
        }
      }
      galleries {
        collection {
          id
          title
          slideCount
          slidesV2 {
            slide {
              ... on CollectionSlide {
                photosTout {
                  ... on Image {
                    url
                    resizedUrl(w: 500)
                    altText
                  }
                }
              }
            }
          }
        }
        detail {
          ...fashionShowGalleryFields
        }
      }
    }
  }
`;

export const GET_BRANDS = gql`
  query allBrands($searchTerm: String) {
    allBrands(first: 10, searchTerm: $searchTerm) {
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
  ${personFields}
  {
    brand(
      id: "QnJhbmQ6NTVjNjRlNGZjNGU2YTJkOGRjZGUyODE2"
      slug: "maison-martin-margiela"
      url: "https://www.vogue.com/fashion-shows/designer/maison-martin-margiela"
    ) {
      _cursor_
      name
      description
      designers {
        ...personFields
      }
      previousDesigners {
        ...personFields
      }
      photosTout {
        ... on Image {
          id
        }
      }
      GMTPubDate
      slug
      url
      fashionShows {
        fashionShow {
          title
          url
          id
        }
      }
    }
  }
`;

export const GET_CONTENT = gql`
  query allContent($after: String) {
    allContent(
      first: 12
      after: $after
      filter: { channel: { slug: "fashion" } }
      hierarchy: null
      type: ["ArticleCopilot"]
      exclude: {
        categories: [{ hierarchy: "functional-tags/noriver" }]
        contentFlags: { hideFromFeed: true }
      }
    ) {
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
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
`;

export const GET_ARTICLES = gql`
  ${articleFields}
  query allContent($after: String) {
    allContent(
      first: 10
      after: $after
      filter: { channel: { slug: "fashion" } }
      hierarchy: null
      type: ["ArticleCopilot"]
      exclude: {
        categories: [{ hierarchy: "functional-tags/noriver" }]
        contentFlags: { hideFromFeed: true }
      }
    ) {
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
      Content {
        ... on ArticleCopilot {
          ...articleFields
        }
      }
    }
  }
`;

export const SEARCH_ARTICLES = gql`
  ${articleFields}
  query allContent($after: String, $searchTerm: String) {
    allContent(
      first: 10
      after: $after
      searchTerm: $searchTerm
      filter: { channel: { slug: "fashion" } }
      hierarchy: null
      type: ["ArticleCopilot"]
      exclude: {
        categories: [{ hierarchy: "functional-tags/noriver" }]
        contentFlags: { hideFromFeed: true }
      }
    ) {
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
      Content {
        ... on ArticleCopilot {
          ...articleFields
        }
      }
    }
  }
`;

export const GET_ARTICLE = gql`
  ${articleFields}
  query articleCopilot($slug: String) {
    articleCopilot(slug: $slug) {
      ...articleFields
    }
  }
`;

export const GET_LATEST_SHOWS = gql`
  query allContent($after: String) {
    allContent(first: 12, after: $after, type: ["FashionShowV2"]) {
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
      Content {
        slug
        title
        ... on FashionShowV2 {
          id
          url
          season {
            id
            slug
            name
            major
          }
          brand {
            id
            slug
            name
          }
        }
        photosTout {
          ... on Image {
            url
            resizedUrl(w: 500)
          }
        }
        GMTPubDate
        url
        tags {
          name
        }
        channels {
          slug
          name
        }
      }
    }
  }
`;

export const GET_LATEST_SHOW = gql`
  {
    allContent(first: 1, type: ["FashionShowV2"]) {
      Content {
        title
        ... on FashionShowV2 {
          id
          url
          title
          slug
          livestream
          galleries {
            ... on FashionShowGalleries {
              detail {
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
              collection {
                slidesV2 {
                  slide {
                    ... on CollectionSlide {
                      photosTout {
                        ... on Image {
                          url
                          resizedUrl(w: 600)
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          season {
            id
            slug
            name
          }
          brand {
            id
            slug
            name
            description
            designers {
              ... on Person {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_SEASON_SHOWS = gql`
  query allContent($after: String, $filter: ContentFilter) {
    allContent(
      first: 12
      after: $after
      type: ["FashionShowV2"]
      filter: $filter
    ) {
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
      Content {
        slug
        title
        ... on FashionShowV2 {
          id
          url
          season {
            slug
            name
            major
          }
          brand {
            id
            slug
            name
          }
        }
        photosTout {
          ... on Image {
            url
            resizedUrl(w: 500)
          }
        }
        GMTPubDate
        url
        tags {
          name
        }
        channels {
          slug
          name
        }
      }
    }
  }
`;

export const GET_BRAND_SHOWS = gql`
  query allContent($after: String, $filter: ContentFilter) {
    allContent(
      first: 12
      after: $after
      type: ["FashionShowV2"]
      filter: $filter
    ) {
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
      Content {
        slug
        title
        ... on FashionShowV2 {
          id
          url
          season {
            id
            slug
            name
            major
          }
          brand {
            id
            description
            previousDesigners {
              name
              title
              startYear
              endYear
              roles
            }
            designers {
              name
              title
              endYear
              startYear
              socialMediaHandles {
                instagram
                pinterest
                twitter
              }
              roles
            }
            name
          }
        }
        photosTout {
          ... on Image {
            url
            resizedUrl(w: 500)
          }
        }
        GMTPubDate
        url
        tags {
          name
        }
        channels {
          slug
          name
        }
      }
    }
  }
`;
