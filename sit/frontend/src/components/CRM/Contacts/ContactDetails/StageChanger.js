import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import {
  loadSingleContact,
  updateContact,
} from "../../../../redux/rtk/features/crm/contact/contactSlice";

export default function StageChanger({ contactStage, currentStage }) {
  const { ContactId: id } = useParams();
  const dispatch = useDispatch();

  const lastIndex = contactStage?.length - 1;
  const handleStageChange = async (stageId) => {
    const result = await dispatch(
      updateContact({ id, values: { contactStageId: stageId } })
    );
    if (result.payload.message === "success") {
      dispatch(loadSingleContact(id));
    }
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  return (
    <div className=''>
      <Slider {...settings}>
        {contactStage &&
          contactStage.map((item, index) => (
            <button
              key={item.id}
              className={`relative flex items-center justify-center px-4 py-2 border  shadow-sm text-sm font-medium  ${
                currentStage === item.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } ${!(lastIndex === index) && "rounded-r-lg"}`}
              onClick={() => handleStageChange(item.id)}
              disabled={currentStage === item.id}
            >
              {!(lastIndex === index) && (
                <span class='absolute right-0 flex items-center justify-center h-full w-6'>
                  <span class='w-3 h-3 border-t-2 border-r-2 transform rotate-45'></span>
                </span>
              )}
              {item.contactStageName}
            </button>
          ))}
      </Slider>
    </div>
  );
}
