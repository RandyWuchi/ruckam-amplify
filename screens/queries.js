export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      imageUri
      chatRoomUser {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
          chatRoom {
            id
            chatRoomUsers {
              items {
                user {
                  id
                  name
                  imageUri
                }
              }
            }
            lastMessage {
              id
              content
              updatedAt
              user {
                id
                name
              }
            }
          }
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listListings = /* GraphQL */ `
  query ListListings(
    $filter: ModelListingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listListings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        price
        category
        description
        latitude
        longitude
        images
        userID
        user {
          id
          name
          email
          imageUri
          createdAt
          updatedAt
          listing {
            items {
              updatedAt
              title
              price
              longitude
              latitude
              images
              id
              description
              createdAt
              category
            }
          }
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const listingByDate = /* GraphQL */ `
  query ListingByDate(
    $queryName: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelListingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listingByDate(
      queryName: $queryName
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        price
        category
        description
        latitude
        longitude
        address
        images
        queryName
        createdAt
        userID
        user {
          id
          name
          email
          imageUri
          createdAt
          updatedAt
          listing {
            items {
              updatedAt
              title
              price
              longitude
              latitude
              images
              id
              description
              createdAt
              category
            }
          }
        }
        updatedAt
      }
      nextToken
    }
  }
`;
