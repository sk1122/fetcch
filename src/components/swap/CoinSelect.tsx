import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import React from 'react';
import { TokenInterface } from './SwapCard';


// eslint-disable-next-line unused-imports/no-unused-vars
// function classNames(...classes: any) {
//   return classes.filter(Boolean).join(' ');
// }

interface IProps {
  value: TokenInterface;
  setValue: Function;
  setTokenValue: Function;
  tokenValue: string;
  setShowTokenList: Function
  showTokenList: any
}

export default function CoinSelect({value, setValue, setTokenValue, tokenValue, setShowTokenList, showTokenList}: IProps) {
  return (
    <Menu
      onClick={() => {
        setShowTokenList(!showTokenList);
        setTokenValue(tokenValue);
      }}
      as="div"
      className="relative inline-block h-full w-full rounded-r-md border-none bg-transparent py-0 text-left text-gray-500"
    >
      <div>
        <Menu.Button className="inline-flex h-10 w-full items-center justify-between rounded-r-md bg-gray-100 px-4 py-2 text-sm font-medium text-fetcch-dark shadow-sm hover:bg-gray-50 focus:outline-none dark:bg-fetcch-dark/40 dark:text-white">
          {value ? (
            <div className="flex flex-row items-center">
              <img
                src={value.logoURI}
                alt="chain"
                className="mr-3 h-8 w-8 shrink-0 rounded-md fill-current text-gray-400 group-hover:text-gray-500"
              />
              <span className="mr-2 text-left dark:text-white">
                {value.name}
              </span>
            </div>
          ) : (
            <svg
              className="mr-2 h-4 w-4 shrink-0 fill-current text-gray-400 group-hover:text-gray-500"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
              <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
            </svg>
          )}
          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>
    </Menu>
  );
}
