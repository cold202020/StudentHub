import { Outlet } from "react-router-dom";
import "./StudentsLayout.css";

function StudentsLayout() {
  return (
    <div className="students-layout">
      <Outlet />
    </div>
  );
}

export default StudentsLayout;