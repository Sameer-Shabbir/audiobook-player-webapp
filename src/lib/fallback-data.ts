import type { Book } from "./types";

export const FALLBACK_BOOKS: Book[] = [
  {
    id: "253",
    title: "Pride and Prejudice",
    description: "Jane Austen's classic novel of manners.",
    language: "English",
    totaltime: "13:06:44",
    totaltimesecs: 47204,
    num_sections: "37",
    authors: [
      { id: "155", first_name: "Jane", last_name: "Austen" },
    ],
    sections: [
      {
        id: "124135",
        section_number: "1",
        title: "Chapters 1-3",
        listen_url:
          "https://www.archive.org/download/pride_and_prejudice_librivox/prideandprejudice_01-03_austen_64kb.mp3",
        playtime: "1132",
      },
      {
        id: "124136",
        section_number: "2",
        title: "Chapters 4-5",
        listen_url:
          "https://www.archive.org/download/pride_and_prejudice_librivox/prideandprejudice_04-05_austen_64kb.mp3",
        playtime: "865",
      },
      {
        id: "124137",
        section_number: "3",
        title: "Chapter 6",
        listen_url:
          "https://www.archive.org/download/pride_and_prejudice_librivox/prideandprejudice_06_austen_64kb.mp3",
        playtime: "777",
      },
    ],
    coverart_thumbnail:
      "https://archive.org/download/pride_and_prejudice_librivox/Pride_Prejudice_1104_thumb.jpg",
    coverart_jpg:
      "https://archive.org/download/pride_and_prejudice_librivox/Pride_Prejudice_1104.jpg",
  },
  {
    id: "219",
    title: "Adventures of Huckleberry Finn",
    description: "Mark Twain's masterpiece of American literature.",
    language: "English",
    totaltime: "10:52:58",
    totaltimesecs: 39178,
    num_sections: "43",
    authors: [
      { id: "14", first_name: "Mark", last_name: "Twain" },
    ],
    sections: [
      {
        id: "123871",
        section_number: "1",
        title: "Chapter 01",
        listen_url:
          "https://www.archive.org/download/huckleberry_finn_librivox/huckleberry_finn_01_twain_64kb.mp3",
        playtime: "568",
      },
      {
        id: "123872",
        section_number: "2",
        title: "Chapter 02",
        listen_url:
          "https://www.archive.org/download/huckleberry_finn_librivox/huckleberry_finn_02_twain_64kb.mp3",
        playtime: "719",
      },
    ],
    coverart_thumbnail:
      "https://archive.org/download/huckleberry_finn_librivox/huck_finn_1104_thumb.jpg",
    coverart_jpg:
      "https://archive.org/download/huckleberry_finn_librivox/huck_finn_1104.jpg",
  },
  {
    id: "141",
    title: "A Tale of Two Cities",
    description: "Charles Dickens' novel set during the French Revolution.",
    language: "English",
    totaltime: "14:25:23",
    totaltimesecs: 51923,
    num_sections: "45",
    authors: [
      { id: "91", first_name: "Charles", last_name: "Dickens" },
    ],
    sections: [
      {
        id: "123594",
        section_number: "1",
        title: "Book the First - Chapter 01",
        listen_url:
          "https://www.archive.org/download/tale_of_two_cities_librivox/twocities_01_dickens_64kb.mp3",
        playtime: "308",
      },
      {
        id: "123595",
        section_number: "2",
        title: "Book the First - Chapter 02",
        listen_url:
          "https://www.archive.org/download/tale_of_two_cities_librivox/twocities_02_dickens_64kb.mp3",
        playtime: "893",
      },
    ],
    coverart_thumbnail:
      "https://archive.org/download/tale_of_two_cities_librivox/Two_Cities_1104_thumb.jpg",
    coverart_jpg:
      "https://archive.org/download/tale_of_two_cities_librivox/Two_Cities_1104.jpg",
  },
  {
    id: "251",
    title: "Dracula",
    description: "Bram Stoker's Gothic horror masterpiece.",
    language: "English",
    totaltime: "17:30:16",
    totaltimesecs: 63016,
    num_sections: "27",
    authors: [
      { id: "89", first_name: "Bram", last_name: "Stoker" },
    ],
    sections: [
      {
        id: "124125",
        section_number: "1",
        title: "Chapter 01 - Jonathan Harker's Journal",
        listen_url:
          "https://www.archive.org/download/dracula_librivox/dracula_01_stoker_64kb.mp3",
        playtime: "2246",
      },
      {
        id: "124126",
        section_number: "2",
        title: "Chapter 02 - Jonathan Harker's Journal (cont.)",
        listen_url:
          "https://www.archive.org/download/dracula_librivox/dracula_02_stoker_64kb.mp3",
        playtime: "2125",
      },
    ],
    coverart_thumbnail:
      "https://archive.org/download/dracula_librivox/Dracula_1104_thumb.jpg",
    coverart_jpg:
      "https://archive.org/download/dracula_librivox/Dracula_1104.jpg",
  },
  {
    id: "193",
    title: "Alice's Adventures in Wonderland",
    description: "Lewis Carroll's beloved fantasy tale.",
    language: "English",
    totaltime: "02:53:03",
    totaltimesecs: 10383,
    num_sections: "12",
    authors: [
      { id: "25", first_name: "Lewis", last_name: "Carroll" },
    ],
    sections: [
      {
        id: "123769",
        section_number: "1",
        title: "Chapter 01 - Down the Rabbit Hole",
        listen_url:
          "https://www.archive.org/download/alice_in_wonderland_librivox/wonderland_ch_01_carroll_64kb.mp3",
        playtime: "837",
      },
      {
        id: "123770",
        section_number: "2",
        title: "Chapter 02 - The Pool of Tears",
        listen_url:
          "https://www.archive.org/download/alice_in_wonderland_librivox/wonderland_ch_02_carroll_64kb.mp3",
        playtime: "740",
      },
    ],
    coverart_thumbnail:
      "https://archive.org/download/alice_in_wonderland_librivox/Alice_Wonderland_1104_thumb.jpg",
    coverart_jpg:
      "https://archive.org/download/alice_in_wonderland_librivox/Alice_Wonderland_1104.jpg",
  },
];
