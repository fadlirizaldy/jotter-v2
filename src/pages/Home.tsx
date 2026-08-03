import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import Layout from "../components/Layout";
import Tabs from "../components/Tabs";
import NoteCard from "../components/NoteCard";
import {
  archiveNote,
  deleteNote,
  getActiveNotes,
  getArchivedNotes,
  unarchiveNote,
} from "../utils/api";
import type { INote } from "../utils/type";
import ModalCreate from "../components/ModalCreate";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<INote[]>([]);
  const [showCreate, setShowCreate] = useState(false);

  const navigate = useNavigate();

  const currentTab = searchParams.get("tab") || "active";

  useEffect(() => {
    fetchNotes(currentTab);
  }, [currentTab]);

  const fetchNotes = async (status: string) => {
    if (status === "active") {
      const res = await getActiveNotes();
      if (res.error) {
        toast.error(res.message, { duration: 2500, position: "top-right" });
      }
      setData(res.data || []);
    } else if (status === "archived") {
      const res = await getArchivedNotes();
      if (res.error) {
        toast.error(res.message, { duration: 2500, position: "top-right" });
      }
      setData(res.data || []);
    }
  };

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  const tabs = [
    {
      label: "Active",
      value: "active",
    },
    {
      label: "Archived",
      value: "archived",
    },
  ];

  const onOpenNote = (noteId: string) => {
    navigate(`/note/${noteId}`);
  };

  const onArchiveNote = async (noteId: string) => {
    if (currentTab === "active") {
      const responseData = await archiveNote(noteId);
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
      setData((prevData) => prevData.filter((note) => note.id !== noteId));
    } else {
      const responseData = await unarchiveNote(noteId);
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
      setData((prevData) => prevData.filter((note) => note.id !== noteId));
    }
  };

  const onDeleteNote = async (noteId: string) => {
    const responseDelete = await deleteNote(noteId);
    if (responseDelete.error) {
      toast.error("Failed to remove", {
        duration: 1000,
        position: "top-right",
      });
      return;
    }
    toast.success("Note removed!", { duration: 1000, position: "top-right" });
    setData((prevData) => prevData.filter((note) => note.id !== noteId));
  };

  return (
    <Layout onCreate={() => setShowCreate(true)}>
      <Tabs tabs={tabs} activeTab={currentTab} onChange={handleTabChange} />

      {data?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
          {data.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onOpen={() => onOpenNote(note.id)}
              onArchive={() => onArchiveNote(note.id)}
              onUnarchive={() => onArchiveNote(note.id)}
              onDelete={() => onDeleteNote(note.id)}
            />
          ))}
        </div>
      ) : (
        <p>No notes available.</p>
      )}

      {showCreate && (
        <ModalCreate
          onClose={() => setShowCreate(false)}
          onRefetch={() => fetchNotes(currentTab)}
        />
      )}
    </Layout>
  );
};

export default Home;
