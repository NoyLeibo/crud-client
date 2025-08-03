import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
  const navigate = useNavigate();
  
  return (
    <>
      <h1>404</h1>
      <button onClick={() => navigate("/")}>Go back to Home-Page</button>
    </>
  );
}
