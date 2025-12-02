import { ArrowLeft } from "tabler-icons-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {

    const navigate = useNavigate();

    
  return (
    <div className="max-w-8xl mx-auto">
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-[#25409C] font-semibold">404 error</p>
        <h1 className="text-6xl font-bold mb-4">Page not found</h1>
        <p>Sorry, the page you are looking for doesn't exist.</p>
        <p>Here are some helpful links:</p>

        <div className="flex gap-4 mt-6">
          <button className="flex gap-2 border p-2 px-4 text-sm rounded-md hover:cursor-pointer" onClick={() => navigate(-1)}>
            <ArrowLeft />
            Go back
          </button>
          <button className="bg-[#25409C] text-white p-2 px-3 text-sm rounded-md hover:cursor-pointer">
            <Link to="/">Take me home</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
