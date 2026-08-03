import { Archive } from "lucide-react";

const Tabs = ({
  tabs,
  activeTab,
  onChange,
}: {
  tabs: Array<{ label: string; value: string }>;
  activeTab: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="flex gap-1 mt-6 mb-6 border-b border-border">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
            tab.value === activeTab
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab.value === "archived" && <Archive size={14} />}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
