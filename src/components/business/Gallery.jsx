import React, { useEffect } from "react";
import SliderPost from "./SliderPost";
import PropTypes from "prop-types";
import { Image } from "antd";
import Video from "@/components/utils/Media/Video";
const Gallery = ({ medias }) => {
  const [openSlider, setOpenSlider] = React.useState(false);
  const [mediasPost, setMediasPost] = React.useState([]);

  const mediaCount = medias.length;

  useEffect(() => {
    if (medias.length > 0) {
      setMediasPost(medias);
    }
  }, [medias]);

  const renderMedia = () => {
    if (!medias || medias.length === 0) return null;

    const mediaFiles = medias.slice(0, 4); // Limit to 4 files
    const remainingFilesCount = medias.length - 4; // Count of remaining files

    return (
      <div className="grid grid-cols-2 gap-2">
        {mediaFiles.map((media, index) => {
          const isSingleInRow =
            mediaFiles.length % 2 !== 0 && index === mediaFiles.length - 1;

          return (
            <div
              key={index}
              className={`relative  ${isSingleInRow ? "col-span-2" : ""}`}
            >
              {media.type === 0 ? (
                <div
                  className={`${
                    isSingleInRow ? "h-[300px]" : "h-[187px]"
                  } rounded-lg overflow-hidden`}
                >
                  <Image
                    src={media.url}
                    alt={`Image ${index}`}
                    height={isSingleInRow ? "300px" : "187px"}
                    width={"100%"}
                    style={{ objectFit: "cover" }}
                    preview={true}
                  />
                </div>
              ) : (
                <Video
                  src={media.url}
                  controlType={
                    mediaCount > 4 && index === 3 ? "none" : "control"
                  }
                />
              )}
              {index === 3 && remainingFilesCount > 0 && (
                <div
                  onClick={() => setOpenSlider(true)}
                  className="absolute top-0 left-0 w-full h-[187px] flex items-center justify-center bg-black bg-opacity-50 text-white text-xl"
                >
                  +{remainingFilesCount}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      {renderMedia()}

      <SliderPost
        media={mediasPost}
        open={openSlider}
        setOpen={setOpenSlider}
      />
    </div>
  );
};

Gallery.propTypes = {
  medias: PropTypes.array.isRequired,
};

export default Gallery;
