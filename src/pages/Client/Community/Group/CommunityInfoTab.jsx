import React from 'react';
import { Form, Input } from 'antd';
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import  groupServices  from '@/services/groupServices';
import mediaServices from '@/services/mediaServices';
import MyButton  from '@/components/core/MyButton';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { message } from 'antd';
import { Checkbox } from 'antd';
import { Radio } from 'antd';

const CommunityInfoTab = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [fileList, setFileList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [reset, setReset] = React.useState(false);
  const fetchDetailGroup = useQuery({
    queryKey: ["getGroupById", id],
    queryFn: async () => await groupServices.getGroupById(id),
  });

  useEffect(() => {
    if (fetchDetailGroup?.data?.result) {
      form.setFieldsValue({
        name: fetchDetailGroup?.data?.result?.name,
        description: fetchDetailGroup?.data?.result?.description,
        censor: fetchDetailGroup?.data?.result?.censor,
        type: fetchDetailGroup?.data?.result?.type,
      });

      setFileList([
        {
          uid: '1',
          name: '1.png',
          status: 'done',
          url: fetchDetailGroup?.data?.result?.cover_photo,
        },
      ]);
    }
  }, [fetchDetailGroup.data?.result, reset]);

  const editGroupM = useMutation({
    mutationFn: groupServices.editGroup,
    onSuccess: (data) => {
      message.success(data.message);
      fetchDetailGroup.refetch();
    },
  });

  const handleCancel = () => {
    setReset(!reset);

  };

  const handleUpload = async ({ fileList }) => {
    setFileList(fileList);
  };

  const handleCreate = async () => {
    await form.validateFields();
    setLoading(true);
    const values = await form.getFieldsValue();
    const data = {
      ...values,
      group_id: id,
      cover_photo: fileList[0].status === 'done' ? fileList[0].url : 
        "https://gulancer.s3.ap-southeast-1.amazonaws.com/images/168b01bba582d1916e257f100.png",
    };
    if (fileList[0] && fileList[0].status !== 'done') {
      const upImage = await mediaServices.uploadImage(
        fileList[0].originFileObj
      );
      data.cover_photo = upImage.result[0].url;
    }
    await editGroupM.mutate(data);
    setLoading(false);
    handleCancel();
  };
  return (
    <div>
      <Form form={form} labelCol={{ span: 3 }}>
        <Form.Item label="Ảnh nền" valuePropName="fileList">
          <Upload
            listType="picture-card"
            beforeUpload={() => false}
            fileList={fileList}
            maxCount={1}
            onChange={handleUpload}
          >
            {fileList.length >= 1 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item
          required
          name="name"
          rules={[{ required: true, message: "Nhập tên cộng đồng" }]}
          label="Tên nhóm"
        >
          <Input />
        </Form.Item>

        <Form.Item name="type" initialValue={0} label="Loại cộng đồng">
          <Select
            defaultValue={0}
            options={[
              { label: "Công khai", value: 0 },
              { label: "Riêng tư", value: 1 },
            ]}
          ></Select>
        </Form.Item>
        <Form.Item name="censor"  label="Kiểm duyệt khi đăng bài">
         <Radio.Group options={[
          { label: "Cần kiểm duyệt", value: true },
          { label: "Không cần kiểm duyệt", value: false },

         ]}/>
          
         
        </Form.Item>
        <Form.Item name="description" label="Mô tả ">
          <Input.TextArea />
        </Form.Item>
      </Form>
      <div className="flex justify-end">
                <MyButton size="sm" onClick={handleCancel}>
                  Hủy
                </MyButton>
                <MyButton
                  loading={loading}
                  className="ml-2 text-white bg-main"
                  size="sm"
                  onClick={handleCreate}
                >
                  Xác nhận chỉnh sửa
                </MyButton>
              </div>
    </div>
  );
};

export default CommunityInfoTab;
