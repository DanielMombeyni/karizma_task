import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/NavBar.jsx';
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { axiosService } from "../utils/api/apiConfig.js";
import { setAuthTokens, setAccount } from "../utils/store/auth.js";
import PathConstants from "../utils/path/path.js";
import * as Yup from 'yup';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const account = useSelector((state) => state.auth.account)
    if (account) {
        navigate(PathConstants.DashBoard)
    }

    const handleSubmit = (email, username, phone, password, is_active = true) => {
        // e.preventDefault();
        axiosService
            .post('/api/auth/register/', { email, username, phone, password, is_active })
            .then((res) => {
                dispatch(
                    setAuthTokens({
                        token: res.data.access,
                        refreshToken: res.data.refresh,
                    })
                );

                dispatch(setAccount(res.data.user));
                navigate(PathConstants.DashBoard);
            })
            .catch((err) => {

                setMessage(`${err.response.data.detail}`);
            });
    }
    const formik = useFormik({
        initialValues: {
            email: "",
            username: "",
            phone: "",
            password: "",
        },
        onSubmit: (value) => {

            handleSubmit(value.email, value.username, value.phone, value.password);
        },
        validationSchema: Yup.object({
            email: Yup.string().email().trim().required("This Field required"),
            username: Yup.string().trim().required("This Field required"),
            phone: Yup.string().trim().required("This Field required"),
            password: Yup.string().trim().required("This Field required")
        })
    });

    return (
        <>
            <Navbar />
            <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8 bg-gray-300 rounded-lg p-10">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Create a new account
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="pt-5">
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                    <input name="email" type="email" value={formik.values.email} onChange={formik.handleChange} className="grow" placeholder="Email" />
                                </label>
                            </div>
                            <div className="pt-5">
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                    <input name="phone" type="text" value={formik.values.phone} onChange={formik.handleChange} className="grow" placeholder="Phone without 0" />
                                </label>
                            </div>
                            <div className="pt-5">
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                    <input name="username" type="text" value={formik.values.username} onChange={formik.handleChange} className="grow" placeholder="Username" />
                                </label>
                            </div>
                            <div className="pt-5">
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                    <input name="password" type="password" value={formik.values.password} onChange={formik.handleChange} className="grow" placeholder="Password" />
                                </label>
                            </div>
                            <p className="text-center text-red-500">{message}</p>
                        </div>
                        <div className="pt-5">
                            <button type="submit" className="btn  btn-info w-full">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default SignUp;