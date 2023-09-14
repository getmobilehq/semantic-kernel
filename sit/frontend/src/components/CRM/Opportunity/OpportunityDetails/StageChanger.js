import { Card } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import {
  loadSingleOpportunity,
  updateOpportunity,
} from "../../../../redux/rtk/features/crm/opportunity/opportunitySlice";

export default function StageChanger({ opportunityStage, currentStage }) {
  const { OpportunityId: id } = useParams();
  const dispatch = useDispatch();

  const lastIndex = opportunityStage?.length - 1;
  const handleStageChange = async (stageId) => {
    const result = await dispatch(
      updateOpportunity({ id, values: { opportunityStageId: stageId } })
    );
    if (result.payload.message === "success") {
      dispatch(loadSingleOpportunity(id));
    }
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Card>
      <div className='flex flex-col md:flex-row md:justify-between items-center pb-3 gap-2'>
        <span className='flex gap-2'>
          <span className='text-base font-bold'>START:</span>
          <span className='text-base font-normal'>
            {moment(currentStage?.opportunityCreateDate).format("MMMM Do YYYY")}
          </span>
        </span>
        <span className='text-base font-bold'>
          CLOSING:
          <span className='text-base font-normal'>
            {" "}
            {moment(currentStage?.opportunityCloseDate).format("MMMM Do YYYY")}
          </span>
        </span>
      </div>
      <Slider {...settings}>
        {opportunityStage &&
          opportunityStage.map((item, index) => (
            <button
              key={item.id}
              className={`flex items-center justify-center p-2  shadow-sm text-sm font-medium  ${
                currentStage?.opportunityStageId === item.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } ${!(lastIndex === index) && !(0 === index) && "stageBtn"}
              ${lastIndex === index && "stageEndBtn"}
              ${0 === index && "stageStartBtn"}
              `}
              onClick={() => handleStageChange(item.id)}
              disabled={currentStage?.opportunityStageId === item.id}
            >
              {item.opportunityStageName}
            </button>
          ))}
      </Slider>
    </Card>
  );
}
