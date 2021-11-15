import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Popover } from "@headlessui/react";
import {
  MenuAlt3Icon,
} from "@heroicons/react/outline";
import Nav from "../navs/Nav";
import NavMobile from "../navs/NavMobile";


const Header = () => {
  const { data: session } = useSession();
  return (
    <Popover className="absolute w-full bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <a>
                <span className="sr-only">Workflow</span>
                <img
                  className="h-8 w-auto sm:h-10"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt=""
                />
              </a>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="rounded-md p-2 inline-flex items-center justify-center  text-white hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuAlt3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            <Nav />
          </Popover.Group>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            { !session ? 
            <>
            <button  
              onClick={() => signIn()}
              className="cursor-pointer whitespace-nowrap text-lg font-medium  text-white hover:text-gray-200"
            >
              Sign in
            </button>
            <button 
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Sign up
            </button>
            </>
            :
            <button
              onClick={() => signOut()}
              className="cursor-pointer ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Sign out
            </button>
            }
          </div>
        </div>
      </div>
      <NavMobile />     
    </Popover>
  );
};

export default Header;
