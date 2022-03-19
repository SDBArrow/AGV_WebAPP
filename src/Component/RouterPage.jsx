import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sign from './Sign';
import Register from './Register';
import Forget from './Forget';
import Error from './Error';
import HighCtrl from './HighCtrl';
import WorkPage from './WorkPage';

function RouterPage() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WorkPage />} >
                    <Route path="Sign" element={<Sign />} />
                    <Route path="HighCtrl" element={<HighCtrl />} />
                    <Route path="Register" element={<Register />} />
                    <Route path="Forget" element={<Forget />} />
                </Route>
                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    );

}

export default RouterPage;









