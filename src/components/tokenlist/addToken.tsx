import { AiOutlineSearch } from 'react-icons/ai';

const AddTokens = () => {
  return (
    <>
      <div className="space-y-2">
        <div className="flex w-full  items-center bg-fetcch-dark/50  px-2 text-white">
          <AiOutlineSearch className="text-2xl" />
          <input
            type="text"
            placeholder="search tokens"
            className="w-full border-none bg-transparent p-3 focus:border-none focus:outline-none"
          />
        </div>
        <div className="border-3 w-full border border-gray-400 p-4 text-center text-white">
          <p>No Tokens Added</p>
        </div>
      </div>
    </>
  );
};

export default AddTokens;
