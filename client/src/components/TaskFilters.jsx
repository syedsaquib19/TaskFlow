export default function TaskFilters({ status, priority, q, onChange }) {
  return (
    <div className="grid sm:grid-cols-4 gap-3 mb-4">
      <select value={status} onChange={e=>onChange({ status: e.target.value })} className="card px-3 py-2">
        <option value="">All Status</option>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <select value={priority} onChange={e=>onChange({ priority: e.target.value })} className="card px-3 py-2">
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input value={q} onChange={e=>onChange({ q: e.target.value })} placeholder="Search title..." className="card px-3 py-2" />
      <button onClick={()=>onChange({ status:'', priority:'', q:'' })} className="btn btn-outline">Reset</button>
    </div>
  );
}
