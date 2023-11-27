import { AdminNav } from "../components/admin/AdminNav";

export const metadata = {
  title: "Kuska-Shop Admin",
  description: "Kuska-Shop Admin Dashboard",
};

const layoutAdmin = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
};

export default layoutAdmin;
