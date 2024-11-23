import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const OrdersRevenueBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="current" fill="#8884d8" name="Current Month" />
        <Bar dataKey="last" fill="#82ca9d" name="Last Month" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default OrdersRevenueBarChart;

// Sử dụng:
// <OrdersRevenueBarChart data={barChartData} />
