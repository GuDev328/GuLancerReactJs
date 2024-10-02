import React from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import { Button as Button2 } from "@material-tailwind/react";

const MyModal = ({
    open,
    onCancel,
    onConfirm,
    title = "Modal",
    okText = "Xác nhận",
    children,
}) => {
    return (
        <Modal
            title={title}
            open={open}
            onCancel={onCancel}
            footer={
                <>
                    <Button2 size="sm" onClick={onCancel}>
                        Hủy
                    </Button2>
                    <Button2
                        className="ml-2 text-white bg-main"
                        size="sm"
                        onClick={onConfirm}
                    >
                        {okText}
                    </Button2>
                </>
            }
        >
            {children}
        </Modal>
    );
};

export const showConfirmModal = ({
    title = "Xác nhận",
    content,
    onOk,
    onCancel = null,
    okText = "Xác nhận",
    cancelText = "Hủy",
}) => {
    Modal.confirm({
        title,
        content,
        //icon: null, // Loại bỏ biểu tượng mặc định
        okText,
        cancelText,
        footer: (_, { OkBtn, CancelBtn }) => (
            <>
                <Button2
                    size="sm"
                    onClick={onCancel ? onCancel : () => Modal.destroyAll()}
                >
                    {cancelText}
                </Button2>
                <Button2
                    className="ml-2 text-white bg-main"
                    size="sm"
                    onClick={onOk}
                >
                    {okText}
                </Button2>
            </>
        ),
        onOk,
        onCancel,
    });
};

MyModal.propTypes = {
    open: PropTypes.bool,
    onCancel: PropTypes.func,
    okText: PropTypes.string,
    title: PropTypes.string,
    onConfirm: PropTypes.func,
    children: PropTypes.node,
};

export default MyModal;
