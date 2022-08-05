import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';

import SwapButton from './landing/SwapButton';

const navlinks = [
  { name: 'Developers', href: '/' },
  { name: 'Docs', href: '/' },
  { name: 'Contact Us', href: '/' },
];

export default function Example() {
  return (
    <Disclosure as="nav" className="bg-transparent">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0">
                  <Image
                    src={'/assets/images/logo.svg'}
                    width={160}
                    height={60}
                    alt="logo"
                    className="select-none"
                  />
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex items-center space-x-4">
                    {navlinks.map((link) => (
                      <Link href={link.href} key={link.name}>
                        <a className="rounded-md px-3 py-2 font-medium text-fetcch-dark hover:bg-fetcch-dark/10 dark:text-white">
                          {link.name}
                        </a>
                      </Link>
                    ))}
                    <SwapButton classes="px-6 py-2 text-base hidden md:flex" />
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-fetcch-dark hover:text-white focus:outline-none">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navlinks.map((link) => (
                <Disclosure.Button
                  key={link.name}
                  as="a"
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-fetcch-dark dark:text-white"
                >
                  {link.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
