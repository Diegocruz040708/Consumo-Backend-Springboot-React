import { useEffect } from 'react'

export default function Notifications({ notifications = [], remove }) {
  useEffect(() => {
    notifications.forEach((n) => {
      if (!n._timeout) {
        const t = setTimeout(() => remove(n.id), 1500)
        n._timeout = t
      }
    })
    return () => notifications.forEach((n) => n._timeout && clearTimeout(n._timeout))
  }, [notifications, remove])

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
      {notifications.map((n) => (
        <div key={n.id} className="max-w-sm rounded-lg shadow-md px-4 py-3" style={{ background: n.type === 'success' ? '#dff3e6' : n.type === 'danger' ? '#fdecea' : '#eef6ff', borderLeft: `6px solid ${n.type === 'success' ? '#2d8a4a' : n.type === 'danger' ? '#b91c1c' : '#2b6cb0'}` }}>
          <div className="text-sm" style={{ color: '#213555' }}>{n.message}</div>
        </div>
      ))}
    </div>
  )
}
