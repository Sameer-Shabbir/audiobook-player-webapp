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
      className="group text-left"
    >
      <div className="relative aspect-3/4 w-full overflow-hidden rounded-xl bg-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-black/15">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={book.title}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            loading="lazy"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <BookOpen className="size-10 text-muted-foreground/40" />
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/40 to-transparent p-3 pt-12">
          <p className="line-clamp-2 text-sm leading-snug text-white">
            {book.title}
          </p>
          <p className="mt-1 truncate text-xs text-white/60">{authorName}</p>
        </div>

        {isSelected && (
          <div className="absolute inset-0 rounded-xl ring-2 ring-primary ring-inset" />
        )}
      </div>
    </button>
  );
}
