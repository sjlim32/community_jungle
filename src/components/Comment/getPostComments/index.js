import React, { useState, useEffect, useMemo, useCallback, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as API from "../../../utils/api";

export default function GetPostComments({ getCommentList, commentList }) {
  const [user, setUser] = useState("");

  //* comments 수정/삭제 버튼 render 함수
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (localStorage.getItem("token")) {
          const res = await API.get("/community/user/username");
          if (!res) throw new Error(`유저 찾기 실패`);

          setUser(res.data);
        }
      } catch (err) {
        if (err.response.status === 404) return alert(`${err.response.data} 😱`);
        alert(`${err.response.data.reason} 😱`);
      }
    };

    fetchUser();
  }, [getCommentList]);

  //* comment 삭제 API 및 버튼
  const deleteComment = useCallback(
    async (commentId, postId) => {
      try {
        const res = await API.post(`/community/comment/del/${commentId}`, {
          post_id: postId,
        });
        if (!res) throw new Error(`댓글 삭제 실패`);

        toast.success("댓글이 삭제되었습니다!");
        getCommentList();
      } catch (err) {
        if (err.response.status === 404) return alert(`${err.response.data} 😱`);
        alert(`${err.response.data.reason} 😱`);
      }
    },
    [getCommentList]
  );

  //* css 속성 삽입
  const classNames = useCallback((...classes) => {
    return classes.filter(Boolean).join(" ");
  }, []);

  //* comments rendering 함수
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
            <span className="w-4/5 border-r border-gray-300 mr-4 flex justify-between items-center">
              {comment.content}
              {user._id === comment.writer_id ? (
                <>
                  <Menu as="div" className="relative inline-block mr-4 text-2xl">
                    <Menu.Button type="button" id="menu-button" aria-expanded="true" aria-haspopup="true">
                      {`···`}
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
                        className="absolute right-0 z-10 w-14 origin-top-right ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                      >
                        <Menu.Items className="text-center bg-white rounded-lg flex">
                          {/* <Menu.Item>
                            {({ active }) => (
                              <button
                                // onClick={editPost}
                                className={classNames(
                                  active ? "text-gray-900 bg-yellow-200 " : "text-gray-700",
                                  "block w-full px-1 py-2 text-lg rounded-l-lg"
                                )}
                              >
                                수정
                              </button>
                            )}
                          </Menu.Item> */}
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => deleteComment(comment._id, comment.post_id)}
                                className={classNames(
                                  active ? "text-gray-900 bg-yellow-200" : "text-gray-700",
                                  "px-1 block w-full py-1 text-lg rounded-lg"
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
              ) : (
                <></>
              )}
            </span>
            <span className="w-1/5 text-lg text-gray-300">
              <span>{`${comment.createdAt.substring(2, 10).replace(/-/g, " ")}, `}</span>
              <span>{`${comment.createdAt.substring(11, 19)} `}</span>
            </span>
          </section>
        ))}
      </>
    );
  }, [commentList, user, classNames, deleteComment]);

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
