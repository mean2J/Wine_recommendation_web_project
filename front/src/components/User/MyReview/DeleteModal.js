import { Modal, message, Button } from "antd";
import * as Api from "../../../api";

function DeleteModal({
  isModal,
  setIsModal,
  reviewId,
  myReviewList,
  setMyReviewList,
}) {
  // 리뷰 삭제
  const handleDelete = async () => {
    await Api.del(`reviews/${reviewId}`);
    message.info("리뷰 삭제가 완료되었습니다.");
    // 필터링
    const filterData = myReviewList.filter((review) => review.id !== reviewId);
    setMyReviewList(filterData);
    setIsModal(false);
  };

  // 리뷰 삭제 취소
  const handleCancel = () => {
    setIsModal(false);
  };
  return (
    <>
      <Modal
        title="정말 삭제하시겠습니까?"
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

export default DeleteModal;
