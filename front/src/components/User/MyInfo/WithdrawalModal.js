import { Modal, message, Button } from "antd";
import * as Api from "../../../api";
import { useContext } from "react";
import { DispatchContext } from "../../../App";

function WithdrawalModal({ isModal, setIsModal }) {
  const dispatch = useContext(DispatchContext);

  const handleDelete = async () => {
    await Api.del("users");
    // sessionStorage 에 저장했던 JWT 토큰을 삭제
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃
    dispatch({ type: "LOGOUT" });

    message.info("회원탈퇴가 완료되었습니다.");
  };

  const handleCancel = () => {
    setIsModal(false);
  };
  return (
    <>
      <Modal
        title="정말 탈퇴하시겠습니까?"
        visible={isModal}
        onOk={handleDelete}
        onCancel={handleCancel}
        footer={[
          <Button onClick={handleDelete} style={{ color: "red" }}>
            탈퇴
          </Button>,
          <Button onClick={handleCancel}>취소</Button>,
        ]}
      >
        탈퇴를 누르시면 회원 탈퇴가 되며, 기록은 모두 삭제됩니다.
      </Modal>
    </>
  );
}

export default WithdrawalModal;
