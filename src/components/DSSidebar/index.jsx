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
    <SidebarProvider
      className={`w-64 ${
        isMenuOpen ? "block" : "hidden"
      } md:flex flex-col bg-white`}
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
  );
};
