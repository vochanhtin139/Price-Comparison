import * as yup from 'yup'

export const userSchema = yup.object({
    id: yup.string(),
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    phoneNumber: yup.string().required('Phone number is required'),
    isActive: yup.boolean().required('Active status is required'),
    role: yup.string().oneOf(['ADMIN', 'USER'], 'Role must be either ADMIN or USER').required('Role is required'),
})

export type userInputs = yup.InferType<typeof userSchema>
