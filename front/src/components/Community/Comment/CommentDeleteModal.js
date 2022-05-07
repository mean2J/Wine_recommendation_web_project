import { Modal, message, Button } from "antd";
import * as Api from "../../../api";
import { useParams } from "react-router-dom";

function CommentDeleteModal({
  commentId,
  onClose,
  isModal,
  setCommentLists,
  getComment,
}) {
  // 댓글 삭제
  const { postId } = useParams();

  const onOpen = (e) => {
    onClose(e);
  };
  const handleDelete = async () => {
    await Api.del(`comment/${commentId}`);
    message.info("댓글이 삭제되었습니다.");
    onOpen(false);
    const res = await Api.get(`post/${postId}`);
    setCommentLists(res.data);
    getComment();
  };

  // 댓글 삭제 취소
  const handleCancel = () => {
    onOpen(false);
  };

  return (
    <>
      <Modal
        title="해당 댓글을 정말 삭제하시겠습니까?"
        visible={isModal}
        onOk={handleDelete}
        onCancel={handleCancel}
        footer={[
          <Button onClick={handleDelete} style={{ color: "red" }}>
            삭제
          </Button>,
          <Button onClick={handleCancel}>취소</Button>,
        ]}
      >
        삭제하시면 다시 복구할 수 없습니다.
      </Modal>
    </>
  );
}

export default CommentDeleteModal;
