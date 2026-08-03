import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import Tabs from "../components/Tabs";
import NoteCard from "../components/NoteCard";
import { getActiveNotes, getArchivedNotes } from "../utils/api";
import { toast } from "sonner";
import type { INote } from "../utils/type";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<INote[]>([]);

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
  return (
    <Layout>
      <Tabs tabs={tabs} activeTab={currentTab} onChange={handleTabChange} />

      {data?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
          {data.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onOpen={() => {}}
              onArchive={() => {}}
              onUnarchive={() => {}}
              onDelete={() => {}}
            />
          ))}
        </div>
      ) : (
        <p>No notes available.</p>
      )}
    </Layout>
  );
};

export default Home;
