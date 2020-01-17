import React from 'react';

function Footer(props) {
    return (
        <div className="footer">
            <p>Created by &copy; {props.username}</p>
        </div>
    )
}

export default Footer;