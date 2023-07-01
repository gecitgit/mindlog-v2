import { Outlet, Navigate } from "react-router-dom";

function HomeBody() {
    return (
        <div className="pageBody">
            <Navigate to="/welcome" />
            <p>HomeBody component chiming in</p>
            <Outlet />
        </div>
    )
}
export default HomeBody;