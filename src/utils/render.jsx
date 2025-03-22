import { Tag } from "antd";
import DotMenuDropdown from "../components/core/DotMenuDropdown";
import MyDropdown from "../components/core/MyDropdown";
import { ProjectStatus } from "../constant/project";
import { TaskStatus } from "../constant/task";
import { UserRole, UserVerifyStatus } from "../constant/user";

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

export const renderUserVerifyStatus = (status) =>
  status === UserVerifyStatus.Approved ? (
    <p className="text-[15px]" style={{ color: "#31c740" }}>
      <i className="fa-light mr-1 fa-ballot-check"></i>
      Đã xác thực
    </p>
  ) : (
    <p className="text-[15px]" style={{ color: "#c78631" }}>
      <i className="fa-light mr-1 fa-ballot-check"></i>
      Chưa xác thực
    </p>
  );
export const renderFullUserVerifyStatus = (status) => {
  if (status === UserVerifyStatus.Approved) {
    return (
      <p className="text-[15px]" style={{ color: "#31c740" }}>
        <i className="fa-light mr-1 fa-ballot-check"></i>
        Đã xác thực
      </p>
    );
  }
  if (status === UserVerifyStatus.Unverified) {
    return (
      <p className="text-[15px]" style={{ color: "#c78631" }}>
        <i className="fa-light mr-1 fa-ballot-check"></i>
        Chưa xác thực
      </p>
    );
  }

  if (status === UserVerifyStatus.Pending) {
    return (
      <p className="text-[15px]" style={{ color: "#0f40b1" }}>
        <i className="fa-light mr-1 fa-ballot-check"></i>
        Đang xác thực
      </p>
    );
  }

  if (status === UserVerifyStatus.Rejected) {
    return (
      <p className="text-[15px]" style={{ color: "#b1100f" }}>
        <i className="fa-light mr-1 fa-ballot-check"></i>
        Bị từ chối, yêu cầu xác thực lại
      </p>
    );
  }
};

export const renderJSXProjectStatus = (status, isEmployer) => {
  if (status === ProjectStatus.NotReady) {
    return (
      <div className="flex items-center">
        <p
          className="text-[15px] inline-block p-1 px-3 rounded-2xl"
          style={{ color: "#808080", backgroundColor: "#f0f0f0" }}
        >
          <i className="fa-light mr-1 fa-clock"></i>
          Chưa sẵn sàng
        </p>
        {isEmployer && (
          <DotMenuDropdown
            items={[
              { label: "Tuyển dụng nhân sự", onClick: () => {} },
              { label: "Huỷ dự án", onClick: () => {} },
            ]}
          />
        )}
      </div>
    );
  }
  if (status === ProjectStatus.Recruiting) {
    return (
      <div className="flex items-center">
        <p
          className="text-[15px] inline-block p-1 px-3 rounded-2xl"
          style={{ color: "#007bff", backgroundColor: "#e7f1ff" }}
        >
          <i className="fa-light mr-1 fa-user-plus"></i>
          Đang tuyển dụng
        </p>
        {isEmployer && (
          <DotMenuDropdown
            items={[
              { label: "Bắt đầu dự án", onClick: () => {} },
              { label: "Huỷ dự án", onClick: () => {} },
            ]}
          />
        )}
      </div>
    );
  }
  if (status === ProjectStatus.Processing) {
    return (
      <div>
        <p
          className="text-[15px] inline-block p-1 px-3 rounded-2xl"
          style={{ color: "#17a2b8", backgroundColor: "#e0f7fa" }}
        >
          <i className="fa-light mr-1 fa-spinner"></i>
          Đang thực hiện
        </p>
        {isEmployer && (
          <DotMenuDropdown
            items={[
              { label: "Tạm dừng dự án", onClick: () => {} },
              { label: "Huỷ dự án", onClick: () => {} },
            ]}
          />
        )}
      </div>
    );
  }
  if (status === ProjectStatus.Pause) {
    return (
      <div>
        <p
          className="text-[15px] inline-block p-1 px-3 rounded-2xl"
          style={{ color: "#ffc107", backgroundColor: "#fff3cd" }}
        >
          <i className="fa-light mr-1 fa-pause-circle"></i>
          Tạm dừng
        </p>

        {isEmployer && (
          <DotMenuDropdown
            items={[
              { label: "Tiếp tục dự án", onClick: () => {} },
              { label: "Tuyển thêm nhân sự", onClick: () => {} },
              { label: "Huỷ dự án", onClick: () => {} },
            ]}
          />
        )}
      </div>
    );
  }
  if (status === ProjectStatus.Paying) {
    return (
      <div>
        <p
          className="text-[15px] inline-block p-1 px-3 rounded-2xl"
          style={{ color: "#28a745", backgroundColor: "#d4edda" }}
        >
          <i className="fa-light mr-1 fa-money-bill"></i>
          Đang thanh toán
        </p>

        {isEmployer && (
          <DotMenuDropdown
            items={[
              { label: "Xác nhận thanh toán", onClick: () => {} },
              { label: "Huỷ dự án", onClick: () => {} },
            ]}
          />
        )}
      </div>
    );
  }
  if (status === ProjectStatus.Complete) {
    return (
      <p
        className="text-[15px] inline-block p-1 px-3 rounded-2xl"
        style={{ color: "#31c740", backgroundColor: "#dff0d8" }}
      >
        <i className="fa-light mr-1 fa-check-circle"></i>
        Đã hoàn thành
      </p>
    );
  }
  if (status === ProjectStatus.Disputed) {
    return (
      <p
        className="text-[15px] inline-block p-1 px-3 rounded-2xl"
        style={{ color: "#dc3545", backgroundColor: "#f8d7da" }}
      >
        <i className="fa-light mr-1 fa-exclamation-triangle"></i>
        Đang tranh chấp
      </p>
    );
  }
  return null;
};

