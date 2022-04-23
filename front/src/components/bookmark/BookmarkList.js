import { useState, useEffect } from "react";

import { Carousel } from "antd";

import BookmarkItem from "./BookmarkItem";

// const contentStyle = {
//   height: "160px",
//   color: "#fff",
//   lineHeight: "160px",
//   textAlign: "center",
//   background: "#364d79",
// };

function BookmarkList() {
  const [bookmarks, setBookmarks] = useState([
    { type: "red", name: "Baron du Val Red" },
    { type: "blue", name: "Baron du Val Blue" },
    { type: "orange", name: "Baron du Val Orange" },
  ]);

  return (
    <>
      {bookmarks.map((currentBookmark) => (
        <BookmarkItem currentBookmark={currentBookmark} />
      ))}
    </>
  );
}

export default BookmarkList;
