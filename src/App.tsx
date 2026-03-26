import { useCallback, useEffect, useRef, useState } from "react";
import type { Book, Section } from "@/lib/types";
import {
  searchBooks,
  fetchDefaultBooks,
  fetchBooksByGenre,
} from "@/lib/api";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { SearchBar } from "@/components/SearchBar";
import { BookGrid } from "@/components/BookGrid";
import { Player } from "@/components/Player";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Headphones } from "lucide-react";

export function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  const hasLoadedOnce = useRef(false);

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const currentSection: Section | null =
    selectedBook?.sections?.[currentSectionIndex] ?? null;

  const handleSectionEnd = useCallback(() => {
    if (!selectedBook) return;
    if (currentSectionIndex < selectedBook.sections.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
    }
  }, [selectedBook, currentSectionIndex]);

  const audio = useAudioPlayer(handleSectionEnd);

  const { setSource, play } = audio;
  const sectionId = currentSection?.id;
  const sectionUrl = currentSection?.listen_url;
  useEffect(() => {
    if (sectionId && sectionUrl) {
      setSource(sectionUrl);
      play();
    }
  }, [sectionId, sectionUrl, setSource, play]);

  useEffect(() => {
    setIsLoading(true);
    fetchDefaultBooks()
      .then(setBooks)
      .finally(() => {
        setIsLoading(false);
        hasLoadedOnce.current = true;
      });
  }, []);

  const loadGenre = useCallback(async (genre: string | null) => {
    setActiveGenre(genre);
    setHasSearched(false);
    setIsLoading(true);

    const results = genre
      ? await fetchBooksByGenre(genre)
      : await fetchDefaultBooks();

    setBooks(results);
    setIsLoading(false);
  }, []);

  const handleSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setHasSearched(false);
        setIsLoading(true);
        const results = activeGenre
          ? await fetchBooksByGenre(activeGenre)
          : await fetchDefaultBooks();
        setBooks(results);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setHasSearched(true);
      const results = await searchBooks(query);
      setBooks(results);
      setIsLoading(false);
    },
    [activeGenre],
  );

  const handleSelectBook = useCallback(
    (book: Book) => {
      if (selectedBook?.id === book.id) return;
      setSelectedBook(book);
      setCurrentSectionIndex(0);
    },
    [selectedBook?.id],
  );

  const handlePrevSection = useCallback(() => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex((prev) => prev - 1);
    }
  }, [currentSectionIndex]);

  const handleNextSection = useCallback(() => {
    if (!selectedBook) return;
    if (currentSectionIndex < selectedBook.sections.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
    }
  }, [selectedBook, currentSectionIndex]);

  const handleClosePlayer = useCallback(() => {
    audio.pause();
    setSelectedBook(null);
    setCurrentSectionIndex(0);
  }, [audio]);

  const heading = hasSearched
    ? "Search results"
    : activeGenre
      ? activeGenre
      : "Popular audiobooks";

  const isInitialLoad = isLoading && !hasLoadedOnce.current;

  if (isInitialLoad) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background">
        <div className="relative flex items-center justify-center">
          <span className="absolute size-16 animate-ping rounded-full bg-primary/10" />
          <span className="absolute size-16 animate-pulse rounded-full bg-primary/5" />
          <div className="relative flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <Headphones className="size-7 text-primary" />
          </div>
        </div>
        <div className="space-y-1.5 text-center">
          <p className="text-lg tracking-tight text-foreground">Audiobooks</p>
          <p className="text-sm text-muted-foreground">
            Loading your library...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-background">
      <header className="border-b border-border/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-8">
          <div className="flex items-center gap-2.5 text-foreground">
            <Headphones className="size-5" />
            <h1 className="text-lg tracking-tight">Audiobooks</h1>
          </div>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </header>

      <main
        className={`mx-auto max-w-7xl px-4 py-6 ${selectedBook ? "pb-32" : ""}`}
      >
        {!hasSearched && (
          <div className="mb-6">
            <CategoryFilter
              activeGenre={activeGenre}
              onSelect={loadGenre}
              disabled={isLoading}
            />
          </div>
        )}

        {books.length > 0 && (
          <p className="mb-4 text-sm text-muted-foreground">{heading}</p>
        )}

        <BookGrid
          books={books}
          onSelect={handleSelectBook}
          selectedBookId={selectedBook?.id ?? null}
          isLoading={isLoading}
        />
      </main>

      {selectedBook && currentSection && (
        <Player
          book={selectedBook}
          currentSection={currentSection}
          currentSectionIndex={currentSectionIndex}
          audio={audio}
          onPrevSection={handlePrevSection}
          onNextSection={handleNextSection}
          onClose={handleClosePlayer}
        />
      )}
    </div>
  );
}

export default App;
