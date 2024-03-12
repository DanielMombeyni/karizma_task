import { useState, useEffect } from "react";
import SideBard from "../components/SideBar.jsx"
import Card from "../components/Card.jsx";
import AddCard from "../components/AddCard.jsx";
import { getStocks } from "../utils/api/productsApi.js";
import { ToastContainer } from 'react-toastify';

const DashBoard = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const StockData = await getStocks();
            setProducts(StockData);
        };

        fetchData();
    }, [])
    return (
        <div className="flex flex-row h-screen">
            <SideBard />
            <div className="flex flex-col overflow-auto w-full p-5 my-10 mx-10 bg-slate-600 bg-opacity-10 rounded-xl">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {products.map(product => <Card {...product} key={product.id} />)}
                    <AddCard />
                </div>
            </div>

            <ToastContainer position="bottom-right" />
        </div>

    )
}

export default DashBoard;