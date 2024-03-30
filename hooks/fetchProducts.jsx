export const fetchAllProducts = async (token) => {
  const backUrl = process.env.NEXT_PUBLIC_BACK_URL;
  try {
    console.log(token, "token in fetchAllProducts");
    const response = await fetch(`${backUrl}/product/get-all`, {
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
};
