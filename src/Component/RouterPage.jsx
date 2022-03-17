import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sign from './Sign';
import Register from './Register';
import Forget from './Forget';
import Error from './Error';
import ControlPage from './ControlPage';
import WorkPage from './WorkPage';

function RouterPage() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WorkPage />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Forget" element={<Forget />} />
                <Route path="*" element={<Error />} />
                <Route path="/Sign" element={<Sign />} />
                <Route path="/ControlPage" element={<ControlPage />} />
                <Route path="/Header" element={<Header />} />
            </Routes>
        </Router>
    );

}

export default RouterPage;









