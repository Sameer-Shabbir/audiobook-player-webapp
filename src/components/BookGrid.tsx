import { motion } from "motion/react";
import type { Book } from "@/lib/types";
import { BookCard } from "./BookCard";
import { Skeleton } from "@/components/ui/skeleton";
import { staggerContainer, staggerItem } from "@/lib/animations";

interface BookGridProps {
  books: Book[];
  onSelect: (book: Book) => void;
  selectedBookId: string | null;
  isLoading: boolean;
}

const SKELETON_KEYS = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"];

function GridSkeleton() {
  return (
    <>
      {SKELETON_KEYS.map((key) => (
        <div key={key} className="flex flex-col gap-3 p-3">
          <Skeleton className="aspect-3/4 w-full rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </>
  );
}

export function BookGrid({
  books,
  onSelect,
  selectedBookId,
  isLoading,
}: BookGridProps) {
  if (!isLoading && books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-muted-foreground">No audiobooks found</p>
        <p className="mt-1 text-sm text-muted-foreground/60">
          Try a different search term
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
    >
      {isLoading ? (
        <GridSkeleton />
      ) : (
        books.map((book) => (
          <motion.div key={book.id} variants={staggerItem}>
            <BookCard
              book={book}
              onSelect={onSelect}
              isSelected={book.id === selectedBookId}
            />
          </motion.div>
        ))
      )}
    </motion.div>
  );
}
