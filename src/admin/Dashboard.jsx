// src/admin/Dashboard.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Package, Truck, CheckCircle, Clock, AlertCircle, Flag, Shield } from 'lucide-react'
import useShipments from '../hooks/useShipments'

const Dashboard = () => {
  const { shipments, getStats } = useShipments()
  const [stats, setStats] = useState({
    total: 0,
    inTransit: 0,
    delivered: 0,
    pending: 0,
    delayed: 0
  })
  const [recentShipments, setRecentShipments] = useState([])
  const [priorityStats, setPriorityStats] = useState({ urgent: 0, high: 0, normal: 0, low: 0 })
  const [insuranceStats, setInsuranceStats] = useState({ none: 0, basic: 0, standard: 0, premium: 0, full: 0 })

  useEffect(() => {
    const loadStats = async () => {
      const statsData = await getStats()
      setStats(statsData)
    }
    loadStats()
  }, [getStats])

  useEffect(() => {
    setRecentShipments(shipments.slice(0, 5))
    
    // Calcul des statistiques de priorité
    const pStats = { urgent: 0, high: 0, normal: 0, low: 0 }
    const iStats = { none: 0, basic: 0, standard: 0, premium: 0, full: 0 }
    
    shipments.forEach(s => {
      // Priorités
      if (s.priority === 'urgent') pStats.urgent++
      else if (s.priority === 'high') pStats.high++
      else if (s.priority === 'low') pStats.low++
      else pStats.normal++
      
      // Assurances
      if (s.insuranceType === 'none') iStats.none++
      else if (s.insuranceType === 'basic') iStats.basic++
      else if (s.insuranceType === 'standard') iStats.standard++
      else if (s.insuranceType === 'premium') iStats.premium++
      else if (s.insuranceType === 'full') iStats.full++
    })
    
    setPriorityStats(pStats)
    setInsuranceStats(iStats)
  }, [shipments])

  const statCards = [
    { 
      label: 'Total Shipments', 
      value: stats.total, 
      icon: Package, 
      color: 'bg-blue-100 text-blue-600' 
    },
    { 
      label: 'In Transit', 
      value: stats.inTransit, 
      icon: Truck, 
      color: 'bg-purple-100 text-purple-600' 
    },
    { 
      label: 'Delivered', 
      value: stats.delivered, 
      icon: CheckCircle, 
      color: 'bg-green-100 text-green-600' 
    },
    { 
      label: 'Pending', 
      value: stats.pending, 
      icon: Clock, 
      color: 'bg-yellow-100 text-yellow-600' 
    },
    { 
      label: 'Delayed', 
      value: stats.delayed, 
      icon: AlertCircle, 
      color: 'bg-red-100 text-red-600' 
    },
  ]

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    'in-transit': 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    delayed: 'bg-red-100 text-red-800',
  }

  const priorityColors = {
    low: 'bg-gray-100 text-gray-600',
    normal: 'bg-blue-100 text-blue-600',
    high: 'bg-orange-100 text-orange-600',
    urgent: 'bg-red-100 text-red-600',
  }

  const priorityLabels = {
    low: '⚪ Low',
    normal: '🔵 Normal',
    high: '🟠 High',
    urgent: '🔴 Urgent',
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Overview of all shipments</p>
        </div>
        <Link
          to="/admin/create"
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <Package className="w-4 h-4" />
          New Shipment
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Priority & Insurance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-md p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Flag className="w-4 h-4 text-orange-500" />
            Priority Distribution
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">🔴 Urgent</span>
              <span className="font-semibold text-red-600">{priorityStats.urgent}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">🟠 High</span>
              <span className="font-semibold text-orange-600">{priorityStats.high}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">🔵 Normal</span>
              <span className="font-semibold text-blue-600">{priorityStats.normal}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">⚪ Low</span>
              <span className="font-semibold text-gray-600">{priorityStats.low}</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-orange-500" />
            Insurance Coverage
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">None</span>
              <span className="font-semibold">{insuranceStats.none}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Basic</span>
              <span className="font-semibold">{insuranceStats.basic}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Standard</span>
              <span className="font-semibold">{insuranceStats.standard}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Premium</span>
              <span className="font-semibold">{insuranceStats.premium}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Full Coverage</span>
              <span className="font-semibold">{insuranceStats.full}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Shipments */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-semibold text-gray-900">Recent Shipments</h2>
          <Link to="/admin/shipments" className="text-orange-600 hover:text-orange-700 text-sm">
            View All →
          </Link>
        </div>
        
        {recentShipments.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Package className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p>No shipments yet</p>
            <Link to="/admin/create" className="text-orange-600 hover:underline text-sm">
              Create your first shipment
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tracking</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Sender</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Recipient</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentShipments.map((shipment) => (
                  <tr key={shipment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm font-semibold text-orange-600">
                        {shipment.trackingCode}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{shipment.senderCompany || 'N/A'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{shipment.recipientName || 'N/A'}</div>
                      <div className="text-xs text-gray-500">{shipment.recipientCity || ''}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[shipment.status] || 'bg-gray-100 text-gray-800'}`}>
                        {shipment.status?.toUpperCase() || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityColors[shipment.priority] || 'bg-gray-100 text-gray-600'}`}>
                        {priorityLabels[shipment.priority] || 'Normal'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(shipment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/admin/shipment/${shipment.id}`}
                        className="text-orange-600 hover:text-orange-800 font-medium text-sm"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard