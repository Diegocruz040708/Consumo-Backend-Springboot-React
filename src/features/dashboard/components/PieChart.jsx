export default function PieChart({ data, size = 180 }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
        Sin datos disponibles
      </div>
    )
  }

  const total = data.reduce((sum, d) => sum + d.value, 0)
  const radius = size / 2
  const center = size / 2

  let cumulativePercent = 0
  const colors = ['#213555', '#4f709c', '#d8c4b4', '#f5efe7', '#8a9bb0', '#6b8f71', '#c9704d']

  const segments = data.map((item, i) => {
    const percent = item.value / total
    const startAngle = cumulativePercent * 2 * Math.PI - Math.PI / 2
    cumulativePercent += percent
    const endAngle = cumulativePercent * 2 * Math.PI - Math.PI / 2

    const x1 = center + radius * 0.95 * Math.cos(startAngle)
    const y1 = center + radius * 0.95 * Math.sin(startAngle)
    const x2 = center + radius * 0.95 * Math.cos(endAngle)
    const y2 = center + radius * 0.95 * Math.sin(endAngle)

    const largeArc = percent > 0.5 ? 1 : 0

    const path = percent >= 1
      ? `M ${center} ${center - radius * 0.95} A ${radius * 0.95} ${radius * 0.95} 0 1 1 ${center - 0.01} ${center - radius * 0.95} Z`
      : `M ${center} ${center} L ${x1} ${y1} A ${radius * 0.95} ${radius * 0.95} 0 ${largeArc} 1 ${x2} ${y2} Z`

    return { path, color: colors[i % colors.length], label: item.label, value: item.value, percent }
  })

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((seg, i) => (
          <path key={i} d={seg.path} fill={seg.color} stroke="#f5efe7" strokeWidth="2" />
        ))}
        <text x={center} y={center - 6} textAnchor="middle" className="text-lg font-bold fill-[#213555]">{total}</text>
        <text x={center} y={center + 12} textAnchor="middle" className="text-xs fill-gray-500">Total</text>
      </svg>
      <div className="flex flex-col gap-2">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: seg.color }} />
            <span className="text-gray-600">{seg.label}</span>
            <span className="font-semibold text-[#213555] ml-auto">{seg.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
