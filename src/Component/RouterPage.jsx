import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sign from './Sign';
import Register from './Register';
import Forget from './Forget';
import Error from './Error';
import WorkPage from './WorkPage';
import HighCtrl from './HighCtrl';
import Hall from './Hall';
import GeneralCtrl from './GeneralCtrl';
import Userset from './UserSet';
//import Test from "./Test";
//import Test2 from "./Test2";

function RouterPage() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WorkPage />} >
                    <Route index element={<Hall />} />
                    <Route path="/HighCtrl" element={<HighCtrl />} />
                    <Route path="/GeneralCtrl" element={<GeneralCtrl />} />
                    <Route path="/Userset" element={<Userset />} />
                </Route>
                <Route path="/Sign" element={<Sign />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Forget" element={<Forget />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    );

}

export default RouterPage;









