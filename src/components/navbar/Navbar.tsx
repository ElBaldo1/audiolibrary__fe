import Popup from 'components/popup/Popup';
import React from 'react';
import Menu from 'components/menu/Menu';
import SearchBar from 'components/searchbar/SearchBar';
import './Navbar.css';

function Navbar () {

    // questo componente carica il menu, la searchbar e il datepicker

    return (
        <div className={"barraIMP"}>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <Menu/>
                    <SearchBar></SearchBar>
                </div>
                <Popup/>
            </nav>
        </div>
    );
}

export default Navbar;
