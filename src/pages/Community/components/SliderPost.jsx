import React from "react";
import { Modal, Image, Carousel } from "antd";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const SliderPost = ({ open, setOpen }) => {
    const isLgScreen = useSelector((state) => state.screen.isLgScreen);
    return (
        <div>
            <Modal
                width={isLgScreen ? "70%" : "95%"}
                style={{ top: 0 }}
                open={open}
                onCancel={() => setOpen(false)}
                centered
                footer={null}
            >
                <Carousel arrows infinite={true}>
                    <Image
                        width={"100%"}
                        height={"100%"}
                        src="/3.JPG"
                        preview={false}
                    />
                    <Image
                        width={"100%"}
                        height={"100%"}
                        src="/3.JPG"
                        preview={false}
                    />
                    <Image
                        width={"100%"}
                        height={"100%"}
                        src="/3.JPG"
                        preview={false}
                    />
                </Carousel>
            </Modal>
        </div>
    );
};

SliderPost.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
};

export default SliderPost;
