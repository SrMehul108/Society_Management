// import React, { useState } from "react";
// import {
//   SidebarProvider,
//   SidebarMenuItem,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarHeader,
//   SidebarFooter,
// } from "../ui/sidebar";
// import { NavLink } from "react-router-dom";

// export const DSSidebar = ({ items }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [openGroups, setOpenGroups] = useState({}); // Track open groups

//   const toggleGroup = (title) => {
//     setOpenGroups((prev) => ({
//       ...prev,
//       [title]: !prev[title],
//     }));
//   };

//   const handleToggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <SidebarProvider
//       className={`w-64 ${
//         isMenuOpen ? "block" : "hidden"
//       } md:flex flex-col bg-white`}
//     >
//       <SidebarHeader className="p-6 text-center text-2xl font-bold">
//         <p
//           className="pb-4 text-center text-2xl font-bold"
//           style={{ borderBottom: "1px solid", borderColor: "#F4F4F4" }}
//         >
//           <span className="dash">Dash</span>Stack
//         </p>
//       </SidebarHeader>
//       <SidebarContent>
//         {items.map((group) => (
//           <SidebarGroup key={group.title}>
//             <SidebarGroupContent>
//               <SidebarMenu>
//                 {group.items ? (
//                   <SidebarMenuItem key={group.title}>
//                     <SidebarMenuButton
//                       asChild
//                       onClick={() => toggleGroup(group.title)}
//                       className="flex items-center py-2 px-4 rounded-lg text-black hover-gradient hover:text-white cursor-pointer"
//                     >
//                       <div>
//                         {group.icon}
//                         <span className="ml-2">{group.title}</span>
//                         <span>{group.dricons}</span>
//                       </div>
//                     </SidebarMenuButton>
//                     {openGroups[group.title] && (
//                       <div className="pl-4">
//                         {group.items.map((item) => (
//                           <SidebarMenuItem key={item.title}>
//                             <SidebarMenuButton asChild>
//                               <NavLink
//                                 to={item.url}
//                                 className={({ isActive }) =>
//                                   `py-2 px-4 rounded-lg text-black hover:bg-orange-700 flex items-center ${
//                                     isActive ? "bg-orange-500" : "text-white"
//                                   }`
//                                 }
//                               >
//                                 <span>{item.title}</span>
//                               </NavLink>
//                             </SidebarMenuButton>
//                           </SidebarMenuItem>
//                         ))}
//                       </div>
//                     )}
//                   </SidebarMenuItem>
//                 ) : (
//                   <SidebarMenuItem key={group.title}>
//                     <SidebarMenuButton asChild>
//                       <NavLink
//                         to={group.url}
//                         className={({ isActive }) =>
//                           `py-2 px-4 rounded-lg text-black hover:bg-orange-700 flex items-center ${
//                             isActive ? "bg-orange-500" : "text-white"
//                           }`
//                         }
//                       >
//                         {group.icon}
//                         <span className="ml-2">{group.title}</span>
//                       </NavLink>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 )}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         ))}
//       </SidebarContent>
//       <SidebarFooter>
//         <div className="p-4 border-t border-gray-200">
//           <button className="flex items-center text-red-500 hover:bg-gray-200 hover:text-red-700 w-full">
//             Logout
//           </button>
//         </div>
//       </SidebarFooter>
//     </SidebarProvider>
//   );
// };


import React, { useState } from "react";

import {
  SidebarProvider,
  SidebarMenuItem,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from "../ui/sidebar";
import { NavLink } from "react-router-dom";
import { MenuIcon, XIcon } from "lucide-react";

export const DSSidebar = ({ items }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState({}); // Track open groups

  const toggleGroup = (title) => {
    setOpenGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      
    <button
  className="md:hidden p-4  text-black fixed top-0 left-0 z-50"
  onClick={handleToggleMenu}
>
  {isMenuOpen ? (
    <XIcon className="h-6 w-6" aria-hidden="true" />
  ) : (
    <MenuIcon className="h-6 w-6" aria-hidden="true" />
  )}
</button>  

      {/* Sidebar */}
      <SidebarProvider
        className={`fixed md:relative top-0 left-0 h-full bg-white z-40 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out w-64 flex flex-col`}
      >
        <SidebarHeader className="p-6 text-center text-2xl font-bold">
          <p
            className="pb-4 text-center text-2xl font-bold"
            style={{ borderBottom: "1px solid", borderColor: "#F4F4F4" }}
          >
            <span className="dash">Dash</span>Stack
          </p>
        </SidebarHeader>

        <SidebarContent>
          {items.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items ? (
                    <SidebarMenuItem key={group.title}>
                      <SidebarMenuButton
                        asChild
                        onClick={() => toggleGroup(group.title)}
                        className="flex items-center py-2 px-4 rounded-lg text-black hover-gradient hover:text-white cursor-pointer"
                      >
                        <div>
                          {group.icon}
                          <span className="ml-2">{group.title}</span>
                          <span>{group.dricons}</span>
                        </div>
                      </SidebarMenuButton>
                      {openGroups[group.title] && (
                        <div className="pl-4">
                          {group.items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                              <SidebarMenuButton asChild>
                                <NavLink
                                  to={item.url}
                                  className={({ isActive }) =>
                                    `py-2 px-4 rounded-lg text-black hover:bg-orange-700 flex items-center ${
                                      isActive ? "bg-orange-500" : "text-white"
                                    }`
                                  }
                                >
                                  <span>{item.title}</span>
                                </NavLink>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </div>
                      )}
                    </SidebarMenuItem>
                  ) : (
                    <SidebarMenuItem key={group.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={group.url}
                          className={({ isActive }) =>
                            `py-2 px-4 rounded-lg text-black hover:bg-orange-700 flex items-center ${
                              isActive ? "bg-orange-500" : "text-white"
                            }`
                          }
                        >
                          {group.icon}
                          <span className="ml-2">{group.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter>
          <div className="p-4 border-t border-gray-200">
            <button className="flex items-center text-red-500 hover:bg-gray-200 hover:text-red-700 w-full">
              Logout
            </button>
          </div>
        </SidebarFooter>
      </SidebarProvider>

      {/* Overlay for mobile */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={handleToggleMenu}
        ></div>
      )}
    </>
  );
};

