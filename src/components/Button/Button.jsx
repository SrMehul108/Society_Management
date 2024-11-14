import { FaUser } from "react-icons/fa"; // Optional, for the icon

export const OwnerButton = ({ label = "Owner" }) => {
  return (
    <button className="flex items-center px-4 py-1.5 bg-indigo-100 text-indigo-600 font-medium rounded-full">
      <FaUser className="mr-2 text-indigo-500" /> {/* Icon - Optional */}
      {label}
    </button>
  );
};

export const TenantButton = ({ label = "Tenant" }) => {
    return (
      <button className="flex items-center px-4 py-1.5 bg-pink-100 text-pink-600 font-medium rounded-full">
        <FaUser className="mr-2 text-pink-600" /> {/* Icon - Optional */}
        {label}
      </button>
    );
  };
  
  export const VacateButton = ({ label = "Vacate" }) => {
    return (
      <button className="flex items-center px-4 py-1.5 bg-pink-50 text-indigo-800 font-medium rounded-full">
        <FaUser className="mr-2 text-indigo-800" /> {/* Icon - Optional */}
        {label}
      </button>
    );
  };

  export const OccupiedButton = ({ label = "Occupied" }) => {
    return (
      <button className="flex items-center px-4 py-1.5 bg-emerald-50 text-emerald-800 font-medium rounded-full">
        <FaUser className="mr-2 text-emerald-800" /> {/* Icon - Optional */}
        {label}
      </button>
    );
  };

  export const EmptyButton = ({ label = "--" }) => {
    return (
      <button className="flex items-center px-11 py-1.5 bg-gray-100 text-gray-800 font-extrabold text-xl rounded-full">
        
        {label}
      </button>
    );
  };