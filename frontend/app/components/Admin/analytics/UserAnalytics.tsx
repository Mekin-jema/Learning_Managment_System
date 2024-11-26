import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  LabelList,
  Tooltip,
  AreaChart,
  Area,
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
            !isDashboard ? "mt-[50px]" : "mt-50px"
          } dark:bg-[#111c43] shadow-sm pb-5 rounded-sm`}
        >
          <div className={`${isDashboard ? "!mt-8 mb-5" : ""}`}>
            <h1
              className={`${styles.title} ${
                isDashboard && `text-[20px]`
              }px-5 !text-start `}
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
            className={`w-full${
              isDashboard ? "h-[30vh]" : "h-screen"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={!isDashboard ? "50%" : "100%"}
            >
              <AreaChart
                data={analyticsData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="Count"
                  stroke="#466289"
                  fill="@4662d9"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAnalytics;
