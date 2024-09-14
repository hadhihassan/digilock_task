import { useContext } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../../services/AuthService';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { AuthContext } from '../../context/AuthContext';
import { Link } from "react-router-dom";
import { AxiosError } from 'axios'


interface loginResponse {
    username: string
    role: string
    message: string
    success: string
    token: string

}

export default function Login() {

    const navigate = useNavigate()
    const { login } = useContext(AuthContext);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required')
        }),

        onSubmit: async (values) => {
            console.log("SDfds")
            try {

                const { data }: { data: loginResponse } = await loginUser(values)
                
                if (!data.success) {
                    return toast(data.message)
                }

                const token = data?.token;
                localStorage.setItem("token", token);

                const username = data.username ?? '';
                const role = data.role ?? '';

                toast(data.message);
                login({ name: username, role });
                localStorage.setItem("auth", JSON.stringify({ name: username, role }));
                navigate("/");
            } catch (error: AxiosError) {
                
                const { data } = error?.response
                if (data?.errors?.length > 0) {
                    return toast.error(data.errors.map(err => err.msg).join(", "));
                }
                let errorMessage = "Account Created Failed";
                errorMessage = data.message || 'Internal Server error';
                toast.error(errorMessage)
            }
        }
    });

    return (
        <div className='h-[65vh] w-[30vw] flex justify-center items-center'>
            <div className="form-container -700 h-[65vh] w-[30vw] flex-row pt-10 justify-center items-center">
                <div className="">
                    <div className=" font-semibold text-2xl mt-2 md:text-1xl [text-wrap:balance] bg-clip-text text-transparent bg-black text-center">
                        Login
                    </div>
                </div>
                <form onSubmit={formik.handleSubmit} className='p-5'>
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
                        <label htmlFor="password" className="block text-black">Password</label>
                        <input
                            id="password"
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
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-violet-600 hover:bg-violet-700 text-black font-semibold rounded-lg transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <div className='text-center font-sans font-semibold'>
                    <p>dont have an accound <Link to="/register" className='text-blue-500 hover:cursor-pointer'>Register</Link></p>
                </div>
            </div>
        </div>
    )
}