import { Card } from "antd";
import BookmarkButton from "../bookmark/BookmarkButton";
import * as Api from "../../api";
import { useState, useEffect } from "react";

function Result({ wineId, nation, title, type, local, price, abv, varieties }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    Api.get("bookmarklist").then((res) => {
      const bookmarkList = res.data.bookmark;
      const checked = bookmarkList.some(
        (bookmark) => bookmark.wineId === wineId
      );
      setIsBookmarked(checked);
    });
  }, [wineId]);

  return (
    <Card title={title}>
      <BookmarkButton
        isBookmarked={isBookmarked}
        setIsBookmarked={setIsBookmarked}
        wineId={wineId}
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
