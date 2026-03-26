import { BookOpen } from "lucide-react";
import type { Book } from "@/lib/types";
import { getAuthorName, getCoverUrl } from "@/lib/types";

interface BookCardProps {
  book: Book;
  onSelect: (book: Book) => void;
  isSelected: boolean;
}

export function BookCard({ book, onSelect, isSelected }: BookCardProps) {
  const coverUrl = getCoverUrl(book);
  const authorName = getAuthorName(book);

  return (
    <button
      type="button"
      onClick={() => onSelect(book)}
      className={`group flex flex-col items-start gap-3 rounded-xl p-3 text-left transition-all duration-200 hover:bg-accent/60 ${
        isSelected ? "bg-accent/80 ring-1 ring-border" : ""
      }`}
    >
      <div className="aspect-3/4 w-full overflow-hidden rounded-lg bg-muted">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={book.title}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <BookOpen className="size-10 text-muted-foreground/40" />
          </div>
        )}
      </div>

      <div className="w-full space-y-1">
        <p className="line-clamp-2 text-sm leading-snug text-foreground">
          {book.title}
        </p>
        <p className="truncate text-xs text-muted-foreground">{authorName}</p>
      </div>
    </button>
  );
}
