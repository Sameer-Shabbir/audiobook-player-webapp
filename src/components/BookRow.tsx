import { BookOpen } from "lucide-react";
import { motion } from "motion/react";
import type { Book } from "@/lib/types";
import { getAuthorName, getCoverUrl } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { staggerContainer, staggerItem, tapScale } from "@/lib/animations";

interface BookRowProps {
  title: string;
  books: Book[];
  onSelect: (book: Book) => void;
  isLoading: boolean;
}

const SKELETON_KEYS = ["rs1", "rs2", "rs3", "rs4", "rs5", "rs6", "rs7", "rs8"];

function RowCardSkeleton() {
  return (
    <>
      {SKELETON_KEYS.map((key) => (
        <div key={key} className="w-36 shrink-0 sm:w-40">
          <Skeleton className="aspect-3/4 w-full rounded-xl" />
        </div>
      ))}
    </>
  );
}

function RowCard({
  book,
  onSelect,
}: {
  book: Book;
  onSelect: (book: Book) => void;
}) {
  const coverUrl = getCoverUrl(book);
  const authorName = getAuthorName(book);

  return (
    <motion.button
      type="button"
      variants={staggerItem}
      {...tapScale}
      onClick={() => onSelect(book)}
      className="group w-40 shrink-0 sm:w-44"
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
            <BookOpen className="size-8 text-muted-foreground/30" />
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/40 to-transparent p-3 pt-12">
          <p className="line-clamp-2 text-sm leading-snug text-white">
            {book.title}
          </p>
          <p className="mt-1 truncate text-xs text-white/60">
            {authorName}
          </p>
        </div>
      </div>
    </motion.button>
  );
}

export function BookRow({ title, books, onSelect, isLoading }: BookRowProps) {
  if (!isLoading && books.length === 0) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base text-foreground">{title}</h3>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 sm:-mx-6 sm:px-6"
      >
        {isLoading ? (
          <RowCardSkeleton />
        ) : (
          books.map((book) => (
            <RowCard key={book.id} book={book} onSelect={onSelect} />
          ))
        )}
      </motion.div>
    </section>
  );
}
