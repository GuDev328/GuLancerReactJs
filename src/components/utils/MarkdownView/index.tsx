import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import PropTypes from "prop-types";

const MarkdownView = ({ data }) => {
    const [height, setHeight] = useState("auto");
    const updateHeight = () => {
        const editor = document.querySelector(".wmde-markdown");
        if (editor) {
            setHeight(editor.scrollHeight + 30 + "px");
        }
    };

    useEffect(() => {
        updateHeight();
    }, [data]);
    return (
        <MDEditor
            className="custom-preview "
            hideToolbar={true}
            height={height}
            value={data}
            style={{
                border: "none",
                boxShadow: "none",
                backgroundColor: "white",
                color: "black",
                
            }}
            preview="preview"
        ></MDEditor>
    );
};

MarkdownView.propTypes = {
    data: PropTypes.string,
};

export default MarkdownView;
