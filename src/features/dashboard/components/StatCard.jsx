import React from 'react'

export default function StatCard({ title, value, icon: Icon, bgColor = '#213555', iconColor = '#f5efe7' }) {
  return (
    <div className="rounded-xl p-5 shadow-md flex items-center gap-4" style={{ backgroundColor: bgColor }}>
      <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
        <Icon size={28} style={{ color: iconColor }} />
      </div>
      <div>
        <p className="text-sm opacity-80" style={{ color: iconColor }}>{title}</p>
        <p className="text-2xl font-bold" style={{ color: iconColor }}>{value}</p>
      </div>
    </div>
  )
}
