import "../Edit.css";
import { Link } from "react-router-dom";
import Form from "../../Form/UsersForm/Form";

export default function Edit({ page }) {
  return (
    <>
      <div className="update">
        <div className="container">
          <div className="page-header">
            <Link to="/Dashboard">DASHBOARD</Link>
            <span className="slash">/</span>
            <span>{page}</span>
            <span className="slash">/</span>
            <span>update</span>
          </div>
          <Form page={"update"} type={page}></Form>
        </div>
      </div>
    </>
  );
}
