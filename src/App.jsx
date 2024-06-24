import "./App.css";
import { Route, Routes } from "react-router-dom";
// global
import Form from "./components/Authentication/Authentication";
import Error from "./components/Error/Error";
// dashboard
import DashBoard from "./components/DashBoard/DashBoard";
import Home from "./components/DashBoard/Home/Home";
import CreateBranch from "./components/DashBoard/create/Branches/CreateBranch";
import BranchesList from "./components/DashBoard/List/Branches/BranchesList";
import BranchesEdit from "./components/DashBoard/Edit/BranchesEdit/BranchesEdit";
import CreateUser from "./components/DashBoard/create/Users/CreateUser";
import UsersList from "./components/DashBoard/List/Users/UsersList";
import UsersEdit from "./components/DashBoard/Edit/UserEdit/UsersEdit";
import AnalysesList from "./components/DashBoard/List/Analyses/AnalysesList";
import AnalysesCreate  from "./components/DashBoard/create/Analyses/AnalysesCreate";
import AnalysesEdit from "./components/DashBoard/Edit/AnalysesEdit/AnalysesEdit";
// patients
import Main from "./components/Patients/Main";
import Profile from "./components/Patients/Profile/Profile";
import About from "./components/Patients/About/About";
import Contact from "./components/Patients/Contact/Contact";
import Create from "./components/Patients/Create/Create";
import Show from "./components/Patients/Show/Show";
import Edit from "./components/Patients/Edit/Edit";
// hooks
import GetRole from "./hooks/GetRole";
// protected routes
import AuthRoutes from "./utils/AuthRoutes";
import EmployeesRoutes from "./utils/EmployeesRoutes";
import DoctorsRoutes from "./utils/DoctorsRoutes";
import SupervisorsRoutes from "./utils/SupervisorsRoutes";
import BranchesRoutes from "./utils/BranchesRoutes";
import PatientsRoutes from "./utils/PatientsRoutes";


function App() {
  // const role = useSelector((state) => state.role.value)
  return(
    <>
      <GetRole></GetRole>
      <Routes>
        // global
        <Route element={<AuthRoutes></AuthRoutes>}>
        <Route path="/signUp" element={<Form  form={'Sign up'}></Form>}/>
        <Route path="/logIn" element={<Form  form={'log in'}></Form>}/>
        </Route>
        <Route path="/error" element={<Error></Error>}/>

        //employees

        <Route element={<EmployeesRoutes/>}>
          <Route path="/Dashboard" element={<DashBoard/>}>
            <Route index element={<Home />} />
            //branches
            <Route element={<BranchesRoutes/>}>
            <Route path="branches" element={<BranchesList ></BranchesList>}/>
            <Route path="branches/create" element={<CreateBranch></CreateBranch>}/>
            <Route path="branches/:id/edit" element={<BranchesEdit></BranchesEdit>}/>
            </Route>
            //supervisors
            <Route element={<SupervisorsRoutes/>}>
            <Route path="supervisors" element={<UsersList page={'supervisor'}></UsersList>}/>
            <Route path="supervisors/create" element={<CreateUser page={'supervisor'}></CreateUser>}/>
            <Route path="supervisors/:id/edit" element={<UsersEdit page={'supervisor'}></UsersEdit>}/>
            </Route>
            //doctors
            <Route element={<DoctorsRoutes/>}>
            <Route path="doctors" element={<UsersList page={'doctor'}></UsersList>}/>
            <Route path="doctors/create" element={<CreateUser page={'doctor'}></CreateUser>}/>
            <Route path="doctors/:id/edit" element={<UsersEdit page={'doctor'}></UsersEdit>}/>
            </Route>
            //patients
            <Route path="patients" element={<UsersList page={'patient'}></UsersList>}/>
            <Route path="patients/create" element={<CreateUser page={'patient'}></CreateUser>}/>
            <Route path="patients/:id/edit" element={<UsersEdit page={'patient'}></UsersEdit>}/>
            //analyses
            <Route path="analyses" element={<AnalysesList></AnalysesList>}/>
            <Route path="analyses/create" element={<AnalysesCreate></AnalysesCreate>}/>
            <Route path="analyses/:id/edit" element={<AnalysesEdit page={'analyze'}></AnalysesEdit>}/>
          </Route>
        </Route>

        //patients

        <Route element={<PatientsRoutes/>}>
            <Route path="/" element={<Main />}/>
              <Route path="/profile" element={<Profile></Profile>} />
              <Route path="/profile/edit" element={<Edit></Edit>} />
              <Route path="/about" element={<About></About>} />
              <Route path="/contact" element={<Contact></Contact>} />
              <Route path="/analyses/create" element={<Create></Create>}/>
              <Route path="/analyses/:id" element={<Show></Show>}/>

        </Route>

      </Routes>
    </>
  );
};
export default App;
