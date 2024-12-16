export const renderJSXTaskStatus = (status) => {
    if (status == 0) {
        return (
            <div
                className="px-2 text-center rounded-xl"
                style={{ backgroundColor: "#FEEFC6", color: "#B32318" }}
            >
                Chưa thực hiện
            </div>
        );
    }
    if (status == 1) {
        return (
            <div
                className="px-2 text-center rounded-xl"
                style={{ backgroundColor: "#D1E9FF", color: "#026AA2" }}
            >
                Đang xử lý
            </div>
        );
    }
    if (status == 2) {
        return (
            <div
                className="px-2 text-center rounded-xl"
                style={{ backgroundColor: "#D1FADF", color: "#027948" }}
            >
                Đã hoàn thành
            </div>
        );
    }
    if (status == 3) {
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
