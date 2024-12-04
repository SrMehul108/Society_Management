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

  export const PendingButton = ({ label = "Pending" }) => {
    return (
        <button className="flex items-center px-4 py-1.5 bg-yellow-50 text-yellow-600 font-medium rounded-full">
       
        {label}
      </button>
    );
  };
  export const SolveButton = ({ label = "Solve" }) => {
    return (
        <button className="flex items-center px-5 py-1.5 bg-green-100 text-green-600 font-medium rounded-full">
      
        {label}
      </button>
    );
  };
  export const OpenButton = ({ label = "Open" }) => {
    return (
        <button className="flex items-center px-6 py-1.5 bg-blue-50 text-blue-600 font-medium rounded-full">
       
        {label}
      </button>
    );
  };


  export const DoneButton = ({ label = "Done" }) => {
    return (
        <button className="flex items-center px-4 py-1.5 bg-emerald-50 text-emerald-800 font-medium rounded-full">
        
        {label}
      </button>
    );
  };
  export const OnlineButton = ({ label = "Online" }) => {
    return (
        <button className="flex items-center px-4 py-1.5 bg-gray-100 text-blue-600 font-medium rounded-full">
       
        {label}
      </button>
    );
  };
  export const CashButton = ({ label = "Cash" }) => {
    return (
        <button className="flex items-center px-4 py-1.5 bg-gray-100 text-black font-medium rounded-full">
       
        {label}
      </button>
    );
  };
  export const PenalityButton = ({ label = "250" }) => {
    return (
        <button className="flex items-center px-4 py-1.5 bg-red-700 text-white font-medium rounded-full">
      
        {label}
      </button>
    );
  };

  export const MediumButton = ({ label = "Medium" }) => {
    return (
        <button className="flex items-center px-4 py-1.5 bg-blue-500 text-white font-medium rounded-full">
        
        {label}
      </button>
    );
  };
  export const LowButton = ({ label = "Low" }) => {
    return (
        <button className="flex items-center px-7 py-1.5 bg-green-500 text-white font-medium rounded-full">
        
        {label}
      </button>
    );
  };
  export const HighButton = ({ label = "High" }) => {
    return (
        <button className="flex items-center px-6 py-1.5 bg-red-500 text-white font-medium rounded-full">
        
        {label}
      </button>
    );
  };
  export const MaleButton = ({ label = " Male" }) => {
    return (
        <button className="flex items-center px-6 py-1.5 bg-red-500 text-white font-medium rounded-full">
        <FaUser className="mr-2 text-emerald-800" />
        {label}
      </button>
    );
  };
  export const FeMaleButton = ({ label = " FeMale" }) => {
    return (
        <button className="flex items-center px-6 py-1.5 bg-red-500 text-white font-medium rounded-full">
        <FaUser className="mr-2 text-emerald-800" />
        {label}
      </button>
    );
  };