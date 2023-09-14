import { useNavigate } from "react-router";

const WelcomePage = () => {
  const navigate = useNavigate();
  navigate("/admin/dashboard");

  return <></>;
};

export default WelcomePage;
