"use client";
import React, {useState} from "react";

const Accordion = ({title, content}) => {
    const [openQuestion, setIsOpenAccordion] = useState(false);

    const getClassname = () => {
        return openQuestion ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
    }

    return (
        <div className={`w-30 p-4 rounded-lg text-balance group ${openQuestion && "transition duration-600 border-2 border-red-400"}`}>
            <button className="flex justify-between w-full" onClick={() => setIsOpenAccordion(!openQuestion)}>
                <a className="md:text-lg sm:text-sm group">
                    {title}
                </a>
                <svg
                    className="fill-red-500 shrink-0 ml-8"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        y="7"
                        width="16"
                        height="2"
                        rx="1"
                        className={`transform origin-center transition duration-200 ease-out ${openQuestion && "!rotate-180"}`}
                    />
                    <rect
                        y="7"
                        width="16"
                        height="2"
                        rx="1"
                        className={`transform origin-center rotate-90 transition duration-200 ease-out ${openQuestion && "!rotate-180"}`}
                    />
                </svg>
            </button>
            <div className={`grid overflow-hidden transition-all duration-300 ease-in-out text-base ${getClassname()}`}>
                <div className="overflow-hidden p-1">{content}</div>
            </div>
            <div className="bg-red-500 h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
        </div>
    )
}

export default Accordion;