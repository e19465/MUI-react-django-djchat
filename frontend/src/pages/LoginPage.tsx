import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuthServiceContext } from "../context/AuthContext";
const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthServiceContext();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      const { username, password } = values;
      const res = await login(username, password);
      if (res) {
        console.log(res);
      } else {
        navigate("/");
      }
    },
  });
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          required
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          required
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default LoginPage;
