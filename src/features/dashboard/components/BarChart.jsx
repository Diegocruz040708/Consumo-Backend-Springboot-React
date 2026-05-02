export default function BarChart({ data, color = '#4f709c', maxBarHeight = 180 }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
        Sin datos disponibles
      </div>
    )
  }

  const maxVal = Math.max(...data.map((d) => d.value), 1)

  return (
    <div className="flex items-end justify-around gap-3 px-4 pt-6 pb-2" style={{ height: maxBarHeight + 50 }}>
      {data.map((item, i) => {
        const height = (item.value / maxVal) * maxBarHeight
        return (
          <div key={i} className="flex flex-col items-center flex-1 min-w-0">
            <span className="text-xs font-semibold mb-1 text-[#213555]">{item.value}</span>
            <div
              className="w-full rounded-t-md transition-all duration-500"
              style={{
                height: `${height}px`,
                backgroundColor: Array.isArray(color) ? color[i % color.length] : color,
                minWidth: '24px',
                maxWidth: '80px'
              }}
            />
            <span className="text-xs text-gray-500 mt-2 truncate w-full text-center" title={item.label}>
              {item.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
