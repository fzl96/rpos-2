// import line chart from react-chartjs
// import categoryscale from react-chartjs-2
import { Chart, registerables } from 'chart.js';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { useOrder } from '../../context/OrderContext';

Chart.register(...registerables);

function LineChart() {
  const { orders } = useOrder();

  const now = new Date().getMonth();
  console.log(now);

  console.log(typeof orders);
  const ordersArr = useMemo(() => {
    const arr = orders.map((order) => {
      const date = new Date(order.date);
      const month = date.getMonth() + 1;
      return {
        month,
        total: order.total,
      };
    });
    return arr;
  }, [orders]);

  const salesByMonth = useMemo(() => {
    const sale = ordersArr.reduce((acc: any, cur: any) => {
      const month = cur.month;
      const total = cur.total;
      const exists = acc.find((item: any) => item.month === month);
      if (exists) {
        exists.total += total;
      } else {
        acc.push({
          month,
          total,
        });
      }
      return acc;
    }, []);
    return sale;
  }, [ordersArr]);

  // sort the salesByMonth array by month
  salesByMonth.sort((a: any, b: any) => a.month - b.month);

  console.log(salesByMonth);
  // check if salesByMonth length is less than 6 months, if yes then fill the missing montsh with the first index of salesByMonth array minus 1 until the length is 6 months long
  if (salesByMonth.length < 6) {
    while (salesByMonth.length < 6) {
      salesByMonth.unshift({
        month: salesByMonth[0].month - 1,
        total: 0,
      });
    }
  }

  const numberToMonthName = (month: number) => {
    const date = new Date(2022, month, 1);
    return format(date, 'MMM');
  };

  return (
    <Line
      data={{
        labels: salesByMonth.map((item: any) => numberToMonthName(item.month)),
        datasets: [
          {
            label: 'Sales',
            data: salesByMonth.map(
              (item: { month: number; total: number }) => item.total
            ),
            fill: false,
          },
        ],
      }}
      // height={}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      }}
    />
  );
}
export default LineChart;
