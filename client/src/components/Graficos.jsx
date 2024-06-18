import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

export default function GraficoBebidas() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/bebidas");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            width={1000}
            height={300}
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="nombre" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar type="monotone" dataKey="cantidad" fill="#efb810" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}