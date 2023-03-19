export default interface User {
  _id: string
  name: string,
  email: string,
  date_of_birth?: string,
  avatar?: string,
  address?: string,
  phone?: string,
  friends: string[],
  social: {},
  posts: string[]
}