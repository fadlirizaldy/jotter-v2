import React, { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { BookOpen, LogOut, Plus, Search } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
  isDetail?: boolean;
}

const MainLayout = ({
  children,
  isDetail,
  onCreate,
}: MainLayoutProps & { onCreate: () => void }) => {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("Success Logout");
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen bg-background"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
          <button
            // onClick={() => { setView("notes"); setTab("active"); }}
            className="flex items-center gap-2 shrink-0"
          >
            <BookOpen size={20} className="text-primary" />
            <span
              style={{ fontFamily: "'Instrument Serif', serif" }}
              className="text-xl text-foreground hidden sm:block"
            >
              Jotter
            </span>
          </button>

          {/* Search */}
          {!isDetail && (
            <div className="flex-1 max-w-sm relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                className="w-full bg-input-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                placeholder="Search notes…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          )}

          <div className="ml-auto flex items-center gap-2">
            {!isDetail && (
              <button
                onClick={onCreate}
                className="flex items-center gap-1.5 text-sm bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-amber-400 transition-colors font-semibold"
              >
                <Plus size={15} />
                <span className="hidden sm:inline">New note</span>
              </button>
            )}
            <button
              onClick={handleLogout}
              title="Sign out"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
};

export default MainLayout;
