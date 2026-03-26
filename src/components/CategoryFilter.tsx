import { cn } from "@/lib/utils";

export interface Category {
  label: string;
  genre: string | null;
}

export const CATEGORIES: Category[] = [
  { label: "All", genre: null },
  { label: "Fiction", genre: "Fiction" },
  { label: "Science Fiction", genre: "Science Fiction" },
  { label: "Poetry", genre: "Poetry" },
  { label: "Horror", genre: "Horror" },
  { label: "Children", genre: "Children" },
  { label: "History", genre: "History" },
  { label: "Philosophy", genre: "Philosophy" },
  { label: "Biography", genre: "Biography" },
  { label: "Drama", genre: "Drama" },
  { label: "Humor", genre: "Humor" },
];

interface CategoryFilterProps {
  activeGenre: string | null;
  onSelect: (genre: string | null) => void;
  disabled?: boolean;
}

export function CategoryFilter({
  activeGenre,
  onSelect,
  disabled,
}: CategoryFilterProps) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto py-0.5">
      {CATEGORIES.map((cat) => {
        const isActive = activeGenre === cat.genre;
        return (
          <button
            key={cat.label}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(cat.genre)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 text-sm transition-all duration-200",
              "disabled:pointer-events-none disabled:opacity-50",
              isActive
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-transparent bg-transparent text-muted-foreground hover:border-border hover:text-foreground",
            )}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
