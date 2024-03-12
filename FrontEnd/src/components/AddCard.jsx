import React from 'react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { createStock } from '../utils/api/productsApi.js';
import { error, succuss } from '../utils/notification/servicesNotif.js';
import { useSelector, useDispatch } from "react-redux";

const AddCard = () => {
    const { id } = useSelector(state => state.auth.account)
    const handleSubmit = async (value) => {
        try {
            await createStock({ ...value, user: id });
            document.getElementById('my_modal_6').checked = false;
            succuss("Create a new Stock successfully.")
        } catch (err) {
            console.error("Failed to create: ", err);
            error(`Failed to create: ${err.message}`);
        }
    }

    const formik = useFormik({
        initialValues: {
            stock: "",
            stock_price: "",
            amount: "",
            trade_type: ""
        },
        onSubmit: (value) => {
            console.log(value)
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
        <div className="bg-gray-800 my-5  shadow-md rounded-lg p-4">
            <label htmlFor="my_modal_6"><img className="p-16" src="/images/svg/plus-xxs-svgrepo-com.svg" /></label>
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
                <form onSubmit={formik.handleSubmit}>
                    <div className="modal-box flex flex-col">
                        <h3 className="font-bold text-lg">Create Stock</h3>
                        <div className="divider"></div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 grid-auto-flow-column '>
                            <label className="form-control w-full max-w-xs p-2">
                                <div className="label">
                                    <span className="label-text">Stock</span>
                                </div>
                                <input type="text" name='stock' value={formik.values.stock} placeholder="Stock" className="input input-bordered w-full max-w-xs" onChange={formik.handleChange} />
                            </label>
                            {/* {formik.errors.stock && <p className="text-red-500">{formik.errors.stock}</p>} */}
                            <label className="form-control w-full max-w-xs p-2">
                                <div className="label">
                                    <span className="label-text">Trade Type</span>
                                </div>
                                <select name="trade_type" value={formik.values.trade_type} className="select select-bordered w-full max-w-xs" onChange={formik.handleChange}  >
                                    <option value="">Select Trade Type</option>
                                    <option value={"BUY"}>Buy</option>
                                    <option value={"SELL"}>Sell</option>
                                </select>

                            </label>
                            {/* {formik.errors.trade_type && <p className="text-red-500">{formik.errors.trade_type}</p>} */}
                            <label className="form-control w-full max-w-xs p-2">
                                <div className="label">
                                    <span className="label-text">Stock Price</span>
                                </div>
                                <input type="text" name='stock_price' value={formik.values.stock_price} placeholder="Stock Price" className="input input-bordered w-full max-w-xs" onChange={formik.handleChange} />
                            </label>
                            {/* {formik.errors.stock_price && <p className="text-red-500">{formik.errors.stock_price}</p>} */}
                            <label className="form-control w-full max-w-xs p-2">
                                <div className="label">
                                    <span className="label-text">Amount</span>
                                </div>
                                <input type="text" name='amount' value={formik.values.amount} placeholder="Amount" className="input input-bordered w-full max-w-xs" onChange={formik.handleChange} />
                            </label>
                            {/* {formik.errors.amount && <p className="text-red-500">{formik.errors.amount}</p>} */}
                        </div>

                        <div className="modal-action ">
                            <button type='submit' className="btn btn-success font-bold text-white">submit</button>
                            <label htmlFor="my_modal_6" className="btn btn-neutral text-white">Close!</label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCard;