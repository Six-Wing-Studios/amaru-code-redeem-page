import './App.css'
import LoginPage from './Screens/LoginPage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <LoginPage />
      <ToastContainer 
        theme='colored'
        position='top-center'
      />
    </>
  );
}

export default App
