import { useNavigate } from 'react-router-dom';
import styles from './SideBar.module.css';

function SideBar() {

  let navigate = useNavigate();
  let logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div>
      <h1>sidebar</h1>
      <button className='btn btn-danger my-4' onClick={logout}>Logout</button>
    </div>
  )
}

export default SideBar
