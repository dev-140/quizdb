import React from 'react';

function Footer() {
    return (
        <div className="footer-main w-100 d-flex justify-content-center align-items-center">
            <p className="author-text me-3 mb-0">@Rox M.</p>
            <a href="https://github.com/dev-140">
                <i className="bi bi-github me-3"></i>
            </a>
            <a href="mailto: roxmarzan14@gmail.com">
                <i className="bi bi-envelope"></i>
            </a>
        </div>
    );
}

export default Footer;
