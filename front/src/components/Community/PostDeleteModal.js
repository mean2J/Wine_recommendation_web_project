import { Modal, message, Button } from "antd";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";

function PostDeleteModal({ postId, isModal, setIsModal }) {
  const navigate = useNavigate();
  // 게시글 삭제
  const handleDelete = async () => {
    await Api.del(`post/${postId}`);
    message.info("게시글이 삭제되었습니다.");

    setIsModal(false);
    navigate("/community/postList");
  };

  // 게시글 삭제 취소
  const handleCancel = () => {
    setIsModal(false);
  };

  return (
    <>
      <Modal
        title="해당 게시글을 정말 삭제하시겠습니까?"
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

export default PostDeleteModal;
