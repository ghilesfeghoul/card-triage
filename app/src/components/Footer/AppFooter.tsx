import {Col} from "react-bootstrap";
import React from "react";

export default function AppFooter() {
    return (
        <footer className="footer text-center py-3 border-top bg-light">
            <Col>
               <span className="text-muted text-center">
                   © Made with ❤️ by <a title="See my LinkedIn profile"
                                        href="https://www.linkedin.com/in/ghiles-feghoul-72090a12a/"> Ghiles</a>
               </span>
            </Col>
        </footer>
    );
}