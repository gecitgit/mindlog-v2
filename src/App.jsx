import AuthDetails from './components/auth/AuthDetails';
import LoginUser from './components/auth/LoginUser';
import RegisterUser from './components/auth/RegisterUser';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="appBody">
      <ToastContainer 
        position="top-center"
        role="alert"
        autoClose={3000}
        transition={Slide}
      />
      <AuthDetails />
    </div>
  );
}

export default App;
