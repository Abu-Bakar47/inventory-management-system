import { useState, type FormEvent } from "react";
import Input from "../reusableComponents/Input";
import { CiLocationOn, CiUser } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiStoreLine } from "react-icons/ri";
import { BsTelephone } from "react-icons/bs";
import type { AppDispatch, RootState } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "../../Redux/slice/authSlice";
import Spiner from "../reusableComponents/Spiner";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formError, setFormError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.auth.loading);
  console.log("loadingSign", loading);
  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!acceptTerms) {
      setFormError("You must accept the terms and conditions");
      return;
    }
    if (password.length < 8) {
      setPasswordError("Must be at least 8 characters.");
      return;
    }
    const payload = {
      name,
      storeName,
      address,
      mobile,
      email,
      password,
      acceptedTerms: acceptTerms,
    };

    dispatch(registerThunk(payload))
      .then(() => {
        setName("");
        setStoreName("");
        setAddress("");
        setMobile("");
        setEmail("");
        setPassword("");
        setFormError("");
        setPasswordError("");
        navigate("/login");
      })
      .catch(() => {
        // Errors are already shown via toast
      });

    // console.log("payload_", payload);

    setName("");
    setStoreName(""), setAddress(""), setMobile(""), setEmail("");
    setPassword("");
    setFormError("");
    setPasswordError("");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-5xl p-2 lg:p-0 flex  items-center gap-6">
        <div className="w-full hidden md:block lg:block text-4xl text-blue-700 font-bold text-center">
          Inventory
        </div>

        <div className="w-full">
          <p className="text-xl font-semibold text-gray-800">
            Create an account
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Start your 30-day free trial.
          </p>
          <form
            className="flex flex-col gap-2 mt-5"
            onSubmit={handleLoginSubmit}
          >
            <Input
              label="Name*"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
              required={true}
              icon={<CiUser />}
            />
            <Input
              label="Store Name*"
              name="storeName"
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="Enter Store Name"
              required={true}
              icon={<RiStoreLine />}
            />
            <Input
              label="Address*"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Address"
              required={true}
              icon={<CiLocationOn />}
            />
            <Input
              label="Mobile Number*"
              name="mobile"
              type="number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter Mobile Number"
              required={true}
              icon={<BsTelephone />}
            />
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

            <label className="inline-flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={() => setAcceptTerms((prev) => !prev)}
                className=" text-blue-600 accent-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 transition duration-150"
              />
              <p className="text-sm text-gra-400">
                I have read and agreed to the
                <span
                  className="text-blue-600"
                  onClick={() => navigate("/term-service")}
                >
                  Terms of Service
                </span>{" "}
                and{" "}
                <span
                  className="text-blue-600"
                  onClick={() => navigate("policy")}
                >
                  Privacy Policy
                </span>
              </p>
            </label>
            {/* for terms and condition accept error */}
            {/* Terms checkbox error */}
            {formError && <p className="text-sm text-red-600">{formError}</p>}
            <button
              type="submit"
              disabled={loading}
              className="text-sm text-white bg-blue-600 py-2 px-4 rounded-sm disabled:bg-blue-400 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {loading ? (
                <Spiner/>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          <button className="w-full mt-3 text-gray-700 flex text-center justify-center gap-5 border border-gray-300 rounded-sm py-2 text-sm cursor-pointer">
            <span className="text-center">
              <FcGoogle size={20} />
            </span>
            <span>Sign up with Google</span>
          </button>
          <div className="w-full flex text-center justify-center mt-3 gap-2">
            <span className="text-sm text-gray-600">
              Already have an account?
            </span>
            <span
              className="text-sm text-blue-600 font-semibold cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Log in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
