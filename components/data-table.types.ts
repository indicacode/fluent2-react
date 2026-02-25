export type User = {
  id: number
  firstName: string
  lastName: string
  age: number
  email: string
}

export type UserResponse = {
  limit: number
  skip: number
  total: number
  users: User[]
}

// export async function fetchDataTableUsers(
//   pageIndex: number,
//   pageSize: number
// ): Promise<Array<{}>> {
//   pageIndex *= 10
//   const response = await fetch(
//     `https://dummyjson.com/users?limit=${pageSize}&skip=${pageIndex}`
//   )
//     .then((r) => r.json())
//     .catch((cause) => console.error(cause))
//   return response.users
// }
