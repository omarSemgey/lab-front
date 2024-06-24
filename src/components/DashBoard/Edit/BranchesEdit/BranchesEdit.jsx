import "../Edit.css";
import { Link } from "react-router-dom";
import Form from "../../Form/BranchesForm/Form";
export default function Edit() {
  return (
    <>
      <div className="analyses-create">
        <div className="container">
          <div className="page-header">
            <Link to="/Dashboard">DASHBOARD</Link>
            <span className="slash">/</span>
            <span>analyses</span>
            <span className="slash">/</span>
            <span>update</span>
          </div>
          <Form page={'update'} ></Form>
        </div>
      </div>
    </>
  );
}
