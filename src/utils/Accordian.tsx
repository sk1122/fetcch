import React, { useEffect, useRef, useState } from 'react';

function Accordion({
  children,
  title,
  active,
}: {
  children: React.ReactNode;
  title: string;
  active?: boolean;
}) {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const accordion = useRef(null);

  useEffect(() => {
    // @ts-ignore
    setAccordionOpen(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accordion]);

  return (
    <li>
      <button
        className="flex w-full items-center justify-between border-t border-gray-200 py-5 text-left text-lg font-medium"
        onClick={(e) => {
          e.preventDefault();
          setAccordionOpen(!accordionOpen);
        }}
        aria-expanded={accordionOpen}
      >
        <span className="text-xl font-bold">{title}</span>
        {accordionOpen ? (
          <svg
            className="h-6 w-6 shrink-0 rounded-full bg-fetcch-dark fill-current p-1 text-white dark:bg-fetcch-purple"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              y="7"
              width="16"
              height="2"
              rx="1"
              className={`origin-center transition duration-200 ease-out${
                !accordionOpen && 'rotate-180'
              }`}
            />
          </svg>
        ) : (
          <svg
            className="h-6 w-6 shrink-0 rounded-full bg-fetcch-dark fill-current p-1 text-white dark:bg-fetcch-purple"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              y="7"
              width="16"
              height="2"
              rx="1"
              className={`origin-center transition duration-200 ease-out${
                accordionOpen && 'rotate-180'
              }`}
            />
            <rect
              y="7"
              width="16"
              height="2"
              rx="1"
              className={`origin-center rotate-90 transition duration-200 ease-out${
                accordionOpen && 'rotate-180'
              }`}
            />
          </svg>
        )}
      </button>
      <div
        ref={accordion}
        className="overflow-hidden text-gray-600 transition-all duration-300 ease-in-out"
        style={
          accordionOpen
            ? // @ts-ignore
              { maxHeight: accordion.current.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <p className="pb-5">{children}</p>
      </div>
    </li>
  );
}

export default Accordion;
