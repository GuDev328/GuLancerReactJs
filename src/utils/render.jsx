import { TaskStatus } from "../constant/task";
import { UserRole } from "../constant/user";

export const renderJSXTaskStatus = (status) => {
  if (status == TaskStatus.TODO) {
    return (
      <div
        className="px-2 text-center rounded-xl"
        style={{ backgroundColor: "#FEEFC6", color: "#B32318" }}
      >
        Chưa thực hiện
      </div>
    );
  }
  if (status == TaskStatus.INPROCESSED) {
    return (
      <div
        className="px-2 text-center rounded-xl"
        style={{ backgroundColor: "#D1E9FF", color: "#026AA2" }}
      >
        Đang xử lý
      </div>
    );
  }
  if (status == TaskStatus.DONE) {
    return (
      <div
        className="px-2 text-center rounded-xl"
        style={{ backgroundColor: "#D1FADF", color: "#027948" }}
      >
        Đã hoàn thành
      </div>
    );
  }
  if (status == TaskStatus.CANCEL) {
    return (
      <div
        className="px-2 text-center rounded-xl"
        style={{ backgroundColor: "#FEE4E2", color: "#B32318" }}
      >
        Đã huỷ
      </div>
    );
  }
};

export const renderJSXChangeTaskStatus = (
  status,
  toDo,
  toInprocess,
  toDone,
  toCancel
) => {
  if (status === TaskStatus.TODO) {
    return (
      <div>
        <div className="cursor-pointer p-2" onClick={toInprocess}>
          Thực hiện công việc
        </div>
        <div className="cursor-pointer p-2" onClick={toCancel}>
          Huỷ bỏ công việc
        </div>
      </div>
    );
  }
  if (status === TaskStatus.INPROCESSED) {
    return (
      <div>
        <div className="cursor-pointer p-2" onClick={toDone}>
          Hoàn thành công việc
        </div>
        <hr />
        <div className="cursor-pointer p-2" onClick={toDo}>
          Đánh dấu chưa thực hiện công việc
        </div>
      </div>
    );
  }
  if (status === TaskStatus.DONE) {
    return (
      <div>
        <div className="cursor-pointer p-2" onClick={toInprocess}>
          Thực hiện lại công việc
        </div>
        <hr />
        <div className="cursor-pointer p-2" onClick={toDo}>
          Đánh dấu chưa thực hiện công việc
        </div>
      </div>
    );
  }
  if (status === TaskStatus.CANCEL) {
    return (
      <div>
        <div className="cursor-pointer p-2" onClick={toDo}>
          Mở lại công việc
        </div>
      </div>
    );
  }
};

export const renderJSXRoleUser = (status) => {
  if (status == UserRole.EMPLOYER) {
    return (
      <div
        className="px-2 text-center rounded-xl"
        style={{ backgroundColor: "#FEEFC6", color: "#B32318" }}
      >
        Employer
      </div>
    );
  }
  if (status == UserRole.FREELANCER) {
    return (
      <div
        className="px-2 text-center rounded-xl"
        style={{ backgroundColor: "#D1E9FF", color: "#026AA2" }}
      >
        Freelancer
      </div>
    );
  }
  if (status == UserRole.UNDEFINED) {
    return (
      <div
        className="px-2 text-center rounded-xl"
        style={{ backgroundColor: "#D1FADF", color: "#027948" }}
      >
        Đã hoàn thành
      </div>
    );
  }
  if (status == UserRole.ADMIN) {
    return (
      <div
        className="px-2 text-center rounded-xl"
        style={{ backgroundColor: "#FEE4E2", color: "#B32318" }}
      >
        Admin
      </div>
    );
  }
};
