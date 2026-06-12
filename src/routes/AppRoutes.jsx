import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "../pages/Home"
import Login from "../pages/Login"

import UserDashboard from "../pages/UserDashboard"
import CoachDashboard from "../pages/CoachDashboard"
import AdminDashboard from "../pages/AdminDashboard"

import UserLayout from "../components/UserLayout"
import CoachLayout from "../components/CoachLayout"
import AdminLayout from "../components/AdminLayout"

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

                <Route path="/user" element={<UserLayout />}>
                    <Route path="dashboard" element={<UserDashboard />} />
                </Route>

                <Route path="/coach" element={<CoachLayout />}>
                    <Route path="dashboard" element={<CoachDashboard />} />
                </Route>

                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes