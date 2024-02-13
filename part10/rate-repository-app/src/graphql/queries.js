import { gql } from '@apollo/client';

const REPOSITORY_DETAILS = gql`
fragment RepositoryDetails on Repository {
  id
  description
  forksCount
  fullName
  language
  ownerAvatarUrl
  ratingAverage
  reviewCount
  stargazersCount
  url
  @include(if: $includeReviews) reviews (first: $reviewsFirst, after: $reviewsAfter) {
    edges {
      node {
        id
        text
        rating
        createdAt
        user {
          id
          username
        }
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
`

export const GET_REPOSITORIES = gql`
query Repositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String, $first: Int, $after: String, $includeReviews: Boolean = false, $reviewsFirst:Int, $reviewsAfter: String) {
  repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword, first: $first, after: $after) {
      edges {
        node {
            ...RepositoryDetails
        }
        cursor
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
    }
  }

  ${REPOSITORY_DETAILS}
`;

export const GET_AUTHENTICATION_DETAILS = gql`
query getAuthenticationDetails($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            user {
              username
            }
            rating
            createdAt
            repositoryId
          }
        }
      }
    }
  }
`

export const GET_REPOSITORY = gql`
query getRepository($repositoryId: ID!, $includeReviews: Boolean = true, $reviewsFirst:Int, $reviewsAfter: String) {
    repository(id: $repositoryId) {
        ...RepositoryDetails
    }
}
  ${REPOSITORY_DETAILS}
`;