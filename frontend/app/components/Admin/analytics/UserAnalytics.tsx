import React from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import Loader from "../../Loader/Loader";
import { useGetUsersAnalyticsQuery } from "@/Redux/features/analytics/analyticsApi";
import { styles } from "@/app/style/style";

const analyticsData = [
  { name: "January 2023", count: 440 },
  { name: "February 2023", count: 8200 },
  { name: "March 2023", count: 4033 },
  { name: "April 2023", count: 2042 },
  { name: "May 2023", count: 3454 },
  { name: "June 2023", count: 356 },
  { name: "July 2023", count: 5667 },
  { name: "August 2023", count: 1320 },
  { name: "September 2023", count: 6536 },
  { name: "October 2023", count: 5480 },
  { name: "November 2023", count: 485 },
];

type Props = {
  isDashboard: boolean;
};

const UserAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetUsersAnalyticsQuery({});

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
            {data?.users?.last12Months?.length > 0 ||
            analyticsData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data?.users?.last12Months || analyticsData}
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
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#466289"
                    fill="#3faf82"
                  />
                </AreaChart>
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

export default UserAnalytics;
