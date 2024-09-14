import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../../services/AuthService'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import type { UserRegister } from '../../services/AuthService'

export default function Register() {

    const navigate = useNavigate()

    const formik = useFormik<UserRegister>({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .strict()
                .trim()
                .required('Name is required'),
            email: Yup.string()
                .email('Invalid email address')
                .trim()
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .trim()
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .trim()
                .required('Confirm Password is required')
        }),
        onSubmit: async (values) => {
            try {
                const { data } = await registerUser(values)
                if (!data.success) {
                    return toast(data.message)
                }
                toast((t) => (
                    <span className='flex  justify-center items-center text-sm gap-2'>
                        Accound created please login
                        <button className='bg-violet-700 text-black text-xs' onClick={() => {
                            toast.dismiss(t.id);
                            navigate("/login")
                        }}>
                            Go
                        </button>
                    </span>
                ));

                navigate("/login")
            } catch (error: any) {
                if (error?.response?.data?.errors?.length) {
                    return toast.error(error.response.data.errors.map((err: any) => err.msg).join(", "));
                }
                console.log(error)
                let errorMessage = "Account Created Failed";
                if (error?.response?.data?.message) {
                    errorMessage = error.response.data.message;
                }
                return toast.error(errorMessage || 'Internal Server error')
            }
        }
    });

    return (
        <div className='h-[65v] w-[30vw] flex justify-center items-center '>
            <div className="  h-[65vh] w-[30vw] flex-row pt-10 justify-center items-center">
                <div className="">
                    <div className=" font-semibold text-2xl mt-2 md:text-1xl [text-wrap:balance] bg-clip-text text-transparent bg-black text-center">
                        Register
                    </div>
                </div>
                <form onSubmit={formik.handleSubmit} className='p-5'>
                    <div className="mb-4 text-start">
                        <label htmlFor="name" className="block text-black">Name</label>
                        <input
                            name="name"
                            type="text"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none bg-transparent ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'
                                }`}
                            {...formik.getFieldProps('name')}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="text-red-500 text-sm">{formik.errors.name}</div>
                        ) : null}
                    </div>

                    <div className="mb-4 text-start">
                        <label htmlFor="email" className="block text-black">Email</label>
                        <input
                            name="email"
                            type="email"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none bg-transparent ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500 text-sm">{formik.errors.email}</div>
                        ) : null}
                    </div>

                    <div className="mb-4 text-start">
                        <label htmlFor="password" className="block text-black">password</label>
                        <input
                            name="password"
                            type="password"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none bg-transparent ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
                                }`}
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-red-500 text-sm">{formik.errors.password}</div>
                        ) : null}
                    </div>

                    <div className="mb-4 text-start">
                        <label htmlFor="confirmPassword" className="block text-black">Confirm Password</label>
                        <input
                            name="confirmPassword"
                            type="password"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none bg-transparent ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                }`}
                            {...formik.getFieldProps('confirmPassword')}
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
                        ) : null}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-violet-600 hover:bg-violet-700 text-black font-semibold rounded-lg transition duration-300"
                    >
                        Register
                    </button>
                </form>
                <div className='text-center font-sans font-semibold'>
                    <p> have an accound <span className='text-blue-500 hover:cursor-pointer' onClick={() => navigate("/login")}>Login</span></p>
                </div>
            </div>
        </div>
    )
}