import { Sidebar as SidebarFlowbite } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";

const Sidebar = () => {
  const sidebarFlowbiteTheme = {
    root: {
      base: "h-full",
      collapsed: {
        on: "w-16",
        off: "w-64",
      },
      inner:
        "h-full overflow-y-auto overflow-x-hidden bg-gray-900 py-4 px-3 dark:bg-gray-100",
    },
    collapse: {
      button:
        "group flex w-full items-center rounded-lg p-2 text-base font-normal text-white transition duration-75 hover:bg-gray-800 dark:text-black dark:hover:bg-gray-200",
      icon: {
        base: "h-6 w-6 text-white transition duration-75 group-hover:text-gray-900 dark:text-black dark:group-hover:text-white",
        open: {
          off: "",
          on: "text-gray-900",
        },
      },
      label: {
        base: "ml-3 flex-1 whitespace-nowrap text-left text-white",
        icon: {
          base: "h-6 w-6 transition ease-in-out delay-0",
          open: {
            on: "rotate-180",
            off: "",
          },
        },
      },
      list: "space-y-2 py-2",
    },
    item: {
      base: "flex items-center justify-center rounded-lg p-2 text-base font-normal text-white hover:bg-gray-800 dark:text-black dark:hover:bg-gray-200",
      active: "bg-gray-800",
      collapsed: {
        insideCollapse: "group w-full pl-8 transition duration-75",
        noIcon: "font-bold",
      },
      content: {
        base: "px-3 flex-1 whitespace-nowrap",
      },
      icon: {
        base: "h-6 w-6 flex-shrink-0 text-white transition duration-75 group-hover:text-gray-900 dark:text-black dark:group-hover:text-white",
        active: "text-white dark:text-gray-100",
      },
      label: "",
      listItem: "",
    },
    itemGroup: {
      base: "mt-4 space-y-2 border-t border-gray-800 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-200",
    },
    logo: {
      base: "mb-5 flex items-center pl-2.5",
      collapsed: {
        on: "hidden",
        off: "self-center whitespace-nowrap text-xl font-semibold text-white dark:text-black",
      },
      img: "mr-3 h-6 sm:h-7",
    },
  };

  return (
    <SidebarFlowbite
      aria-label="SidebarFlowbite with content separator example"
      theme={sidebarFlowbiteTheme}
      className="flex flex-col"
    >
      <SidebarFlowbite.Items>
        <SidebarFlowbite.ItemGroup>
          <SidebarFlowbite.Item href="#" icon={HiChartPie}>
            Dashboard
          </SidebarFlowbite.Item>
          <SidebarFlowbite.Item href="#" icon={HiViewBoards}>
            Kanban
          </SidebarFlowbite.Item>
          <SidebarFlowbite.Item href="#" icon={HiInbox}>
            Inbox
          </SidebarFlowbite.Item>
          <SidebarFlowbite.Item href="#" icon={HiUser}>
            Users
          </SidebarFlowbite.Item>
          <SidebarFlowbite.Item href="#" icon={HiShoppingBag}>
            Products
          </SidebarFlowbite.Item>
          <SidebarFlowbite.Item href="#" icon={HiArrowSmRight}>
            Sign In
          </SidebarFlowbite.Item>
          <SidebarFlowbite.Item href="#" icon={HiTable}>
            Sign Up
          </SidebarFlowbite.Item>
        </SidebarFlowbite.ItemGroup>
        <SidebarFlowbite.ItemGroup>
          <SidebarFlowbite.Item href="#" icon={HiChartPie}>
            Upgrade to Pro
          </SidebarFlowbite.Item>
          <SidebarFlowbite.Item href="#" icon={HiViewBoards}>
            Documentation
          </SidebarFlowbite.Item>
          <SidebarFlowbite.Item href="#" icon={BiBuoy}>
            Help
          </SidebarFlowbite.Item>
        </SidebarFlowbite.ItemGroup>
      </SidebarFlowbite.Items>
    </SidebarFlowbite>
  );
};

export default Sidebar;
