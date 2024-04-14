import React, { useMemo, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function GetPostComments({ commentList }) {
  const getComments = useMemo(() => {
    if (commentList.length === 0) {
      return <h2 className="text-white mx-auto font-Im"> 댓글이 없습니다. </h2>;
    }

    return (
      <>
        {commentList.map((comment) => (
          <section
            key={comment._id}
            className="w-11/12 h-12 px-10 text-white font-Im text-xl mx-auto flex flex-row items-center
            border-b border-gray-500"
          >
            <button className="w-1/4 text-center border-r border-white mr-4">{comment.writer}</button>
            <span className="w-4/5 border-r border-gray-300 mr-4">
              <>
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button type="button" id="menu-button" aria-expanded="true" aria-haspopup="true">
                    {comment.content}
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <div
                      className="absolute right-0 z-10 w-16 origin-top-right ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                    >
                      <Menu.Items className="text-center bg-white flex">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              // onClick={editPost}
                              className={classNames(
                                active ? "bg-gray-100 text-gray-900 " : "text-gray-700",
                                "block w-full py-2 text-sm"
                              )}
                            >
                              수정
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              // onClick={removePost}
                              className={classNames(
                                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                "block w-full py-2 text-sm"
                              )}
                            >
                              삭제
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </div>
                  </Transition>
                </Menu>
              </>
            </span>
            <span className="w-1/5">
              <span>{`${comment.createdAt.substring(2, 10).replace(/-/g, " ")}, `}</span>
              <span>{`${comment.createdAt.substring(11, 19)} `}</span>
            </span>
          </section>
        ))}
      </>
    );
  }, [commentList]);

  return (
    <>
      <p
        className="w-11/12 h-12 px-10 mx-auto flex font-DOTBOGI text-2xl text-yellow-500
          justify-evenly items-center"
      >
        <span className={"w-1/4 text-center border-r border-gray-300 mr-4"}>작성자</span>
        <span className={"w-4/5 border-r border-gray-300 mr-4"}>내용</span>
        <span className="w-1/5">작성일시</span>
        <span></span>
      </p>
      <div className="w-11/12 felx mx-auto mb-4 text-white border-b border-white"></div>
      {getComments}
    </>
  );
}
