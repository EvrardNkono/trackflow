// src/pages/AdminPage.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLayout from '../admin/AdminLayout'
import Dashboard from '../admin/Dashboard'
import CreateShipment from '../admin/CreateShipment'
import ShipmentList from '../admin/ShipmentList'
import ShipmentDetails from '../admin/ShipmentDetails'
import UpdateShipment from '../admin/UpdateShipment'

const AdminPage = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="create" element={<CreateShipment />} />
        <Route path="shipments" element={<ShipmentList />} />
        <Route path="shipment/:id" element={<ShipmentDetails />} />
        <Route path="update/:id" element={<UpdateShipment />} />
      </Routes>
    </AdminLayout>
  )
}

export default AdminPage