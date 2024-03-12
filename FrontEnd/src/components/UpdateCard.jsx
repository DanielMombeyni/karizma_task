import React from 'react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { updateStocks } from '../utils/api/productsApi.js';

const UpdateCard = ({ initialData }) => {

    const handleSubmit = async (value) => {
        try {
            await updateStocks({ formData: value });
            document.getElementById('UpdateCard').checked = false;
        } catch (err) {
            console.error("Failed to update: ", err);
        }
    }
    const formik = useFormik({
        initialValues: initialData,
        onSubmit: (value) => {
            handleSubmit(value)
        },
        validationSchema: Yup.object({
            stock: Yup.string().trim().required("This Field required"),
            stock_price: Yup.string().trim().required("This Field required"),
            amount: Yup.string().trim().required("This Field required"),
            trade_type: Yup.string().trim().required("This Field required"),
        })

    })

    return (
        <div className='sm:mr-2 mt-2'>
            <label htmlFor="UpdateCard"><img className='w-5 h-5 bg-green-200 rounded-md' src="/images/svg/pen-square-svgrepo-com.svg" /></label>
            <input type="checkbox" id="UpdateCard" className="modal-toggle" />
            <div className="modal" role="dialog">
                <form onSubmit={formik.handleSubmit}>
                    <div className="modal-box flex flex-col">
                        <h3 className="font-bold text-lg">Update Post</h3>
                        <div className="divider"></div>
                        <div className='grid grid-cols-2 grid-auto-flow-column '>
                            <label className="form-control w-full max-w-xs p-2">
                                <div className="label">
                                    <span className="label-text">Stock</span>
                                </div>
                                <input type="text" name='stock' value={formik.values.stock} placeholder="Stock" className="input input-bordered w-full max-w-xs" onChange={formik.handleChange} />
                            </label>
                            <label className="form-control w-full max-w-xs p-2">
                                <div className="label">
                                    <span className="label-text">Stock Type</span>
                                </div>
                                <input type="text" name='trade_type' value={formik.values.trade_type} placeholder="Stock Type" className="input input-bordered w-full max-w-xs" onChange={formik.handleChange} />
                            </label>
                            <label className="form-control w-full max-w-xs p-2">
                                <div className="label">
                                    <span className="label-text">Stock Price</span>
                                </div>
                                <input type="text" name='stock_price' value={formik.values.stock_price} placeholder="Stock Price" className="input input-bordered w-full max-w-xs" onChange={formik.handleChange} />
                            </label>
                            <label className="form-control w-full max-w-xs p-2">
                                <div className="label">
                                    <span className="label-text">Amount</span>
                                </div>
                                <input type="text" name='amount' value={formik.values.amount} placeholder="Amount" className="input input-bordered w-full max-w-xs" onChange={formik.handleChange} />
                            </label>
                        </div>

                        <div className="modal-action ">
                            <button type='submit' className="btn btn-success font-bold text-white">submit</button>
                            <label htmlFor="UpdateCard" className="btn btn-neutral text-white">Close!</label>
                        </div>
                    </div>
                </form>
            </div>
        </div>


    );
};

export default UpdateCard;