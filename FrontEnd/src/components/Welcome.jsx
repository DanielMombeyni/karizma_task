import { Link } from "react-router-dom";
import PathConstants from "../utils/path/path";

const Welcome = () => {
  return (
    <section className="flex items-center py-24 font-poppins m-auto">
      <div
        className="container p-4 mx-auto bg-cover bg-center h-44 flex items-center justify-center"
      >
        <div className="text-center">
          <h1 className="text-5xl text-white font-bold mb-4">Welcome to our Project</h1>
          <p className="text-lg text-white mb-8">any things you want</p>
          <div className="max-w-md mx-auto">
            <Link className="btn btn-outline btn-warning sm:btn-sm md:btn-md lg:btn-lg"
              to={PathConstants.DashBoard}
            >Go To Dashboard</Link>
          </div>
        </div>
      </div>
    </section>

  );
};

export default Welcome;