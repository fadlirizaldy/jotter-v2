import { Archive, RotateCcw, Trash2 } from "lucide-react";
import { showFormattedDate } from "../utils";
import type { INote } from "../utils/type";

interface NoteCardProps {
  note: INote;
  onOpen: () => void;
  onArchive: () => void;
  onUnarchive: () => void;
  onDelete: () => void;
}

const NoteCard = ({
  note,
  onOpen,
  onArchive,
  onUnarchive,
  onDelete,
}: NoteCardProps) => {
  const truncate = (text: string, max: number) =>
    text.length > max ? text.slice(0, max) + "…" : text;
  return (
    <div
      className="group bg-card border border-border rounded-xl p-5 flex flex-col gap-3 hover:border-primary/40 transition-all duration-200 cursor-pointer"
      onClick={onOpen}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-foreground font-semibold text-base leading-snug flex-1">
          {note.title || "Untitled Note"}
        </h3>
        {/* Action buttons shown on hover */}
        <div
          className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          {note.archived ? (
            <button
              onClick={onUnarchive}
              title="Unarchive"
              className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <RotateCcw size={14} />
            </button>
          ) : (
            <button
              onClick={onArchive}
              title="Archive"
              className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Archive size={14} />
            </button>
          )}
          <button
            onClick={onDelete}
            title="Delete"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <p className="text-muted-foreground text-sm leading-relaxed">
        {truncate(note.body.replace(/\n/g, " "), 100)}
      </p>

      <div className="flex items-center justify-between mt-auto pt-1">
        <span className="text-xs text-muted-foreground shrink-0">
          {showFormattedDate(note.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default NoteCard;
