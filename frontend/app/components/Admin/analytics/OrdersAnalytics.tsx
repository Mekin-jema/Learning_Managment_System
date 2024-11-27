import React from "react";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import Loader from "../../Loader/Loader";
import { useGetOrdersAnalyticsQuery } from "@/Redux/features/analytics/analyticsApi";
import { styles } from "@/app/style/style";
const OrdersData = [
  {
    name: "Page A",
    Count: 4000,
  },
  {
    name: "Page B",
    Count: 3000,
  },
  {
    name: "Page C",
    Count: 2000,
  },
  {
    name: "Page D",
    Count: 2780,
  },
  {
    name: "Page E",
    Count: 1890,
  },
  {
    name: "Page F",
    Count: 2390,
  },
  {
    name: "Page G",
    Count: 3490,
  },
];

type Props = {
  isDashboard: boolean;
};
const OrdersAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetOrdersAnalyticsQuery({});

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            !isDashboard ? "mt-[50px]" : "mt-[50px]"
          } dark:bg-[#111c43] shadow-sm pb-5 rounded-sm h-screen`}
        >
          <div className={`${isDashboard ? "!mt-8 mb-5" : ""}`}>
            <h1
              className={`${styles.title} ${
                isDashboard && `text-[20px]`
              } px-5 !text-start `}
            >
              Users Analytics
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5`}>
                Last 12 months analytics data
              </p>
            )}
          </div>
          <div
            className={`w-full ${
              isDashboard ? "h-[300px]" : "h-[500px]"
            } flex items-center justify-center`}
          >
            {data?.orders?.last12Months?.length > 0 || OrdersData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data?.orders?.last12Months || OrdersData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <Legend height={20} wrapperStyle={{ margin: "0 0 10px 0" }} />

                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid stroke="#f5f5f5" />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#466289"
                    fill="#3faf82"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersAnalytics;
