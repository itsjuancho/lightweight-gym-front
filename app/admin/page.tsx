import Link from "next/link";
import Container from "../../components/ui/container";
import { ShieldAlert } from "lucide-react";

const AdminPage = () => {
  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#030712] to-[#210303] text-gray-50  flex flex-col justify-start items-center">
      <Container className="pt-40 pb-16 md:px-20 px-5 flex flex-col items-center md:flex-row">
        <ShieldAlert className="md:size-32 size-16 md:mr-2 mb-8"/>
        <div>
          <h1 className="text-2xl font-bold text-center md:text-start">Welcome back, Mr. admin</h1>
          <h2 className="mb-8">
            Get started by checking the business&apos;s reports
          </h2>
          <div className="md:space-x-4 space-y-4 flex flex-col md:flex-row">
            <Link
              href="/admin/reports"
              className="w-full bg-red-500/50 rounded py-1.5 text-center"
            >
              Reports
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AdminPage;
