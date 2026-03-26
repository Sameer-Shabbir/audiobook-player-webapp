import { Play, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Book } from "@/lib/types";
import { getAuthorName, getFullCoverUrl } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

interface HeroBannerProps {
  book: Book | null;
  onSelect: (book: Book) => void;
  isLoading: boolean;
}

function stripHtml(html: string): string {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

export function HeroBanner({ book, onSelect, isLoading }: HeroBannerProps) {
  if (isLoading || !book) {
    return (
      <div className="relative w-full overflow-hidden rounded-2xl bg-card">
        <div className="flex items-center gap-8 p-6 sm:p-8 lg:p-10">
          <div className="flex min-h-[200px] flex-1 flex-col justify-center gap-3">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-8 w-2/3 sm:h-10" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="mt-2 h-10 w-36 rounded-full" />
          </div>
          <Skeleton className="hidden h-[220px] w-[160px] shrink-0 rounded-lg sm:block lg:h-[260px]" />
        </div>
      </div>
    );
  }

  const coverUrl = getFullCoverUrl(book);
  const authorName = getAuthorName(book);
  const description = book.description ? stripHtml(book.description) : "";

  return (
    <div className="group relative w-full overflow-hidden rounded-2xl bg-black/90">
      {coverUrl && (
        <img
          src={coverUrl}
          alt=""
          className="absolute inset-0 size-full scale-110 object-cover blur-3xl saturate-150 opacity-60"
        />
      )}

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative flex items-center gap-8 p-6 sm:p-8 lg:p-10">
        <div className="flex min-h-[200px] flex-1 flex-col justify-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/90 px-3 py-1 text-xs text-primary-foreground">
              <BookOpen className="size-3" />
              Audiobook
            </span>
            {book.totaltime && (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs text-white/80 backdrop-blur-sm">
                <Clock className="size-3" />
                {book.totaltime}
              </span>
            )}
          </div>

          <h2 className="max-w-lg text-2xl tracking-tight text-white sm:text-3xl lg:text-4xl">
            {book.title}
          </h2>

          <p className="text-sm text-white/60">{authorName}</p>

          {description && (
            <p className="line-clamp-2 max-w-md text-sm leading-relaxed text-white/50">
              {description}
            </p>
          )}

          <div className="mt-3 flex items-center gap-3">
            <Button
              onClick={() => onSelect(book)}
              className="gap-2 rounded-full px-6"
            >
              <Play className="size-4" />
              Listen Now
            </Button>
          </div>
        </div>

        {coverUrl && (
          <div className="hidden shrink-0 sm:block">
            <img
              src={coverUrl}
              alt={book.title}
              className="h-[220px] w-auto rounded-lg object-cover shadow-2xl shadow-black/50 transition-transform duration-500 group-hover:scale-[1.03] lg:h-[260px]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
