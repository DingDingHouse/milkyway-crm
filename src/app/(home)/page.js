import { getCookie } from "@/utils/cookie";
import Dashboard from "../../components/Dashboard";
import { config } from "@/utils/config";
import PaymentChart from "../../components/ui/chart/PaymentChart";
import ClientPieChart from "../../components/ui/chart/ClientPieChart";

const getUserData = async () => {
  const token = await getCookie();
    const response = await fetch(`${config.server}/api/users`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      },
    });
    const data = await response.json();
    return { data };
};

export default async function Home() {
  const data = await getUserData();
  return (
    <main className="space-y-3">
      <Dashboard data={data?.data} />
      <div className="rounded-2xl flex space-x-10  h-[60vh]  w-[95%] mx-auto">
        <PaymentChart />
        <ClientPieChart />
      </div>
    </main>
  );
}
