import { Flex } from "antd";

interface PriorityCardProps {
  priority: "low" | "medium" | "high";
  count: number;
  totalCount: number;
}

const PriorityCard = ({ priority, count, totalCount }: PriorityCardProps) => {
  return (
    <Flex align="center">
      <div className="border-slate-100 border rounded-xl px-8 py-4 flex gap-4 items-center shadow-md transition duration-300 select-none hover:shadow-lg">
        <h3
          className={`text-xl font-bold 
          ${priority === "low" && "text-green-400"}
           ${priority === "medium" && "text-orange-400"}
           ${priority === "high" && "text-red-400"}`}
        >
          {priority.toUpperCase()}
        </h3>
        <div
          className={`rounded-full border p-3 
           ${priority === "low" && "border-green-400"}
           ${priority === "medium" && "border-orange-400"}
           ${priority === "high" && "border-red-400"}`}
        >
          {count} / {totalCount}
        </div>
      </div>
    </Flex>
  );
};

export default PriorityCard;
