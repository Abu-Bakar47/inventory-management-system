import { useState, type FormEvent } from "react";
import Input from "../reusableComponents/Input";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../Redux/store";
import { loginThunk } from "../../Redux/slice/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.auth.loading);
  console.log("loading",loading)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setPasswordError("Must be at least 8 characters.");
      return;
    }
    const payload = { email, password };
    dispatch(loginThunk(payload))
      .unwrap()
      .then((res) => {
        console.log("Login Success Response:", res); // check here
    console.log("Navigating to dashboard...");   // ✅ confirm this runs
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error("Login Failed:", err);
      });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-5xl p-2 lg:p-6 flex items-center gap-6">
        <div className="w-full hidden md:block lg:block text-4xl text-blue-700 font-bold text-center">
          Inventory
        </div>

        <div className="w-full">
          <p className="text-xl font-semibold text-gray-800">
            Login in to your account
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Welcome back! Please enter your details.
          </p>
          <form
            className="flex flex-col gap-2 mt-5"
            onSubmit={handleLoginSubmit}
          >
            <Input
              label="Email*"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              required={true}
              icon={<MdOutlineEmail />}
            />
            <Input
              label="Password*"
              name="password"
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              required={true}
              icon={<TbLockPassword />}
              rightIcon={
                passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />
              }
              onRightIconClick={() => setPasswordVisible((prev) => !prev)}
            />
            {passwordError && (
              <p className="text-sm text-red-600">{passwordError}</p>
            )}
               <button
              type="submit"
              disabled={loading}
              className="text-sm text-white bg-blue-600 py-2 px-4 rounded-sm disabled:bg-blue-400 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {loading ? (
                <div className={`w-5 h-5 border-2 border-t-transparent ${loading ? "cursor-not-allowed":"cursor-pointer"}  border-blue-200 border-dashed rounded-full animate-spin`}></div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <button className="flex float-end py-3 text-xs text-blue-800 cursor-pointer font-medium">
            Forget password
          </button>
          <button className="w-full mt-3 text-gray-700 flex text-center justify-center gap-5 border border-gray-300 rounded-sm py-2 text-sm cursor-pointer">
            <span className="text-center">
              <FcGoogle size={20} />
            </span>
            <span>Sign in with Google</span>
          </button>
          <div className="w-full flex text-center justify-center mt-3 gap-2">
            <span className="text-sm text-gray-600">
              Don’t have an account?
            </span>
            <span
              className="text-sm text-blue-600 font-semibold cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
