import { useNavigate } from "react-router-dom";
export default function () {
  const navigate = useNavigate();
  return navigate(...arguments);
}
