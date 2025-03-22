import React from "react";
import PropTypes from "prop-types";
import MyButton from "../../../../components/core/MyButton";
import { EditOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import { Checkbox } from "antd";
import { useState } from "react";
import EditingProof from "./EditingProof";
import Video from "@/components/utils/Media/Video";
import { Image } from "antd";
export default function Proof({ editable = false, proof }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div>
      {isEditing ? (
        <EditingProof setIsEditing={setIsEditing} proof={proof} />
      ) : (
        <div>
          {editable && (
            <div className="text-right text-2xl font-bold">
              <MyButton
                onClick={() => setIsEditing(true)}
                size="sm"
                variant="outlined"
              >
                <EditOutlined /> Bổ dung và chỉnh sửa
              </MyButton>
            </div>
          )}
          <div>
            <span className="font-bold">Vấn đề: </span>
            <span>
              {proof?.issue_description
                ? proof?.issue_description
                : "Chưa tạo vấn đề"}
            </span>
          </div>
          <div>
            <span className="font-bold">Hướng giải quyết mong muốn: </span>
            <span>
              {proof?.expected_result
                ? proof?.expected_result
                : "Chưa tạo hướng giải quyết mong muốn"}
            </span>
          </div>

          <div>
            <span className="font-bold">Cho đối phương xem bằng chứng: </span>
            <span>
              <Checkbox checked={proof?.share_proof} />
            </span>
          </div>
          <div>
            <span className="font-bold">
              Cho người quản trị xem chi tiết dự án:{" "}
            </span>
            <span>
              <Checkbox checked={proof?.admin_into_project} />
            </span>
          </div>
          {proof.files && proof.files.length > 0 && (
            <div>
              <div className="font-bold">Bằng chứng: </div>
              <div className="flex flex-wrap gap-4">
                {proof?.files?.map((file, index) => {
                  if (file.type === 0) {
                    return (
                      <div key={index} className="w-full ">
                        <div className="w-full">
                          {index + 1}. {file.description}{" "}
                        </div>
                        <div className="w-full max-w-[400px]">
                          <Image
                            key={index}
                            width={"100%"}
                            height={240}
                            style={{ objectFit: "cover" }}
                            src={file.url}
                          />
                        </div>
                      </div>
                    );
                  }
                  if (file.type === 1) {
                    return (
                      <div key={index} className="w-full">
                        <div>
                          {" "}
                          {index + 1}. {file.description}{" "}
                        </div>
                        <div className="w-full max-w-[400px]">
                          <Video src={file.url} />
                        </div>
                      </div>
                    );
                  }
                  if (file.type === 3) {
                    return (
                      <div key={index} className="w-full">
                        <div>
                          {" "}
                          {index + 1}. {file.description}{" "}
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-main">File</p>
                          <p className="truncate max-w-[350px]">
                            {file.url.split("/").pop()}
                          </p>
                        </div>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Tải xuống
                        </a>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          )}
          {proof.files && proof.files.length === 0 && (
            <div>
              <div className="font-bold">Bằng chứng: </div>
              <p>Chưa đăng tải bằng chứng</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

Proof.propTypes = {
  editable: PropTypes.bool,
  proof: PropTypes.object.isRequired,
};
