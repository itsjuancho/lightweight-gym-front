import Link from "next/link"
import Container from "../../components/ui/container"

const AdminPage = () => {
    return (
        <div className="min-h-[100dvh] bg-gradient-to-b from-[#030712] to-[#210303] text-gray-50  flex flex-col justify-start items-center">
            <Container className="pt-40 pb-16 px-20">
                <h1 className="text-2xl">Welcome, dear administrator.</h1>
                <h2>Get started by editing stock or checking the business&apos;s reports</h2>
                <div className="space-x-4 underline">
                    <Link href="/admin/stock">Stock</Link>
                    <Link href="/admin/reports">Reports</Link>
                </div>
            </Container>
        </div>
    )
}

export default AdminPage