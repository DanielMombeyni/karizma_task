const PathConstants = {
    Home: "/",
    // Authentication
    Authentication: "/authentication",
    SignUp: "/authentication/signup",
    SignIn: "/authentication/sign-in",
    Logout: "/authentication/logout",
    // Authentication End
    DashBoard: "/dashboard",
    Chart: "/dashboard/chart",
    Card: "/dashboard/card",
    DeleteCard: "/dashboard/card/delete/:productId",

    About: "/about",
    // Page NotFound or Product NotFound
    ProductNotFound: "/product-not-found",
    PageNotFound: "/page-not-found",
};

export default PathConstants;
