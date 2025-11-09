import React, { useEffect } from "react";
import logo from "../assets/logo.png";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { fetchUserData, logout } from "../redux/authenticationSlice";
import { setSideBarOpen } from "../redux/popUpSlice";
import {
  ArrowBigRightDash,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const SideMenuBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, error } = useAppSelector((state) => state.auth);
  const { sideBarOpen } = useAppSelector((state) => state.popUp);
  const menuItems: MenuItem[] = [
    {
      icon: <LayoutDashboard />,
      label: "My Notes",
      href: "/",
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    if (!user) {
      dispatch(fetchUserData());

    }
  }, [dispatch, navigate, user]);

  useEffect(() => {
    if (error) {
      if (
        error.includes("Unauthorized") ||
        error.includes("token") ||
        error.includes("No token found")
      ) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  }, [error, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const toggleSidebar = () => {
    dispatch(setSideBarOpen(!sideBarOpen));
  };

  const sidebarBaseClasses =
    "fixed top-0 left-0 z-40 h-screen pt-8 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-all duration-300";
  const iconButtonClasses =
    "hover:text-gray-800 cursor-pointer hover:bg-gray-700 p-1 rounded-full text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors";
  const menuItemClasses =
    "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group transition-colors";

  return (
    <div className="bg-gray-500 relative">
      <aside
        className={`${sidebarBaseClasses} ${sideBarOpen
          ? "w-64 translate-x-0"
          : "w-20 -translate-x-full sm:translate-x-0"
          }`}
        aria-label="Sidebar"
      >
        <div className="p-2 ">
          <div
            className={`flex items-center  ${sideBarOpen
              ? "justify-between"
              : "group relative justify-center"
              }`}
          >
            <div className="flex items-center me-2">
              <img
                src={logo}
                className="h-7 rounded-full bg-white"
                alt="Moi Note Logo"
              />
              {sideBarOpen && (
                <span className="pl-3 text-xl font-semibold whitespace-nowrap dark:text-white truncate">
                  Chit Fund
                </span>
              )}
            </div>
            <div
              className={`${iconButtonClasses} ${sideBarOpen
                ? ""
                : "hidden group-hover:block absolute top-0 left-4 "
                } `}
              onClick={toggleSidebar}
            >
              <ArrowBigRightDash
                size={20}
                className={`transition-transform ${!sideBarOpen ? "" : "hover:rotate-180"
                  }  `}
              />
            </div>
          </div>
        </div>

        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {menuItems.map((item, index) => (
              <li key={index}>
                <span onClick={() => navigate(item.href)} className={menuItemClasses + " cursor-pointer"}>
                  <div className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                    {item.icon}
                  </div>
                  {sideBarOpen && (
                    <span className="ml-3 whitespace-nowrap truncate">
                      {item.label}
                    </span>
                  )}
                </span>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className={`${menuItemClasses} w-full`}
              >
                <div className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                  <LogOut />
                </div>
                {sideBarOpen && (
                  <span className="ml-3 whitespace-nowrap truncate">
                    Log Out
                  </span>
                )}
              </button>
            </li>
          </ul>
        </div>

        <div className="absolute bottom-0 left-0 right-0 mb-4 px-3">
          <div className="flex justify-start px-2 items-center bg-white rounded-lg shadow-xl dark:bg-gray-700  cursor-pointer overflow-hidden">
            <div
              className="text-white flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 m-1 w-8 h-8 items-center justify-center"
            >
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            {sideBarOpen && (
              <div className=" flexmin-w-0 flex-col px-2 flex items-center justify-center">
                <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user?.username}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.phone}
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {!sideBarOpen && (
        <div
          className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default SideMenuBar;
