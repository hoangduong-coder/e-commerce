/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      name
      email
      address
      postalCode
      city
      phone
      orderHistory {
        id
        itemId
        discount
        total
        status
        deliveredDate
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      name
      email
      address
      postalCode
      city
      phone
      orderHistory {
        id
        itemId
        discount
        total
        status
        deliveredDate
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      name
      email
      address
      postalCode
      city
      phone
      orderHistory {
        id
        itemId
        discount
        total
        status
        deliveredDate
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateOrderItem = /* GraphQL */ `
  subscription OnCreateOrderItem(
    $filter: ModelSubscriptionOrderItemFilterInput
  ) {
    onCreateOrderItem(filter: $filter) {
      id
      productId
      quantity
      hasGuarantee
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateOrderItem = /* GraphQL */ `
  subscription OnUpdateOrderItem(
    $filter: ModelSubscriptionOrderItemFilterInput
  ) {
    onUpdateOrderItem(filter: $filter) {
      id
      productId
      quantity
      hasGuarantee
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteOrderItem = /* GraphQL */ `
  subscription OnDeleteOrderItem(
    $filter: ModelSubscriptionOrderItemFilterInput
  ) {
    onDeleteOrderItem(filter: $filter) {
      id
      productId
      quantity
      hasGuarantee
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct($filter: ModelSubscriptionProductFilterInput) {
    onCreateProduct(filter: $filter) {
      id
      model
      availability
      brand
      price
      color
      picture
      description {
        height
        weight
        depth
        characteristics
        publicationDate
        size
        compatibility
        __typename
      }
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct($filter: ModelSubscriptionProductFilterInput) {
    onUpdateProduct(filter: $filter) {
      id
      model
      availability
      brand
      price
      color
      picture
      description {
        height
        weight
        depth
        characteristics
        publicationDate
        size
        compatibility
        __typename
      }
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct($filter: ModelSubscriptionProductFilterInput) {
    onDeleteProduct(filter: $filter) {
      id
      model
      availability
      brand
      price
      color
      picture
      description {
        height
        weight
        depth
        characteristics
        publicationDate
        size
        compatibility
        __typename
      }
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
