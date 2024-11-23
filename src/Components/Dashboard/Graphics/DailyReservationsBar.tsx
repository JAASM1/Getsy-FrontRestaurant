import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const weeklyReservationsData = [
    { day: "Lunes", aceptadas: 50 ,canceladas:10},
    { day: "Martes", aceptadas: 20 ,canceladas:5},
    { day: "Miércoles", aceptadas: 30 ,canceladas:10 },
    { day: "Jueves", aceptadas: 90 ,canceladas:35 },
    { day: "Viernes", aceptadas: 25 ,canceladas:50 },
    { day: "Sábado", aceptadas: 80 ,canceladas:10 },
    { day: "Domingo", aceptadas: 100 ,canceladas:20 },
  ];
  

const DailyReservationsBar = () => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={weeklyReservationsData}>
        <XAxis dataKey="day" />
        <YAxis/>
        <Tooltip/>
        <Bar dataKey="aceptadas" fill="#ffc120" />
        <Bar dataKey="canceladas" fill="#FF8042" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DailyReservationsBar;
