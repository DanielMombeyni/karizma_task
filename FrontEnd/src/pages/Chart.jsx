import SideBard from "../components/SideBar.jsx"
import CategoryChart from "../components/CategoryChart.jsx";
import PriceTrendChart from "../components/PriceTrendChart.jsx";
import ProductPriceComparisonChart from "../components/ProductPriceComparisonChart.jsx";
import ProductCategoriesChart from "../components/ProductCategoriesChart.jsx";

const Chart = () => {
    const categoryData = [
        { name: 'Category A', value: 10 },
        { name: 'Category B', value: 20 },
        { name: 'Category C', value: 30 },
    ];

    const priceTrendData = [
        { name: 'Product 1', price: 100 },
        { name: 'Product 2', price: 150 },
        { name: 'Product 3', price: 120 },
    ];

    const productPriceComparisonData = [
        { product: 'Product 1', price: 100 },
        { product: 'Product 2', price: 150 },
        { product: 'Product 3', price: 120 },
    ];
    const sampleData = [
        {
            category: 'Category A',
            product: 'Product 1',
            qty: 25,
            unitPrice: 15,
            total: 375,
            region: 'North',
            categoryRegion: 'Category A - North',
            categoryPercentage: 15,
        },
        {
            category: 'Category A',
            product: 'Product 2',
            qty: 30,
            unitPrice: 12,
            total: 360,
            region: 'North',
            categoryRegion: 'Category A - North',
            categoryPercentage: 12,
        },
        // More data entries for Category A
        {
            category: 'Category B',
            product: 'Product 1',
            qty: 18,
            unitPrice: 20,
            total: 360,
            region: 'South',
            categoryRegion: 'Category B - South',
            categoryPercentage: 20,
        },
        {
            category: 'Category B',
            product: 'Product 2',
            qty: 22,
            unitPrice: 18,
            total: 396,
            region: 'South',
            categoryRegion: 'Category B - South',
            categoryPercentage: 18,
        },
        // More data entries for Category B
        {
            category: 'Category C',
            product: 'Product 1',
            qty: 35,
            unitPrice: 10,
            total: 350,
            region: 'East',
            categoryRegion: 'Category C - East',
            categoryPercentage: 17.5,
        },
        {
            category: 'Category C',
            product: 'Product 2',
            qty: 28,
            unitPrice: 14,
            total: 392,
            region: 'East',
            categoryRegion: 'Category C - East',
            categoryPercentage: 16,
        },
        // More data entries for Category C
    ];

    return (
        <div className="flex flex-row h-screen">
            <SideBard />
            <div className="flex flex-col overflow-auto w-full p-5 my-10 mx-10 bg-slate-600 bg-opacity-10 rounded-xl">
                <div className="grid grid-cols-1 gap-5 xl:lg:grid-cols-2 grid-auto-flow-column ">
                    <div className="bg-gray-800 m-5  shadow-md rounded-lg p-4">
                        <h1 className="text-white font-bold p-2 m-2" >Product Category Chart</h1>
                        <CategoryChart data={categoryData} />
                    </div>

                    <div className="bg-gray-800 m-5  shadow-md rounded-lg p-4">
                        <h1 className="text-white font-bold p-2 m-2" >Product Price Trend Chart</h1>
                        <PriceTrendChart data={priceTrendData} />
                    </div>

                    <div className="bg-gray-800 m-5  shadow-md rounded-lg p-4">
                        <h1 className="text-white font-bold p-2 m-2" >Product Price Comparison Chart</h1>
                        <ProductPriceComparisonChart data={productPriceComparisonData} />
                    </div>

                    {/* <div className="bg-gray-800 m-5  shadow-md rounded-lg p-4">
                        <h1 className="text-white font-bold p-2 m-2" >Product Price Comparison Chart</h1>
                        <ProductCategoriesChart data={sampleData} />
                    </div> */}

                </div>
            </div>
        </div>

    )
}

export default Chart;