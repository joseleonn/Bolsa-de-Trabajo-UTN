import React from 'react';
import { AdminABM, ModalCreateAdmin } from '../components';
const AdminPanel = () => {
  return (
    <div className="mt-20 ">
      <ModalCreateAdmin />

      <AdminABM />
    </div>
  );
};
export default AdminPanel;
