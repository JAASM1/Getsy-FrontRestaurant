import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from "recharts";

const reservationTypesData = [
  { name: "Fiesta de Cumpleaños", value: 5 },
  { name: "Cena Romántica", value: 2 },
  { name: "Reunión Familiar", value: 3 },
  { name: "Negocios", value: 4 },
];

const ReservationTypesPie = () => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <ResponsiveContainer width="75%" height={250}>
      <PieChart>
        <Pie
          data={reservationTypesData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {reservationTypesData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout="vertical" align="left" verticalAlign="middle"/>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ReservationTypesPie;
