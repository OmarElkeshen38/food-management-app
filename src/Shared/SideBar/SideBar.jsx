import { Link, useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import styles from './SideBar.module.css';
import logo from '../../assets/images/sideBarLogo.png';
import homeIcon from '../../assets/icons/home.svg';
import usersIcon from '../../assets/icons/users.svg';
import recipesIcon from '../../assets/icons/recipes.svg';
import categoriesIcon from '../../assets/icons/category.svg';
import logoutIcon from '../../assets/icons/logout.svg';

function SideBar() {

  let navigate = useNavigate();
  let logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <>
      <Sidebar className='bg-black'>
        <Menu className='p-4'>
          <MenuItem className='p-4' icon={<img src={logo} alt='food recipe Logo' />} > </MenuItem>
          <MenuItem icon={<img src={homeIcon} alt='home icon' />} component={<Link to="/dashboard" />}> Home </MenuItem>
          <MenuItem icon={<img src={usersIcon} alt='home icon' />} component={<Link to="/dashboard/users" />}> Users </MenuItem>
          <MenuItem icon={<img src={recipesIcon} alt='home icon' />} component={<Link to="/dashboard/recipes" />}> Recipes </MenuItem>
          <MenuItem icon={<img src={categoriesIcon} alt='home icon' />} component={<Link to="/dashboard/categories" />}> Categories </MenuItem>
          <MenuItem icon={<img src={logoutIcon} alt='home icon' />}> <button className='btn btn-danger my-4' onClick={logout}>Logout</button> </MenuItem>
        </Menu>
      </Sidebar>
      
    </>
  )
}

export default SideBar
