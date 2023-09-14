import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearTask,
  loadSingleTask,
} from "../../../../redux/rtk/features/crm/task/crmTaskSlice";
import DetailsInfo from "./DetailsInfo";
import TaskProfile from "./TaskProfile";

export default function TaskDetails() {
  const { TaskId: id } = useParams();
  const dispatch = useDispatch();
  const { task, loading: taskLoading } = useSelector((state) => state.crmTask);

  useEffect(() => {
    dispatch(loadSingleTask(id));
    return () => {
      clearTask();
    };
  }, [dispatch, id]);
  return (
    <>
      <div
        className='container overflow-y-auto overflow-x-hidden flex flex-col gap-8'
        style={{ height: "calc(100vh - 114px)" }}
      >
        <TaskProfile data={task} loading={taskLoading} />
        <DetailsInfo data={task} loading={taskLoading} />
      </div>
    </>
  );
}
