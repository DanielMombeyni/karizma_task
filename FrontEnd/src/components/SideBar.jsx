import { Link } from "react-router-dom"
import PathConstants from "../utils/path/path.js";
import { useSelector, useDispatch } from "react-redux";
const Sidebar = () => {
    const { username } = useSelector(state => state.auth.account)
    return (
        <div className="flex flex-row bg-gray-800 text-gray-100">
            <aside className="flex flex-col h-screen  w-20  items-center border-r border-gray-800 bg-gray-900">
                <nav className="flex flex-1 flex-col gap-y-4 pt-10">
                    <Link to={PathConstants.Home} className="group relative rounded-xl bg-gray-300 p-2 text-blue-600 hover:bg-gray-50">
                        <img className="h-6 w-6 stroke-current group-hover:text-blue-600" src="/images/svg/home-house-svgrepo-com.svg" />

                        <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
                            <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                                <div className="absolute inset-0 -left-1 flex items-center">
                                    <div className="h-2 w-2 rotate-45 bg-white"></div>
                                </div>
                                Home
                            </div>
                        </div>
                    </Link>
                    <Link to={PathConstants.DashBoard} className="group relative rounded-xl bg-gray-300 p-2 text-blue-600 hover:bg-gray-50">
                        <svg className="h-6 w-6 stroke-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 9V15M9 12H15H9Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
                            <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                                <div className="absolute inset-0 -left-1 flex items-center">
                                    <div className="h-2 w-2 rotate-45 bg-white"></div>
                                </div>
                                Create Post
                            </div>
                        </div>
                    </Link>
                    <Link to={PathConstants.Chart} className="group relative rounded-xl bg-gray-300 p-2 hover:bg-gray-50">
                        <img className="h-6 w-6 stroke-current group-hover:text-blue-600" src="/images/svg/chart-user-square-svgrepo-com.svg" />

                        <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
                            <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                                <div className="absolute inset-0 -left-1 flex items-center">
                                    <div className="h-2 w-2 rotate-45 bg-white"></div>
                                </div>
                                Chart
                            </div>
                        </div>
                    </Link>
                </nav>

                <div className="flex flex-col items-center gap-y-4 py-10">

                    <button className="mt-2 btn btn-warning text-center ">
                        <h4 className="text-gray-700 text-wrap">{username}</h4>
                        {/* <img className="h-10 w-10 rounded-full" src="https://avatars.githubusercontent.com/u/35387401?v=4" alt="" /> */}
                    </button>
                </div>
            </aside>
        </div>

    )
}
export default Sidebar