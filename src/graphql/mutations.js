/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createOrderItem = /* GraphQL */ `
  mutation CreateOrderItem(
    $input: CreateOrderItemInput!
    $condition: ModelOrderItemConditionInput
  ) {
    createOrderItem(input: $input, condition: $condition) {
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
export const updateOrderItem = /* GraphQL */ `
  mutation UpdateOrderItem(
    $input: UpdateOrderItemInput!
    $condition: ModelOrderItemConditionInput
  ) {
    updateOrderItem(input: $input, condition: $condition) {
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
export const deleteOrderItem = /* GraphQL */ `
  mutation DeleteOrderItem(
    $input: DeleteOrderItemInput!
    $condition: ModelOrderItemConditionInput
  ) {
    deleteOrderItem(input: $input, condition: $condition) {
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
export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
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
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
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
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
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
