export const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const showFormattedDate = (date: string) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString(
    "id-ID",
    options as Intl.DateTimeFormatOptions,
  );
};

export const SAMPLE_NOTES: any[] = [
  {
    id: 1,
    title: "Project Kickoff Ideas",
    body: "Start with a clear problem statement. Define success metrics upfront. Make sure all stakeholders are aligned before the first sprint begins. Consider running a pre-mortem to surface risks early.\n\nKey questions to answer:\n- Who is the primary user?\n- What does done look like?\n- What are the hard constraints?",
    tags: ["work", "planning"],
    createdAt: "2026-06-28",
    archived: false,
  },
  {
    id: 2,
    title: "Books to Read",
    body: "- The Timeless Way of Building - Christopher Alexander\n- Thinking in Systems – Donella Meadows\n- The Design of Everyday Things – Don Norman\n- Invisible Cities – Italo Calvino\n- A Pattern Language – Christopher Alexander",
    tags: ["reading", "personal"],
    createdAt: "2026-06-25",
    archived: false,
  },
  {
    id: 3,
    title: "Coffee Ratios",
    body: "Pour-over: 1:16 ratio. 20g coffee to 320ml water at 93°C.\nBloom for 30s with 60ml, then pour in circles.\n\nEspresso: 18g in, 36g out, 28 seconds.\n\nFrench press: 1:12. Steep 4 minutes, plunge slow.",
    tags: ["recipe", "personal"],
    createdAt: "2026-06-22",
    archived: false,
  },
  {
    id: 4,
    title: "React Performance Notes",
    body: "useMemo for expensive computations only. useCallback when passing functions to memoized children. React.memo wraps the component, not the value.\n\nAvoid: Premature optimization. Profile first with React DevTools.\n\nKey insight: reconciliation cost is usually cheaper than you think.",
    tags: ["dev", "react"],
    createdAt: "2026-06-20",
    archived: false,
  },
  {
    id: 5,
    title: "Meeting Notes - June Sprint",
    body: "Attendees: Rania, Marco, Soo-Jin, Dev.\n\nDecisions made:\n- Postpone dark mode until Q3.\n- Prioritize mobile search fix.\n- Conduct user interviews before next feature cut.\n\nAction items: Rania to draft interview script by Friday.",
    tags: ["work", "meeting"],
    createdAt: "2026-06-18",
    archived: true,
  },
  {
    id: 6,
    title: "Typography Principles",
    body: "Establish hierarchy before choosing fonts. Size, weight, and spacing do more than typeface selection.\n\nSet line-height 1.5–1.6 for body. Display text can go tighter, around 1.1.\n\nLimit to two typefaces maximum. Contrast should be in function, not decoration.",
    tags: ["design"],
    createdAt: "2026-06-15",
    archived: true,
  },
];
