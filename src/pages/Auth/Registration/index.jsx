import { useEffect, useState } from "react";
import { EyeIcon, EyeOffIcon, ChevronDown } from "lucide-react";
import "@/assets/css/login/login.css";
import { Registration, Society } from "@/apis/api";
import { useNavigate, Link } from "react-router-dom";
import Societypopup from "./Society";

export const RegistrationForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSociety, setSelectedSociety] = useState("");
  const [isOpenDrop, setIsOpenDrop] = useState(false);
  const [society, setSociety] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    country: "",
    state: "",
    city: "",
    password: "",
    confirmPassword: "",
    societyId: selectedSociety ? selectedSociety.id : "",
  });

  useEffect(() => {
    const fetchSociety = async () => {
      let society = [];
      let data = await Society();
      data.forEach((v) => {
        var value = {
          id: v._id,
          name: v.name,
        };
        society.push(value);
      });
      setSociety(society);
    };
    fetchSociety();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.societyId === "" && selectedSociety !== "") {
      formData.societyId = selectedSociety.id;
    } else if (formData.societyId === "" && selectedSociety === "") {
      alert("Please select a society");
      return;
    }
    formData.name = `${formData.firstName} ${formData.lastName}`;
    formData.role = "admin";
    delete formData.firstName;
    delete formData.lastName;

    let data = await Registration(formData);
    if (data.status === 1) {
      alert(data.message);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        number: "",
        country: "",
        state: "",
        city: "",
        password: "",
        confirmPassword: "",
        societyId: "",
      });
      setSelectedSociety("");
      navigate("/");
    } else {
      alert(data.message);
    }
  };

  const toggleDropdown = () => setIsOpen(!isOpen);
  const togglePopup = () => {
    setIsOpenDrop(!isOpenDrop);
  };

  const handleSelect = (society) => {
    setSelectedSociety(society);
    setIsOpen(false);
  };

  return (
    <>
      <h2 className="text-2xl sm:text-3xl pt-10 pb-2 font-semibold lg:text-left ps-5">
        Registration
      </h2>
      <form className="p-4 sm:p-8 lg:p-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4  mb-2">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-950"
            >
              First Name*
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter First Name"
              className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF5733] focus:border-[#FF5733]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-950"
            >
              Last Name*
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter Last Name"
              className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF5733] focus:border-[#FF5733]"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-950"
            >
              Email Address*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email Address"
              className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF5733] focus:border-[#FF5733]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="number"
              className="block text-sm font-medium text-gray-950"
            >
              Phone Number*
            </label>
            <input
              type="tel"
              id="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF5733] focus:border-[#FF5733]"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-2">
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-950"
            >
              Country*
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter Country"
              className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF5733] focus:border-[#FF5733]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-950"
            >
              State*
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter State"
              className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF5733] focus:border-[#FF5733]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-950"
            >
              City*
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter City"
              className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF5733] focus:border-[#FF5733]"
              required
            />
          </div>
        </div>
        {/* Dropdown menu */}
        <div className="w-full mb-2">
          <label
            htmlFor="society"
            className="block text-sm font-medium text-gray-950 mb-1"
          >
            Select Society*
          </label>
          <div className="relative">
            <div
              onClick={toggleDropdown}
              className="w-full bg-white border border-zinc-300 rounded-md shadow-sm px-4 py-2 text-left cursor-pointer"
            >
              <span className="block truncate">
                {selectedSociety.name || "Select a society"}
              </span>
              <ChevronDown
                className="absolute inset-y-0 right-0 pr-2 h-5 w-7 text-slate-950"
                style={{ top: "12px" }}
              />
            </div>
            {isOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md p-2.5">
                <div className="max-h-48 overflow-y-auto custom-scrollbar">
                  <ul>
                    {society.map((society) => (
                      <li
                        key={society.id}
                        onClick={() => handleSelect(society)}
                        className="text-gray-900 cursor-pointer py-2 pl-3 pr-9 hover:bg-gray-100"
                      >
                        {society.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={togglePopup}
                  className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded hover:bg-orange-600"
                >
                  Create Society
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Password and Confirm Password */}
        <div className="mb-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-950"
          >
            Password*
          </label>
          <div className="mt-1 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full border border-zinc-300 rounded-md py-2 px-3"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3"
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5 text-slate-950" />
              ) : (
                <EyeIcon className="h-5 w-5 text-slate-950" />
              )}
            </button>
          </div>
        </div>
        <div className="mb-2">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-950"
          >
            Confirm Password*
          </label>
          <div className="mt-1 relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Enter Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="block w-full border border-zinc-300 rounded-md py-2 px-3"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3"
            >
              {showConfirmPassword ? (
                <EyeOffIcon className="h-5 w-5 text-slate-950" />
              ) : (
                <EyeIcon className="h-5 w-5 text-slate-950" />
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-zinc-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-900"
          >
            I agree to all the Terms and{" "}
            <span className="dash">Privacy Policies</span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-md hover:bg-[#ff2e00] hover:text-white mt-5"
        >
          Register
        </button>
        <p className="mt-6 text-center text-center text-sm text-gray-600">
          Already have an account ?
          <Link to="/login" className="dash">
            Login
          </Link>
        </p>
      </form>   
      <Societypopup isOpenDrop={isOpenDrop} togglePopup={togglePopup} />
    </>
  );
};

const popupStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};
const popupContentStyle = {
  padding: "20px",
  borderRadius: "5px",
};
