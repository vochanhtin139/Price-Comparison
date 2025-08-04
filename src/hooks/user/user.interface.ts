export default interface IUser {
    id: string
    username: string
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
    isActive: boolean
    role: 'ADMIN' | 'USER'
}
