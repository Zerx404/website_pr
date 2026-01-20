import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => { login("user"); navigate("/"); }}>
        Login User
      </button>

      <button onClick={() => { login("admin"); navigate("/admin"); }}>
        Login Admin
      </button>
    </>
  );
}
