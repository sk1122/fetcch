import { RadioGroup, Transition } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { useState } from 'react';

const priorityList = [
  {
    id: 1,
    title: 'Gas Fees',
    description: 'Prioritize low gas fees',
  },
  {
    id: 2,
    title: 'Time',
    description: 'Prioritize time taken by transaction',
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const ToggleOn = () => {
  const [selectedpriorityList, setSelectedpriorityList] = useState(
    priorityList[0]
  );

  return (
    <Transition
      appear={true}
      show={true}
      enter="transition ease-out duration-800"
      enterFrom="opacity-0 -translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-500"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 -translate-y-1"
    >
      <div className="w-full rounded-md bg-fetcch-purple/5 p-2 dark:bg-fetcch-purple/20">
        <RadioGroup
          value={selectedpriorityList}
          onChange={setSelectedpriorityList}
        >
          <RadioGroup.Label className="text-base font-bold text-fetcch-dark dark:text-white">
            Give Priority to
          </RadioGroup.Label>

          <div className="mt-2 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
            {priorityList.map((priority) => (
              <RadioGroup.Option
                key={priority.id}
                value={priority}
                className={({ active }) =>
                  classNames(
                    active
                      ? 'border-fetcch-purple ring-2 ring-fetcch-purple dark:border-fetcch-mustard dark:ring-fetcch-mustard'
                      : '',
                    'relative bg-white dark:bg-fetcch-purple/20 border-transparent border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
                  )
                }
              >
                {({ checked }) => (
                  <>
                    <div className="flex flex-1">
                      <div className="flex flex-col">
                        <RadioGroup.Label
                          as="span"
                          className="block text-sm font-bold text-fetcch-dark dark:text-white"
                        >
                          {priority.title}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className="mt-1 flex items-center text-xs font-semibold text-gray-500 dark:text-slate-400 sm:text-sm"
                        >
                          {priority.description}
                        </RadioGroup.Description>
                      </div>
                    </div>
                    <CheckCircleIcon
                      className={classNames(
                        !checked ? 'invisible' : '',
                        'h-5 w-5 text-fetcch-purple dark:text-fetcch-mustard'
                      )}
                      aria-hidden="true"
                    />
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </Transition>
  );
};

export default ToggleOn;
