import { axiosService } from "./apiConfig";



export const getStocks = async () => {

    try {
        const response = await axiosService.get(
            "/api/stock-purchases/"
        )
        return response.data;
    } catch (err) {
        console.error('Error fetching Stocks:', err);
        throw err;
    }
}
export const createStock = async (formData) => {
    try {
        await axiosService.post(
            "/api/stock-purchases/",
            formData
        )
    } catch (err) {
        console.error("Error creating stock:", err)
        throw err;
    }
}
export const updateStocks = async ({ formData }) => {
    try {
        await axiosService.put(
            `/api/stock/${formData.id}/update/`, formData
        )
    } catch (err) {
        console.error("Error Message:", err)
        throw err;
    }
}

export const deleteStock = async ({ id }) => {
    try {
        await axiosService.delete(
            `/api/stock/${id}/delete/`
        )
    } catch (err) {
        console.error("Error Message:", err)
    }
}