import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import type { TokenList } from '@/contexts/AppContext';

import AddTokens from './addToken';
import TokenListSelect from './TokenSelect';

interface Props {
  tokenlists: TokenList[];
  setTokens: Function;
}

const CustomTokenList = ({ tokenlists, setTokens }: Props) => {
  const [selectedTab, setSelectedTab] = useState('List');
  return (
    <>
      <div className="flex w-full justify-between space-y-0 bg-fetcch-dark/30  p-1 text-center">
        <div
          onClick={() => {
            setSelectedTab('List');
          }}
          className={`${
            selectedTab === 'List' ? 'bg-fetcch-dark/50 ' : ' bg-transparent '
          } w-full  p-2`}
        >
          <p>List</p>
        </div>
        <div
          onClick={() => {
            setSelectedTab('Token');
          }}
          className={`${
            selectedTab === 'Token' ? 'bg-fetcch-dark/50 ' : ' bg-transparent '
          } w-full  p-2`}
        >
          <p>Token</p>
        </div>
      </div>
      <div>
        {selectedTab === 'List' ? (
          <>
            <div className="mb-3 flex  w-full items-center  bg-fetcch-dark/50  px-2 text-white">
              <AiOutlineSearch className="text-2xl" />
              <input
                type="text"
                placeholder="search tokens"
                className="w-full border-none bg-transparent p-3 focus:border-none focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              {tokenlists.map((tokenList: TokenList) => {
                return (
                  <TokenListSelect
                    url={tokenList.url}
                    setTokens={setTokens}
                    name={tokenList.name}
                    logo={tokenList.logourl}
                    key={tokenList.timestamp}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <AddTokens />
        )}
      </div>
    </>
  );
};

export default CustomTokenList;
