import { useEffect, useState } from "react";
import {
  BASE_URL,
  PROFILE_URL_REST,
  REPORT_PURCHAGES_REST,
  REPORT_PURCHASES_REST,
} from "../app/utils/routes";
import { useSession } from "./sessionContext";

const useHistory = () => {
  const { session } = useSession();
  const [purchases, setPurchases] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  const transformPurchaseData = (data) => {
    let transformedData = [];
    data.forEach((purchase) => {
      purchase.purchaseDetails.forEach((detail) => {
        transformedData.push({
          name: detail.productName,
          quantity: detail.quantity,
          purchaseDate: purchase.purchaseDate,
          price: detail.subtotal.toFixed(2),
          discount: purchase.discount || 0
        });
      });
    });
    return transformedData;
  };
  
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem("username");

        const headers = new Headers();
        headers.append("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, X-Auth-Token");
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append("Access-Control-Expose-Headers", "Content-Length, X-Kuma-Revision");
        headers.append("Access-Control-Allow-Credentials", "true");
        headers.append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
        headers.append("X-Requested-With", "XMLHttpRequest");
        headers.append("Authorization", `Bearer ${session}`);
        
        // Obtener datos de la cuenta
        const accountResponse = await fetch(`${BASE_URL}/${PROFILE_URL_REST}/${username}`, {
          headers: headers,
        });

        if (!accountResponse.ok) {
          throw new Error(`Failed to get profile info: ${await accountResponse.text()}`);
        }

        const accountData = await accountResponse.json();
        
        // Obtener historial de compras
        const historyResponse = await fetch(`${BASE_URL}/${REPORT_PURCHAGES_REST}/${accountData.accountId}`, {
          headers: headers,
        });

        if (!historyResponse.ok) {
          throw new Error("Failed to fetch purchase history");
        }

        const historyData = await historyResponse.json();

        // Transformar datos de compra y calcular totales
        const transformedPurchases = transformPurchaseData(historyData);
        const totalPrice = transformedPurchases.reduce((acc, purchase) => acc + parseFloat(purchase.price), 0);
/*         console.log(transformedPurchases)
        const totalDiscount = transformedPurchases.reduce((acc, purchase) => {
          // Verificar si el descuento es un número válido antes de sumarlo
          return acc + (typeof purchase.discount === 'number' ? purchase.discount : 0);
        }, 0);
         */

        let totalDiscount = 0;
        historyData.forEach((purchase) => {
          totalDiscount += purchase.discount;
        });
        
        // Actualizar el estado
        setPurchases(transformedPurchases);
        setTotalPrice(totalPrice.toFixed(2));
        setTotalDiscount(totalDiscount.toFixed(2));

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [session]); // Asegúrate de incluir session en la lista de dependencias

  return { purchases, totalPrice, totalDiscount };
};

export default useHistory;