export const renderStatusTagPhaseProject = (
  status,
  handlePayForMember,
  handelGoToDispute
) => {
  let color, statusText, action;

  switch (status) {
    case "NOT_READY":
      color = "gray";
      statusText = "Chưa sẵn sàng";
      break;
    case "PROCESSING":
      color = "blue";
      statusText = "Đang tiến hành";

      break;
    case "PAYING":
      color = "orange";
      statusText = "Chờ thanh toán";
      action = <div onClick={handlePayForMember}>Thanh toán</div>;
      break;
    case "COMPLETE":
      color = "green";
      statusText = "Hoàn thành";
      break;
    case "DISPUTED":
      color = "red";
      statusText = "Tranh chấp";
      action = <div onClick={handelGoToDispute}>Đi tới tranh chấp</div>;
      break;
    default:
      color = "#333";
      statusText = "Không xác định";
  }

  return (
    <div className="flex">
      <div
        className="ml-1 mr-2 inline-block px-2 text-white text-sm rounded-lg"
        style={{ backgroundColor: color }}
      >
        {statusText}
      </div>
      <div className="text-main underline cursor-pointer">{action}</div>
    </div>
  );
};

export const renderStatusDispute = (status) => {
  const statusMap = {
    CREATED: {
      label: "Đã tạo",
      bgColor: "#FFF7E6",
      textColor: "#FAAD14",
    },
    PROCESSING: {
      label: "Đang xử lý",
      bgColor: "#E6F7FF",
      textColor: "#1890FF",
    },

    RESOLVED: {
      label: "Đã giải quyết",
      bgColor: "#F6FFED",
      textColor: "#52C41A",
    },
    CANCEL: {
      label: "Đã hủy",
      bgColor: "#FFF1F0",
      textColor: "#FF4D4F",
    },
    NEED_MORE_PROOF: {
      label: "Cần thêm bằng chứng",
      bgColor: "#F9F0FF",
      textColor: "#722ED1",
    },
  };

  const { label, bgColor, textColor } = statusMap[status] || {
    label: "Không xác định",
    bgColor: "#F5F5F5",
    textColor: "#8C8C8C",
  }; // Xám nhạt

  return (
    <span
      style={{
        backgroundColor: bgColor,
        color: textColor,
        padding: "4px 20px",
        margin: "0px 10px",
        borderRadius: "8px",
        fontWeight: 500,
        fontSize: "14px",
        display: "inline-block",
        //minWidth: "120px",
        textAlign: "center",
      }}
    >
      {label}
    </span>
  );
};
