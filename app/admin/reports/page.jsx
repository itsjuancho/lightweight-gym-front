"use client"
import React, { useEffect, useState } from 'react';
import Container from "../../../components/ui/container";
import { useSession } from "../../../hooks/sessionContext";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ReportsPage = () => {
    const { session } = useSession();
    const apiRoute = '/api/purchases/units-sold-by-product';
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;
    const categoryNames = {
        1: "Supplements",
        2: "Gym equipment",
        3: "Gym attire",
        4: "Accesories",
        5: "Books & Guides",
    };
    const [products, setProducts] = useState([]);
    const [showAll, setShowAll] = useState(false);

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${backUrl}${apiRoute}`, {
                headers: {
                    Authorization: `Bearer ${session}`,
                },
            });
            const data = await response.json();
            const processedData = data.map(product => ({
                ...product,
                categoryName: categoryNames[product.categoryId] || "Unknown",
                totalProfit: product.unitsSold * product.price,
            }));
            setProducts(processedData);
        };

        fetchData();
    }, [session]);

    // Calculate total profit of all products
    const totalProfit = products.reduce((acc, product) => acc + product.totalProfit, 0);

    // Data for the chart
    const chartData = {
        labels: products.map(product => product.name),
        datasets: [
            {
                label: 'Units Sold',
                data: products.map(product => product.unitsSold),
                backgroundColor: 'rgba(255, 20, 0, 0.5)',
            },
        ],
    };

    const downloadCSV = () => {
        const header = ["Product Name", "Units Sold", "Price", "Category", "Total Profit"];
        const rows = products.map(product => [
            product.name,
            product.unitsSold,
            product.price.toString().replace('.', ','),
            product.categoryName,
            product.totalProfit.toFixed(2).replace('.', ','),
        ]);

        const csvContent = [
            header.join(";"),
            ...rows.map(e => e.join(";"))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'products_report.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const visibleProducts = showAll ? products : products.slice(0, 5);

    return (
        <div className="min-h-[100vh] bg-gradient-to-b from-[#030712] to-[#210303] text-gray-50 flex flex-col justify-center">
            <Container className="w-full md:pt-40 pb-16 md:px-20 px-5">
                <h1 className='text-2xl md:mb-16 mb-8 font-bold'>Reports</h1>
                <div className='flex md:flex-row flex-col md:justify-between justify-start md:items-center'>
                    <p className='text-red-500 text-xs md:text-base mb-1 md:mb-0'>Total Profits: ${totalProfit.toFixed(2)}</p>
                    <button onClick={downloadCSV} className="mb-4 bg-red-500 hover:bg-red-700 transition-colors text-white font-bold py-2 px-4 rounded">
                        Export Report to CSV
                    </button>
                </div>
                <table className="w-full mt-4">
                    <thead className=''>
                        <tr className='border-b'>
                            <th className='text-start'>Product Name</th>
                            <th className='text-start'>Units Sold</th>
                            <th className='text-start'>Price</th>
                            <th className='text-start'>Category</th>
                            <th className='text-start'>Product sales</th>
                        </tr>
                    </thead>
                    <tbody className='text-sm space-y-2'>
                        {visibleProducts.map((product, index) => (
                            <tr key={index}>
                                <td>{product.name}</td>
                                <td>{product.unitsSold}</td>
                                <td>${product.price}</td>
                                <td>{product.categoryName}</td>
                                <td>${product.totalProfit.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={toggleShowAll} className="mt-2 text-red-500 font-bold py-2">
                    {showAll ? 'Show Less' : 'Show All Rows'}
                </button>
                <div className="mt-8 w-full">
                    <Bar data={chartData} options={{ plugins: { legend: { display: true } } }} />
                </div>
            </Container>
        </div>
    );
};

export default ReportsPage;
