import { Card } from "antd";
import BookmarkButton from "../bookmark/BookmarkButton";
import * as Api from "../../api";
import { useState, useEffect } from "react";

function Result({ wineId, nation, title, type, local, price, abv, varieties }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    Api.get("bookmarklist").then((res) => {
      const bookmarkList = res.data;
      const checked = bookmarkList.some(
        (bookmark) => bookmark.wineId === wineId
      );
      console.log(checked);
      setIsBookmarked(checked);
    });
  }, []); // deps에 isBookmarked 넣어야할듯?

  return (
    <Card title={title}>
      <BookmarkButton
        isBookmarked={isBookmarked}
        setIsBookmarked={setIsBookmarked}
      />
      <p>와인타입: {type}</p>
      <p>제조국: {nation}</p>
      <p>제조지역: {local}</p>
      <p>가격: {price}</p>
      <p>도수: {abv}</p>
      <p>주요 품종: {varieties}</p>
    </Card>
  );
}

export default Result;
