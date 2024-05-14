import React from 'react';
import { Popover } from '@headlessui/react';
import { RxAvatar } from 'react-icons/rx';
import { Link } from 'react-router-dom';

const UserMenu = () => {
  return (
    <div className="relative inline-block text-left">
      <Popover>
        {({ open }) => (
          <>
            <Popover.Button className="focus:outline-none">
              <RxAvatar className="w-8 h-8 cursor-pointer" />
            </Popover.Button>
            <Popover.Panel
              className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10 transform transition duration-200 ease-in-out ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            >
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                My Profile
              </Link>
              <Link
                to="/student/me"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                My Courses
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem('access_token');
                  window.location.href = '/';
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign Out
              </button>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </div>
  );
};

export default UserMenu;
