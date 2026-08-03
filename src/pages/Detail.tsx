import React, { useEffect, useState } from "react";
import type { INote } from "../utils/type";
import { useNavigate, useParams } from "react-router-dom";
import { showFormattedDate } from "../utils";
import { Archive, ArrowLeft, RotateCcw, Trash2 } from "lucide-react";
import { archiveNote, deleteNote, getNote, unarchiveNote } from "../utils/api";
import { toast } from "sonner";

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<INote | null>(null);
  const [isLoading, setLoading] = useState(false);

  const fetchNote = async (noteId: string) => {
    setLoading(true);
    const response = await getNote(noteId);
    if (response.error) {
      toast.error("Failed to fetch note", {
        duration: 1000,
        position: "top-right",
      });
      setData(null);
    } else {
      setData(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchNote(id);
    }
  }, [id]);

  const onBack = () => {
    navigate(-1);
  };

  const onArchive = async () => {
    const responseData = await archiveNote(id || "");
    if (responseData?.error) {
      toast.error("There's an error", {
        duration: 2500,
        position: "top-right",
      });
      return;
    }
    toast.success("Note archived successfully", {
      duration: 2500,
      position: "top-right",
    });
    setData((prevData) => (prevData ? { ...prevData, archived: true } : null));
  };

  const onUnarchive = async () => {
    const responseData = await unarchiveNote(id || "");
    if (responseData?.error) {
      toast.error("There's an error", {
        duration: 2500,
        position: "top-right",
      });
      return;
    }
    toast.success("Note unarchived successfully", {
      duration: 2500,
      position: "top-right",
    });
    setData((prevData) => (prevData ? { ...prevData, archived: false } : null));
  };

  const onDelete = async () => {
    const responseDelete = await deleteNote(id || "");
    if (responseDelete.error) {
      toast.error("Failed to remove", {
        duration: 1000,
        position: "top-right",
      });
      return;
    }
    toast.success("Note removed!", { duration: 1000, position: "top-right" });
    navigate(data?.archived ? "/?tab=archived" : "/?tab=active");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {isLoading ? (
        "Loading.."
      ) : data ? (
        <>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to notes
          </button>

          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="flex items-start justify-between gap-4 mb-6">
              <h1
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="text-3xl text-foreground leading-tight flex-1"
              >
                {data?.title}
              </h1>
              <div className="flex items-center gap-2 shrink-0">
                {data?.archived ? (
                  <button
                    onClick={onUnarchive}
                    className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    <RotateCcw size={13} /> Unarchive
                  </button>
                ) : (
                  <button
                    onClick={onArchive}
                    className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Archive size={13} /> Archive
                  </button>
                )}
                <button
                  onClick={onDelete}
                  className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg bg-muted text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
              <span className="text-xs text-muted-foreground">
                {data ? showFormattedDate(data.createdAt) : ""}
              </span>
            </div>

            <div className="text-foreground text-base leading-relaxed whitespace-pre-wrap">
              {data?.body}
            </div>
          </div>
        </>
      ) : (
        <p>Note not found.</p>
      )}
    </div>
  );
};

export default Detail;
