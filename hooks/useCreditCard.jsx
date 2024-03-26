import React, { useState } from "react";

function useCreditCard () {
  const [formDataCard, setFormDataCard] = useState({
    cardType: "",
    number:""
  });

  const [cards, setCards] = useState([]);

  const handleChangeSelect = (value) => {
    setFormDataCard({
      ...formDataCard,
      cardType: value
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormDataCard({
      ...formDataCard,
      [id]: value,
    });
  };

  const addCard = (card) => {
    setCards([...cards, `${card.cardType}-${card.number}`]);
    formDataCard.cardType="";
    formDataCard.number="";
  };

  return { addCard, cards,formDataCard,handleChange,handleChangeSelect};
};


export default useCreditCard;