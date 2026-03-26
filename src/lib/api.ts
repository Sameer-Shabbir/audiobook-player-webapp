import type { Book } from "./types";
import { FALLBACK_BOOKS } from "./fallback-data";

const BASE_URL = "/api/librivox/audiobooks";

interface LibriVoxResponse {
  books?: Book[];
}

async function fetchBooks(params: URLSearchParams): Promise<Book[]> {
  params.set("format", "json");
  params.set("extended", "1");
  params.set("coverart", "1");

  const response = await fetch(`${BASE_URL}?${params.toString()}`);
  if (!response.ok) throw new Error(`API error: ${response.status}`);

  const data: LibriVoxResponse = await response.json();
  if (!data.books?.length) return [];

  return data.books.filter(
    (book) => book.sections?.length > 0 && book.language === "English",
  );
}

export async function searchBooks(query: string): Promise<Book[]> {
  if (!query.trim()) return [];

  try {
    const params = new URLSearchParams({
      title: `^${query.trim()}`,
      limit: "40",
    });
    return await fetchBooks(params);
  } catch {
    return FALLBACK_BOOKS.filter((b) =>
      b.title.toLowerCase().includes(query.toLowerCase()),
    );
  }
}

export async function fetchDefaultBooks(): Promise<Book[]> {
  try {
    const params = new URLSearchParams({ limit: "40" });
    const books = await fetchBooks(params);
    return books.length > 0 ? books : FALLBACK_BOOKS;
  } catch {
    return FALLBACK_BOOKS;
  }
}

export async function fetchBooksByGenre(genre: string): Promise<Book[]> {
  try {
    const params = new URLSearchParams({
      genre: `^${genre}`,
      limit: "40",
    });
    return await fetchBooks(params);
  } catch {
    return FALLBACK_BOOKS;
  }
}
