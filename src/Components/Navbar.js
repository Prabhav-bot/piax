import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div>
            <nav className="navStyle">
                {/* <Link to={"/"} className="LS"><img src={require('../Assets/logo.png')} alt="Pentonic Logo" height="40px" width="40px" /></Link> */}
                <Link to={"/"} className="LS">Home</Link>
                <Link to={"/About"} className="LS">About</Link>
                <Link to={"/Contact"} className="LS">Contact</Link>
            <nav className="navStyle1">
                <Link to={"/Signup"} className="LS1">Signup</Link>
            </nav>
            </nav>
            
        </div>
    );
}

export default Navbar;