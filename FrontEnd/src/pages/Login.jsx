import React, { useState } from "react";
import Navbar from '../components/NavBar.jsx';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthTokens, setAccount } from "../utils/store/auth.js";
import { useFormik } from "formik";
import { axiosService } from "../utils/api/apiConfig.js";
import PathConstants from "../utils/path/path.js";
import * as Yup from 'yup';


const Login = () => {
    const account = useSelector((state) => state.auth.account)
    if (account) {
        navigate(PathConstants.DashBoard)
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const handleSubmit = (phone, password) => {
        // e.preventDefault();
        axiosService
            .post('/api/auth/login/', { phone, password })
            .then((res) => {
                dispatch(
                    setAuthTokens({
                        token: res.data.access,
                        refreshToken: res.data.refresh,
                    })
                );
                const { token } = res.data;
                localStorage.setItem('token', token);
                dispatch(setAccount(res.data.user));
                navigate(PathConstants.DashBoard);
            })
            .catch((err) => {

                setMessage(`${err.response.data.detail}`);
            });
    }
    const formik = useFormik({
        initialValues: {
            phone: "",
            password: "",
        },
        onSubmit: (value) => {
            handleSubmit(value.phone, value.password);
        },
        validationSchema: Yup.object({
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
                            Sign in to your account
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="pt-5">
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                    <input name="phone" type="text" value={formik.values.phone} onChange={formik.handleChange} className="grow" placeholder="Phone without 0" />
                                </label>
                                <p className="text-center text-red-600">{message}</p>
                            </div>
                            <div className="pt-5">
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                    <input name="password" type="password" value={formik.values.password} onChange={formik.handleChange} className="grow" placeholder="Password" />
                                </label>
                                <p className="text-center text-red-600">{message}</p>
                            </div>
                        </div>
                        <div className="pt-5">
                            <button type="submit" className="btn  btn-info w-full">Sign in</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
