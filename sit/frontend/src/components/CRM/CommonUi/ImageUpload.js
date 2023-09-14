import { Upload, message } from "antd";
import ImgCrop from "antd-img-crop";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";

const ImageUpload = ({ handleCancel, updateThunk, loadThunk, id }) => {
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  // const handleUpload =

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    onPreview,
  };
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <>
      <ImgCrop rotationSlider>
        <Upload
          customRequest={async (options) => {
            const formData = new FormData();
            formData.append("files", options.file);

            try {
              options.onProgress();
              const res = await axios({
                method: "post",
                headers: {
                  "Content-Type": "multipart/form-data;",
                },
                url: "files",
                data: formData,
              });
              const update = await dispatch(
                updateThunk({ id, values: { image: res?.data?.file } })
              );
              if (update.payload.data) {
                options.onSuccess();
                message.success("Image upload Successfully");
                dispatch(loadThunk(id));
                handleCancel();
              } else {
                options.onError();
              }
            } catch (err) {
              options.onError();
              message.error("There was an error, try again");
            }
          }}
          listType='picture-card'
          accept='image/png, image/jpeg'
          maxCount={1}
          fileList={fileList}
          onChange={onChange}
          name='files'
          {...props}
        >
          {fileList.length < 1 && "Select Image"}
        </Upload>
      </ImgCrop>
    </>
  );
};
export default ImageUpload;
