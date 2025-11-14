import { useState } from "react";
import api from "../../lib/axios";
import { Trash2, Upload, Loader2 } from "lucide-react";

export default function Attachments({ task, onUpdate }) {
  const [loading, setLoading] = useState(false);

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const form = new FormData();
    form.append("file", file);

    const { data } = await api.post(`/api/attachments/${task._id}`, form, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    onUpdate();
    setLoading(false);
  };

  const removeFile = async (file) => {
    await api.delete(`/api/attachments/${task._id}/${file.publicId}`);
    onUpdate();
  };

  return (
    <div className="mt-4">
      <label className="font-semibold">Attachments</label>

      <div className="mt-2 p-4 border rounded-xl bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center gap-3">
          <input id="upload" type="file" className="hidden" onChange={uploadFile} />
          <label
            htmlFor="upload"
            className="cursor-pointer px-3 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Upload size={18} />} Upload File
          </label>
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {task.attachments?.map(att => (
            <div key={att.publicId} className="p-3 bg-white dark:bg-gray-900 rounded-lg shadow">
              <p className="text-sm font-medium truncate">{att.filename}</p>
              <p className="text-xs opacity-70">{(att.size/1024).toFixed(1)} KB</p>

              <a className="text-blue-500 text-sm" href={att.url} target="_blank">View</a>

              <button
                onClick={() => removeFile(att)}
                className="mt-2 text-red-500 flex items-center gap-1 text-sm"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
