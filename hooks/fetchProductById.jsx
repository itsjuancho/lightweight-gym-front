const fetchProductById = async (token, id) => {
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;
    try {
        const response = await fetch(`${backUrl}/product/get/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export default fetchProductById