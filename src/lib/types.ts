export interface Author {
  id: string;
  first_name: string;
  last_name: string;
}

export interface Section {
  id: string;
  section_number: string;
  title: string;
  listen_url: string;
  playtime: string;
}

export interface Book {
  id: string;
  title: string;
  description: string;
  language: string;
  totaltime: string;
  totaltimesecs: number;
  num_sections: string;
  authors: Author[];
  sections: Section[];
  coverart_jpg?: string;
  coverart_thumbnail?: string;
  url_librivox?: string;
}

export function getAuthorName(book: Book): string {
  if (!book.authors?.length) return "Unknown Author";
  const a = book.authors[0];
  return `${a.first_name} ${a.last_name}`.trim() || "Unknown Author";
}

export function proxyArchiveUrl(url: string): string {
  return url
    .replace("https://archive.org", "/proxy/archive")
    .replace("https://www.archive.org", "/proxy/archive");
}

export function getCoverUrl(book: Book): string | null {
  const raw = book.coverart_thumbnail || book.coverart_jpg || null;
  if (!raw) return null;
  return proxyArchiveUrl(raw);
}
