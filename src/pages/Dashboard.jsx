import { useEffect, useState } from "react";
import { getDashboardData } from "../api/dashboardApi.js";

const Dashboard = () => {

  const [data,setData] = useState(null);

  useEffect(()=>{
    fetchDashboard();
  },[]);

  const fetchDashboard = async()=>{
    const res = await getDashboardData();
    setData(res.data);
  };

  return (
    <div>

      <h1 className="page-title">
        Dashboard
      </h1>

      <div className="cards">

        <div className="card income">
          <h2>Total Income</h2>
          <p>{data?.totalIncome}</p>
        </div>

        <div className="card expense">
          <h2>Total Expense</h2>
          <p>{data?.totalExpense}</p>
        </div>

        <div className="card balance">
          <h2>Net Balance</h2>
          <p>{data?.netBalance}</p>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;