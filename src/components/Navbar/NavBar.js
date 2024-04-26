import React, { useState } from "react";
import './NavBar.css';

const NavBar = () => {

    const [logoutError, setLogoutError] = useState('');

    const handleLogout = async () => {
        try {
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch('http://www.localhost:4000/logout', options);
          if (response.status === 200) {
            localStorage.removeItem('token');
            // Redirect to login page after successful logout
            window.location.href = '/';
          } else {
            // Handle error if logout fails
            const data = await response.json();
            if (data.error) {
                setLogoutError(data.error);
            } else {
                setLogoutError('An error occurred during logout.');
            }
          }
        } catch (err) {
            setLogoutError('An error occurred during logout.');
        }
      };

    return(
        <nav className="navbar bg-black navbar-expand-lg py-4">
            <div className="container">
                <span className="navbar-brand title-gold-gradient fs-1 fw-medium">Gold Rate <span className="fw-light">Calculator</span></span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link text-cyan fs-5 px-4" href="#home">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-cyan fs-5 px-4" href="#market">Market</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-cyan fs-5 px-4" href="#calculator">Calculator</a>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link text-cyan fs-5 px-4" onClick={handleLogout}><a>Logout</a></button>
                            {logoutError && <p className="text-danger">{logoutError}</p>}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;
