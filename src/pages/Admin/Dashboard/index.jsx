import React, { useState, useEffect, useCallback } from "react";
import PieChart from "@/components/core/PieChart";
import StackedBarChart from "@/components/core/StackBarChart";
import { DatePicker } from "antd";
import { Select } from "antd";
import userServices from "@/services/userServices";
import projectServices from "@/services/projectServices";
import groupServices from "@/services/groupServices";
import tweetServices from "@/services/tweetServices";
import dayjs from "dayjs";
import PointStylingChart from "../../../components/core/PointStylingChart";

export default function Dashboard() {
  const [projectStats, setProjectStats] = useState({});
  const [projectNewStats, setProjectNewStats] = useState({});
  const [projectTechStats, setProjectTechStats] = useState([]);
  const [projectFieldStats, setProjectFieldStats] = useState([]);
  const [userStats, setUserStats] = useState({});
  const [registrationStats, setRegistrationStats] = useState([]);
  const [groupStats, setGroupStats] = useState([]);
  const [tweetStats, setTweetStats] = useState([]);
  const [typeTopGroup, setTypeTopGroup] = useState("members");
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format("MM/YYYY"));
  const [selectedYearsUserNew, setSelectedYearsUserNew] = useState(
    dayjs().format("YYYY")
  );
  const [selectedYear, setSelectedYear] = useState(dayjs().format("YYYY"));
  const [selectedGroupView, setSelectedGroupView] = useState("members");
  const [selectedYearProject, setSelectedYearProject] = useState(
    dayjs().format("YYYY")
  );

  // Fetch overall project statistics
  const fetchProjectStats = async () => {
    try {
      const data = await projectServices.statistics();
      setProjectStats(data);
    } catch (error) {
      console.error("Error fetching project stats:", error);
    }
  };

  // Fetch project statistics by technology
  const fetchProjectTechStats = async () => {
    try {
      const data = await projectServices.statisticsByTechnology();
      setProjectTechStats(data);
    } catch (error) {
      console.error("Error fetching project tech stats:", error);
    }
  };

  // Fetch project statistics by field
  const fetchProjectFieldStats = async () => {
    try {
      const data = await projectServices.statisticsByField();
      setProjectFieldStats(data);
    } catch (error) {
      console.error("Error fetching project field stats:", error);
    }
  };

  // Fetch project statistics by month
  const fetchProjectNewStats = async () => {
    if (!selectedYearProject) return;
    try {
      const data = await projectServices.statisticsByYear({
        year: selectedYearProject,
      });
      setProjectNewStats(data);
    } catch (error) {
      console.error("Error fetching project new stats:", error);
    }
  };
  console.log(projectNewStats);

  // Fetch user overall statistics
  const fetchUserStats = async () => {
    try {
      const data = await userServices.overallStats();
      setUserStats(data);
    } catch (error) {
      console.error("Error fetching user stats:", error);
    }
  };

  // Fetch user registration statistics
  const fetchRegistrationStats = async () => {
    if (!selectedYearsUserNew) return;
    try {
      const data = await userServices.registrationStats({
        year: selectedYearsUserNew,
      });
      setRegistrationStats(data);
    } catch (error) {
      console.error("Error fetching registration stats:", error);
    }
  };

  // Fetch top groups statistics
  const fetchGroupStats = async () => {
    try {
      const data = await groupServices.statisticsTopGroups({
        type: typeTopGroup,
      });
      setGroupStats(data);
    } catch (error) {
      console.error("Error fetching group stats:", error);
    }
  };

  // Fetch tweet monthly statistics
  const fetchTweetStats = async () => {
    try {
      const data = await tweetServices.monthlyStats({
        year: selectedYear,
      });
      setTweetStats(data);
    } catch (error) {
      console.error("Error fetching tweet stats:", error);
    }
  };

  useEffect(() => {
    fetchProjectStats();
    fetchUserStats();
    fetchTweetStats();
    fetchRegistrationStats();
    fetchGroupStats();
    fetchProjectTechStats();
    fetchProjectFieldStats();
    fetchProjectNewStats();
  }, []);

  useEffect(() => {
    fetchTweetStats();
  }, [selectedYear]);

  useEffect(() => {
    fetchRegistrationStats();
  }, [selectedYearsUserNew]);

  useEffect(() => {
    fetchProjectNewStats();
  }, [selectedYearProject]);

  useEffect(() => {
    fetchGroupStats();
  }, [typeTopGroup]);

  return (
    <>
      <div className="flex mb-3">
        <div className="w-[50%]">
          <div className="flex justify-between">
            <div className="text-lg font-bold">Người dùng mới </div>

            <DatePicker
              picker="year"
              value={selectedYearsUserNew ? dayjs(selectedYearsUserNew) : null}
              onChange={(date) => setSelectedYearsUserNew(date?.format("YYYY"))}
            />
          </div>
          <StackedBarChart
            dataSource={registrationStats?.result?.map((item) => ({
              label: "Tháng" + item.month,
              Freelancer: item.data[0].count,
              Employer: item.data[1].count,
            }))}
          />
        </div>
        <div className="w-[50%] flex justify-center">
          <div className="w-[50%] ">
            <div>
              <div className="text-lg font-bold">Người dùng hệ thống</div>
              <PieChart
                dataSource={userStats?.result?.map((item) => ({
                  value: item.count,
                  label: item.role,
                }))}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex mb-3">
        <div className="w-[25%] ">
          <div>
            <div className="text-lg font-bold">Dự án hệ thống</div>
            <PieChart
              dataSource={projectStats?.result?.map((item) => ({
                value: item.count,
                label: item.name,
              }))}
            />
          </div>
        </div>
        <div className="w-[45%] ">
          <div className="flex justify-between">
            <div className="text-lg font-bold">Dự án mới </div>
            <DatePicker
              picker="year"
              value={selectedYearProject ? dayjs(selectedYearProject) : null}
              className="mr-3"
              onChange={(date) => setSelectedYearProject(date?.format("YYYY"))}
            />
          </div>
          <PointStylingChart
            dataSource={projectNewStats?.result?.map((item) => ({
              "Số dự án mới": item.count,
              label: `Tháng ${item.month}`,
            }))}
          />
        </div>
        <div className="w-[15%] ">
          <div className="text-lg font-bold">Top các công nghệ</div>
          <PieChart
            dataSource={projectTechStats?.result?.map((item) => ({
              value: item.count,
              label: item.name,
            }))}
          />
        </div>
        <div className="w-[15%] ">
          <div className="text-lg font-bold">Top các lĩnh vực</div>
          <PieChart
            dataSource={projectFieldStats?.result?.map((item) => ({
              value: item.count,
              label: item.name,
            }))}
          />
        </div>
      </div>

      <div className="flex ">
        <div className="w-[50%]">
          <div className="flex justify-between">
            <div className="text-lg font-bold">Thống kê các bài đăng </div>

            <DatePicker
              picker="year"
              value={selectedYear ? dayjs(selectedYear) : null}
              onChange={(date) => setSelectedYear(date?.format("YYYY"))}
            />
          </div>
          <StackedBarChart
            dataSource={tweetStats?.result?.map((item) => ({
              label: "Tháng" + item.month,
              "Bài đăng": item.count,
            }))}
          />
        </div>
        <div className="w-[50%] flex justify-center">
          <div className="w-[50%] ">
            <div>
              <div className="flex justify-between">
                <div className="text-lg font-bold">Top các cộng đồng</div>
                <Select
                  value={typeTopGroup}
                  onChange={setTypeTopGroup}
                  options={[
                    { value: "members", label: "Thành viên" },
                    { value: "posts", label: "Bài đăng" },
                  ]}
                />
              </div>

              <PieChart
                dataSource={groupStats?.result?.map((item) => ({
                  value: item.count,
                  label: item.name,
                }))}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
