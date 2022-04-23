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

const dummy = [
  {
    id: 1,
    name: "와인 1번",
    type: "rose",
    sweet: 1,
    acidity: 1,
    body: 1,
    tannin: 1,
  },
  {
    id: 2,
    name: "와인 2번",
    type: "red",
    sweet: 2,
    acidity: 2,
    body: 2,
    tannin: 2,
  },
  {
    id: 3,
    name: "와인 3번",
    type: "red",
    sweet: 3,
    acidity: 3,
    body: 3,
    tannin: 3,
  },
  {
    id: 4,
    name: "와인 4번",
    type: "sparkling",
    sweet: 4,
    acidity: 4,
    body: 4,
    tannin: 4,
  },
];

function BookmarkList() {
  return (
    <>
      <Carousel slidesToShow={3}>
        {dummy.map((currentBookmark) => (
          <BookmarkItem currentBookmark={currentBookmark} />
        ))}
      </Carousel>
    </>
  );
}

export default BookmarkList;
