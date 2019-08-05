import React from 'react';

const SearchBar = (props) => (
    <nav key={props.error} className="navbar navbar-light bg-light d-flex justify-content-end">
            {(props.error.length > 0) ? (
                <div class="alert alert-danger" role="alert">
                    {props.error}
                </div>
            ) : null}
            
            <div className="form-inline my-2 my-lg-0">
                <input className="form-control" type="search" placeholder="Search" value={props.query} onChange={props.onChange} />
                <button className="btn btn-outline-secondary my-2 my-sm-0" onClick={props.onSearch}>
                    <i className="fas fa-search"></i>
                </button>
            </div>
    </nav>
);

export default SearchBar;