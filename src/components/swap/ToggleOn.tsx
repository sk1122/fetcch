import { RadioGroup } from '@headlessui/react';
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
    <div className="w-full rounded-md bg-fetcch-purple/5 p-2">
      <RadioGroup
        value={selectedpriorityList}
        onChange={setSelectedpriorityList}
      >
        <RadioGroup.Label className="text-base font-bold">
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
                    ? 'border-fetcch-purple ring-2 ring-fetcch-purple'
                    : '',
                  'relative bg-white border-transparent border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
                )
              }
            >
              {({ checked, active }) => (
                <>
                  <div className="flex flex-1">
                    <div className="flex flex-col">
                      <RadioGroup.Label
                        as="span"
                        className="block text-sm font-bold"
                      >
                        {priority.title}
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as="span"
                        className="mt-1 flex items-center text-sm font-semibold text-gray-500"
                      >
                        {priority.description}
                      </RadioGroup.Description>
                    </div>
                  </div>
                  <CheckCircleIcon
                    className={classNames(
                      !checked ? 'invisible' : '',
                      'h-5 w-5 text-fetcch-purple'
                    )}
                    aria-hidden="true"
                  />
                  <div
                    className={classNames(
                      active ? 'border' : 'border-2',
                      checked ? 'border-fetcch-purple' : 'border-transparent',
                      'absolute -inset-px rounded-lg pointer-events-none'
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
  );
};

export default ToggleOn;
