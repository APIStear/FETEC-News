import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import {isAdminUser} from './TokenUtilities';
import { useEffect } from 'react';

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard | CE News'
  }, [])
  return isAdminUser() ? ( 
    <AdminDashboard/>
  ) : (
    <UserDashboard/>
  );
}

export default Dashboard;