import React from 'react';
import { Link } from 'react-router-dom';
import UpdateCard from './UpdateCard';
import { deleteStock } from '../utils/api/productsApi';
import { succuss, error } from '../utils/notification/servicesNotif';

const Card = (products) => {
    const { id, stock, stock_price, amount, trade_date, trade_type } = products;
    const formattedDate = new Date(trade_date).toLocaleDateString();

    const handelDelete = ({ id }) => {
        try {
            deleteStock({ id })
            succuss(`${stock} by id ${id} successfully deleted`);

        } catch (err) {
            console.error("Error deleting stock:", err)
            error(`Delete ${stock} by id ${id} failed`)
        }
    }
    return (
        <div className="bg-gray-800 my-5  shadow-md rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-2">Stock:{stock}</h2>
            <p className="text-xl font-bold mb-2">Stock Price:{stock_price}</p>
            <p className="text-gray-200 mb-2">Stock Type:{trade_type}</p>
            <p className="text-gray-200 mb-4">Amount: {amount}</p>
            <div className='flex flex-row justify-between m-2'>
                <p className="text-gray-200 ">Date:{formattedDate}</p>
                <div className='flex sm:flex-row flex-col justify-between'>
                    <UpdateCard initialData={products} />
                    <Link className='sm:mr-2 mt-2 ' onClick={() => handelDelete({ id })}>
                        <img className='w-5 h-5 bg-red-600 rounded-md' src="/images/svg/delete-svgrepo-com.svg" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Card;