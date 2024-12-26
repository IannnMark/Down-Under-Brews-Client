import Sidebar from "./Sidebar";

export default function Dashboard() {
  return (
    <div className="p-3 flex flex-col md:flex-row">
      <div>
        <Sidebar />
      </div>
    </div>
  );
}
