import { Dialog, Transition } from "@headlessui/react";
import { CircleAlert } from "lucide-react";
import { CircleHelpIcon } from "lucide-react";
import { Fragment, useState } from "react";

import React from "react";

export const Modal = () => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className=" inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md px-4 py-2 text-sm font-medium text-white  focus:outline-none focus-visible:ring-2  "
        >
          <CircleAlert className="text-white/80 hover:text-white/90 duration-300 transition-all" />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex  items-center mt-12 justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Any Suggestion?
                  </Dialog.Title>
                  <div className="mt-2 leading-loose">
                    <p className="text-sm text-gray-500 leading-relaxed">
                      You can help us improve this app! Share your suggestions
                      and ideas to{" "}
                      <a
                        className="p-1 px-2 hover:bg-indigo-500 bg-indigo-700 text-zinc-50 duration-300 transition-colors rounded-md"
                        href="https://twitter.com/dhiodhaha"
                        aria-label="Twitter - dhiodhaha"
                      >
                        Xwitter
                      </a>{" "}
                      or simply contribute on{" "}
                      <a
                        className="p-1 px-2 hover:bg-indigo-500 bg-indigo-700 text-zinc-50 duration-300 transition-colors rounded-md"
                        href="https://github.com/dhiodhaha/heart-zone-calculator"
                        aria-label="GitHub - dhiodhaha"
                      >
                        GitHub
                      </a>
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 transition-colors"
                      onClick={closeModal}
                    >
                      Got it!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
