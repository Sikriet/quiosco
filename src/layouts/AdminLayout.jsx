import { Outlet } from 'react-router-dom';
import Modal from 'react-modal';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AdminSidebar from "../components/AdminSidebar";
import { useAuth } from '../hooks/useAuth';

Modal.setAppElement('#root')

export default function AdminLayout() {

    useAuth({middleware: 'admin'});

    return (
        <>
            <div className="md:flex">
            <AdminSidebar />

            <main className="flex-1 h-screen overflow-y-scroll bg-gray-100 p-3">
                <Outlet />
            </main>
            </div>

            <ToastContainer />
        </>
    );
}
