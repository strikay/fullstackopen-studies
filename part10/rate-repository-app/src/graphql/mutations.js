import { gql } from '@apollo/client'

export const AUTHENTICATE_USER = gql`
mutation Mutation($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`

export const CREATE_REVIEW = gql`
mutation Mutation($review: CreateReviewInput) {
  createReview(review: $review) {
    createdAt
  }
}
`
export const DELETE_REVIEW = gql`
mutation Mutation($deleteReviewId: ID!) {
  deleteReview(id: $deleteReviewId)
}
`

export const CREATE_USER = gql`
mutation CreateUser($user: CreateUserInput) {
  createUser(user: $user) {
    username
  }
}
`