import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { Sidebar } from './Sidebar/Sidebar'
import { MainContent } from './MainContent/MainContent'

export default function Dashboard() {
  const location = useLocation()
  const [activeTab, setActiveTab] = React.useState('overview')

  if (!location.state?.analysis) {
    return <Navigate to="/" replace />
  }

  const { analysis } = location.state

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="px-6 py-8">
            <MainContent activeTab={activeTab} analysis={analysis} />
          </div>
        </main>
      </div>
    </div>
  )
}