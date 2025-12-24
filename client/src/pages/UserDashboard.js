import {
  useEffect,
  useState,
  useCallback,
  useRef,
  useContext
} from "react";
import axios from "../axios";
import UserForm from "../components/UserForm";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const formRef = useRef(null);

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchUsers = useCallback(() => {
    axios
      .get("/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => {
        console.error("Fetch Error:", err);
        if (err.response?.status === 401) logout();
      });
  }, [logout]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchUsers();
    }
  }, [user, navigate, fetchUsers]);
