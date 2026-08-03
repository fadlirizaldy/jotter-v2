import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { addNote } from "../utils/api";

interface ModalCreateProps {
  onClose: () => void;
  onRefetch?: () => void;
}

const ModalCreate = ({ onClose, onRefetch }: ModalCreateProps) => {
  const [inputData, setInputData] = useState({
    title: "",
    body: "",
  });
  const [error, setError] = useState<{ title?: string; body?: string }>({
    title: "",
    body: "",
  });

  const validateData = () => {
    const newErrors: { title?: string; body?: string } = {};

    if (inputData.title === "") {
      newErrors.title = "Please input the title";
    }
    if (inputData.body === "") {
      newErrors.body = "Please input the description";
    }
    return newErrors;
  };

  const handleCreate = async () => {
    const validationErrors = validateData();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    const responsePostData = await addNote(inputData);

    if (responsePostData.error) {
      toast.error("Failed to save the Note!", { duration: 1000 });
      return;
    }

    setInputData({ title: "", body: "" });
    onClose();
    onRefetch?.();
    toast.success("Note saved!", { duration: 2000 });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-2xl w-full max-w-lg p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2
            style={{ fontFamily: "'Instrument Serif', serif" }}
            className="text-xl text-foreground"
          >
            New note
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <input
            className="w-full bg-input-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary transition-colors font-semibold"
            placeholder="Note title"
            value={inputData.title}
            onChange={(e) =>
              setInputData({ ...inputData, title: e.target.value })
            }
            autoFocus
          />
          {error?.title && (
            <p className="text-sm text-red-500">{error?.title}</p>
          )}
          <textarea
            className="w-full bg-input-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary transition-colors resize-none"
            placeholder="Write your thoughts..."
            rows={5}
            value={inputData.body}
            onChange={(e) =>
              setInputData({ ...inputData, body: e.target.value })
            }
          />
          {error?.body && <p className="text-sm text-red-500">{error?.body}</p>}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-sm rounded-lg bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!inputData.title.trim()}
            className="flex-1 py-2.5 text-sm rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-amber-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Create note
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCreate;
