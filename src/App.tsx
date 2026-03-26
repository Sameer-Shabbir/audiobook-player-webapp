import { useCallback, useEffect, useRef, useState } from "react";
import type { Book, Section } from "@/lib/types";
import { getCoverUrl } from "@/lib/types";
import {
  searchBooks,
  fetchDefaultBooks,
  fetchBooksByGenre,
} from "@/lib/api";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { SearchBar } from "@/components/SearchBar";
import { BookGrid } from "@/components/BookGrid";
import { Player } from "@/components/Player";
import { HeroBanner } from "@/components/HeroBanner";
import { BookRow } from "@/components/BookRow";
import { CategoryFilter } from "@/components/CategoryFilter";

interface GenreRow {
  title: string;
  genre: string;
  books: Book[];
  isLoading: boolean;
}

const GENRE_ROWS: { title: string; genre: string }[] = [
  { title: "Fiction", genre: "Fiction" },
  { title: "Poetry", genre: "Poetry" },
  { title: "Children", genre: "Children" },
  { title: "Horror & Mystery", genre: "Horror" },
];

export function App() {
  const [defaultBooks, setDefaultBooks] = useState<Book[]>([]);
  const [isDefaultLoading, setIsDefaultLoading] = useState(true);
  const hasLoadedOnce = useRef(false);

  const [genreRows, setGenreRows] = useState<GenreRow[]>(
    GENRE_ROWS.map((r) => ({ ...r, books: [], isLoading: true })),
  );

  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  const [genreBooks, setGenreBooks] = useState<Book[]>([]);
  const [isGenreLoading, setIsGenreLoading] = useState(false);

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
    setIsDefaultLoading(true);
    fetchDefaultBooks()
      .then(setDefaultBooks)
      .finally(() => {
        setIsDefaultLoading(false);
        hasLoadedOnce.current = true;
      });

    GENRE_ROWS.forEach((row, index) => {
      fetchBooksByGenre(row.genre, 15).then((books) => {
        setGenreRows((prev) =>
          prev.map((r, i) =>
            i === index ? { ...r, books, isLoading: false } : r,
          ),
        );
      });
    });
  }, []);

  const handleGenreSelect = useCallback(async (genre: string | null) => {
    setActiveGenre(genre);
    if (!genre) {
      setGenreBooks([]);
      return;
    }
    setIsGenreLoading(true);
    const results = await fetchBooksByGenre(genre);
    setGenreBooks(results);
    setIsGenreLoading(false);
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setHasSearched(false);
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    setHasSearched(true);
    const results = await searchBooks(query);
    setSearchResults(results);
    setIsSearching(false);
  }, []);

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

  const heroBook =
    defaultBooks.find((b) => getCoverUrl(b) !== null) ?? defaultBooks[0] ?? null;
  const popularBooks = defaultBooks.filter((b) => b.id !== heroBook?.id);

  const isInitialLoad = isDefaultLoading && !hasLoadedOnce.current;

  if (isInitialLoad) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background">
        <div className="relative flex items-center justify-center">
          <span className="absolute size-16 animate-ping rounded-full bg-primary/10" />
          <span className="absolute size-16 animate-pulse rounded-full bg-primary/5" />
          <img src="/logo.png" alt="Audiobooks" className="relative size-16 object-contain" />
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
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-1.5">
            <img src="/logo.png" alt="Audiobooks" className="size-6 object-contain" />
            <span className="text-base tracking-tight text-foreground">Audiobooks</span>
          </div>
          <SearchBar onSearch={handleSearch} isLoading={isSearching} />
        </div>
      </header>

      <main
        className={`mx-auto max-w-7xl px-4 sm:px-6 ${selectedBook ? "pb-32" : "pb-8"}`}
      >
        {hasSearched ? (
          <div className="py-4">
            <p className="mb-4 text-sm text-muted-foreground">Search results</p>
            <BookGrid
              books={searchResults}
              onSelect={handleSelectBook}
              selectedBookId={selectedBook?.id ?? null}
              isLoading={isSearching}
            />
          </div>
        ) : (
          <div className="space-y-8 py-4">
            <HeroBanner
              book={heroBook}
              onSelect={handleSelectBook}
              isLoading={isDefaultLoading}
            />

            <CategoryFilter
              activeGenre={activeGenre}
              onSelect={handleGenreSelect}
              disabled={isGenreLoading}
            />

            {activeGenre ? (
              <div>
                <p className="mb-4 text-sm text-muted-foreground">
                  {activeGenre}
                </p>
                <BookGrid
                  books={genreBooks}
                  onSelect={handleSelectBook}
                  selectedBookId={selectedBook?.id ?? null}
                  isLoading={isGenreLoading}
                />
              </div>
            ) : (
              <>
                <BookRow
                  title="Popular Audiobooks"
                  books={popularBooks}
                  onSelect={handleSelectBook}
                  isLoading={isDefaultLoading}
                />

                {genreRows.map((row) => (
                  <BookRow
                    key={row.genre}
                    title={row.title}
                    books={row.books}
                    onSelect={handleSelectBook}
                    isLoading={row.isLoading}
                  />
                ))}
              </>
            )}
          </div>
        )}
      </main>

      {selectedBook && currentSection && (
        <Player
          key={selectedBook.id}
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
