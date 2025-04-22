import { Flex } from "antd";
import {
  BarsOutlined,
  CheckSquareOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const Navbar = () => {
  const [isFullWidth, setIsFullWidth] = useState(true);
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <nav
      className={`container transition-all duration-300 overflow-hidden min-h-screen p-4 border-r border-gray-200 flex flex-col justify-between ${
        isFullWidth ? "w-64" : "w-20"
      }`}
    >
      <Flex gap="middle" vertical className="w-full">
        <h1
          className={`text-3xl font-bold mx-4 my-4 transition-opacity duration-300 ${
            isFullWidth ? "" : "text-sm"
          }`}
        >
          {format(time, "p")}
        </h1>

        <NavLink
          to="/"
          className={({ isActive }: { isActive: boolean }) =>
            `${isActive ? "active" : ""} w-[200px] px-4 py-2 gap-2`
          }
        >
          <PieChartOutlined className="text-xl text-black" />
          <span
            className={`ml-2 transition-opacity duration-300 ${
              isFullWidth ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
            }`}
          >
            Dashboard
          </span>
        </NavLink>

        <NavLink
          to="/task-management"
          className={({ isActive }: { isActive: boolean }) =>
            `${isActive ? "active" : ""} w-[200px] px-4 py-2 gap-2`
          }
        >
          <CheckSquareOutlined className="text-xl text-black" />
          <span
            className={`ml-2 transition-opacity duration-300 ${
              isFullWidth ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
            }`}
          >
            My Task
          </span>
        </NavLink>

        <NavLink
          to="/todo"
          className={({ isActive }: { isActive: boolean }) =>
            `${isActive ? "active" : ""} w-[200px] px-4 py-2 gap-2`
          }
        >
          <BarsOutlined className="text-xl text-black" />
          <span
            className={`ml-2 transition-opacity duration-300 ${
              isFullWidth ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
            }`}
          >
            To-do List
          </span>
        </NavLink>
      </Flex>

      <div className="p-4 ml-auto">
        <button
          onClick={() => setIsFullWidth((prev) => !prev)}
          className="cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
        >
          {isFullWidth ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
