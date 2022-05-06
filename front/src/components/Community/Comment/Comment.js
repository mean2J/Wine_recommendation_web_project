import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import * as Api from "../../../api";

function Comment(props) {
  const { postId } = useParams();
  
  const [commentList, setCommentList] = useState({});

  const getCommentList = useCallback(async () => {
    const res = await Api.get(`commentlist/${postId}`);
    setCommentList(res.data.commentList);
  }, [postId]);

  useEffect(() => {
    getCommentList();
  }, [getCommentList]);

  console.log(postId);

  return (
    <>
      
    </>
  )
  
}

export default Comment;