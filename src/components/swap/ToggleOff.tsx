import { RadioGroup, Transition } from '@headlessui/react';
import { useState } from 'react';

const bridges = [
  {
    name: 'Hop Bridge',
  },
  {
    name: 'Across Bridge',
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const ToggleOff = () => {
  const [selected, setSelected] = useState(bridges[0]);
  // useEffect(() => console.log(selected), [selected]);
  return (
    <Transition
      appear={true}
      show={true}
      enter="transition ease-out duration-500"
      enterFrom="opacity-0 -translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-500"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 -translate-y-1"
    >
      <div className="no-scrollbar max-h-[480px] min-h-fit w-full overflow-y-scroll overscroll-auto rounded-md bg-fetcch-purple/5 p-2 dark:bg-fetcch-purple/20">
        <div className="mb-2 rounded-md border-[1px] border-gray-200 bg-white p-2 dark:border-fetcch-purple/60 dark:bg-fetcch-dark/20">
          <RadioGroup value={selected} onChange={setSelected}>
            <div className="-space-y-px rounded-md bg-white dark:bg-fetcch-dark/40">
              {bridges.map((bridge) => (
                <RadioGroup.Option
                  key={bridge.name}
                  value={bridge}
                  className={({ checked }) =>
                    classNames(
                      checked
                        ? 'bg-fetcch-purple/5 border-fetcch-mustard z-10'
                        : 'border-gray-200 dark:border-none',
                      'relative border-2 p-2 mb-3 dark:bg-fetcch-purple/20 rounded-md flex flex-col cursor-pointer focus:outline-none'
                    )
                  }
                >
                  <>
                    {({ active }: { active: any }) => (
                      <div
                        className={classNames(
                          !active ? 'invisible' : 'absolute top-0',
                          'rounded-b-md bg-fetcch-purple text-xs dark:text-white text-fetcch-dark'
                        )}
                      >
                        Selected
                      </div>
                    )}

                    <div className="mb-4 grid grid-cols-9 rounded-md bg-gray-200/60 p-4 dark:bg-fetcch-purple/10 sm:px-8">
                      <div className="col-span-2 w-full ">
                        <div className="flex flex-col items-center space-x-2 sm:flex-row">
                          <img
                            src="https://movricons.s3.ap-south-1.amazonaws.com/Ether.svg"
                            alt="usdc"
                            className="h-8 w-8 rounded-full"
                          />
                          <div className="flex items-center space-x-1">
                            <span className="text-base font-semibold  md:text-lg">
                              100
                            </span>
                            <span className="block font-semibold text-fetcch-purple/50 dark:text-fetcch-mustard ">
                              USDC
                            </span>
                          </div>
                        </div>
                        <span className="block text-center text-xs text-fetcch-dark dark:text-white md:text-sm">
                          On Polygon
                        </span>
                      </div>
                      <div className="col-span-5 flex w-full items-start justify-center pt-4">
                        <svg
                          width=""
                          height="10"
                          viewBox="0 0 301 10"
                          className="w-2/3 text-fetcch-dark dark:text-fetcch-mustard md:w-full"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M300.386 5.38619C300.599 5.1729 300.599 4.8271 300.386 4.61381L296.911 1.13815C296.697 0.924862 296.351 0.924862 296.138 1.13815C295.925 1.35143 295.925 1.69723 296.138 1.91052L299.228 5L296.138 8.08948C295.925 8.30277 295.925 8.64857 296.138 8.86185C296.351 9.07514 296.697 9.07514 296.911 8.86185L300.386 5.38619ZM0 5.54615H1.08696V4.45385H0V5.54615ZM3.26087 5.54615H5.43478V4.45385H3.26087V5.54615ZM7.6087 5.54615H9.78261V4.45385H7.6087V5.54615ZM11.9565 5.54615H14.1304V4.45385H11.9565V5.54615ZM16.3043 5.54615H18.4783V4.45385H16.3043V5.54615ZM20.6522 5.54615H22.8261V4.45385H20.6522V5.54615ZM25 5.54615H27.1739V4.45385H25V5.54615ZM29.3478 5.54615H31.5217V4.45385H29.3478V5.54615ZM33.6956 5.54615H35.8696V4.45385H33.6956V5.54615ZM38.0435 5.54615H40.2174V4.45385H38.0435V5.54615ZM42.3913 5.54615H44.5652V4.45385H42.3913V5.54615ZM46.7391 5.54615H48.913V4.45385H46.7391V5.54615ZM51.0869 5.54615H53.2609V4.45385H51.0869V5.54615ZM55.4348 5.54615H57.6087V4.45385H55.4348V5.54615ZM59.7826 5.54615H61.9565V4.45385H59.7826V5.54615ZM64.1304 5.54615H66.3043V4.45385H64.1304V5.54615ZM68.4782 5.54615H70.6522V4.45385H68.4782V5.54615ZM72.8261 5.54615H75V4.45385H72.8261V5.54615ZM77.1739 5.54615H79.3478V4.45385H77.1739V5.54615ZM81.5217 5.54615H83.6956V4.45385H81.5217V5.54615ZM85.8695 5.54615H88.0434V4.45385H85.8695V5.54615ZM90.2174 5.54615H92.3913V4.45385H90.2174V5.54615ZM94.5652 5.54615H96.7391V4.45385H94.5652V5.54615ZM98.913 5.54615H101.087V4.45385H98.913V5.54615ZM103.261 5.54615H105.435V4.45385H103.261V5.54615ZM107.609 5.54615H109.783V4.45385H107.609V5.54615ZM111.956 5.54615H114.13V4.45385H111.956V5.54615ZM116.304 5.54615H118.478V4.45385H116.304V5.54615ZM120.652 5.54615H122.826V4.45385H120.652V5.54615ZM125 5.54615H127.174V4.45385H125V5.54615ZM129.348 5.54615H131.522V4.45385H129.348V5.54615ZM133.696 5.54615H135.87V4.45385H133.696V5.54615ZM138.043 5.54615H140.217V4.45385H138.043V5.54615ZM142.391 5.54615H144.565V4.45385H142.391V5.54615ZM146.739 5.54615H148.913V4.45385H146.739V5.54615ZM151.087 5.54615H153.261V4.45385H151.087V5.54615ZM155.435 5.54615H157.609V4.45385H155.435V5.54615ZM159.783 5.54615H161.957V4.45385H159.783V5.54615ZM164.13 5.54615H166.304V4.45385H164.13V5.54615ZM168.478 5.54615H170.652V4.45385H168.478V5.54615ZM172.826 5.54615H175V4.45385H172.826V5.54615ZM177.174 5.54615H179.348V4.45385H177.174V5.54615ZM181.522 5.54615H183.696V4.45385H181.522V5.54615ZM185.87 5.54615H188.044V4.45385H185.87V5.54615ZM190.218 5.54615H192.391V4.45385H190.218V5.54615ZM194.565 5.54615H196.739V4.45385H194.565V5.54615ZM198.913 5.54615H201.087V4.45385H198.913V5.54615ZM203.261 5.54615H205.435V4.45385H203.261V5.54615ZM207.609 5.54615H209.783V4.45385H207.609V5.54615ZM211.957 5.54615H214.131V4.45385H211.957V5.54615ZM216.305 5.54615H218.478V4.45385H216.305V5.54615ZM220.652 5.54615H222.826V4.45385H220.652V5.54615ZM225 5.54615H227.174V4.45385H225V5.54615ZM229.348 5.54615H231.522V4.45385H229.348V5.54615ZM233.696 5.54615H235.87V4.45385H233.696V5.54615ZM238.044 5.54615H240.218V4.45385H238.044V5.54615ZM242.392 5.54615H244.566V4.45385H242.392V5.54615ZM246.739 5.54615H248.913V4.45385H246.739V5.54615ZM251.087 5.54615H253.261V4.45385H251.087V5.54615ZM255.435 5.54615H257.609V4.45385H255.435V5.54615ZM259.783 5.54615H261.957V4.45385H259.783V5.54615ZM264.131 5.54615H266.305V4.45385H264.131V5.54615ZM268.479 5.54615H270.653V4.45385H268.479V5.54615ZM272.826 5.54615H275V4.45385H272.826V5.54615ZM277.174 5.54615H279.348V4.45385H277.174V5.54615ZM281.522 5.54615H283.696V4.45385H281.522V5.54615ZM285.87 5.54615H288.044V4.45385H285.87V5.54615ZM290.218 5.54615H292.392V4.45385H290.218V5.54615ZM294.566 5.54615H296.74V4.45385H294.566V5.54615ZM298.914 5.54615H300V4.45385H298.914V5.54615Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div className="col-span-2 w-full ">
                        <div className="flex flex-col items-center space-x-2 sm:flex-row">
                          <img
                            src="https://movricons.s3.ap-south-1.amazonaws.com/Ether.svg"
                            alt="usdc"
                            className="h-8 w-8 rounded-full"
                          />
                          <div className="flex items-center space-x-1">
                            <span className="text-base font-semibold  md:text-lg">
                              100
                            </span>
                            <span className="block font-semibold text-fetcch-purple/50 dark:text-fetcch-mustard">
                              USDC
                            </span>
                          </div>
                        </div>
                        <span className="block text-center text-xs text-fetcch-dark dark:text-white md:text-sm">
                          On Polygon
                        </span>
                      </div>
                    </div>
                    <div className="flex w-full justify-between space-x-1">
                      <div className="rounded-md bg-gray-200/60 p-2 text-xs font-medium dark:bg-fetcch-purple/20 sm:px-8 md:text-sm">
                        1 User Action
                      </div>
                      <div className="rounded-md bg-gray-200/60 p-2 text-xs font-medium dark:bg-fetcch-purple/20 sm:px-8 md:text-sm">
                        $ 0.01 Gas Fee
                      </div>
                      <div className="rounded-md bg-gray-200/60 p-2 text-xs font-medium dark:bg-fetcch-purple/20 sm:px-8 md:text-sm">
                        Approx time: 32 ms
                      </div>
                    </div>
                  </>
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>
    </Transition>
  );
};

export default ToggleOff;
