import { NavLink , Link} from 'react-router-dom';
import { startLogout } from "../../store/auth/thunks";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../Assets/kruger-logo.png"
const Navbar = () =>{

    const dispatch = useDispatch();
	const { displayName } = useSelector((state) => state.auth);

    const onLogout = () => {
		dispatch(startLogout());
	}

    return(
        <div className="navbar bg-gradient-to-r from-rose-100 to-teal-100">
            <div className="navbar-start">
                <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <NavLink to='/home'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/about'>About us</NavLink>
                    </li>
                    <li>
                        <NavLink to='/contact'>Contact</NavLink>
                    </li>
                </ul>
                </div>
                <img src={logo} className="w-12 mx-2" alt='logo'/>
                <p className="font-medium text-xl">CookBook</p>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <NavLink to='/home'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/about'>About us</NavLink>
                    </li>
                    <li>
                        <NavLink to='/contact'>Contact</NavLink>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="avatar placeholder">
                        <div className=" cursor-pointer bg-info text-neutral-content rounded-full w-12 ">
                            <span className="text-xl ">{displayName.substring(0,2)}</span>
                        </div>
                    </label> 
                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                        <li><Link className='link link-hover' to='/recipeBook'>My Recipes</Link></li>
                        <li><Link className='link link-hover' onClick={onLogout}>Logout</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}   
export default Navbar;