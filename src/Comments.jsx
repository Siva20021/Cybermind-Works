import React, { useEffect, useState } from 'react'

const Comments = ({ data }) => {

    const profile = localStorage.getItem('profile');
    const profileImage = localStorage.getItem('profileImage');
    const [commentData, setCommentData] = useState(data);
    const [newCommentMessage, setNewCommentMessage] = useState("");
    console.log("d", data, profile);
    // Function to delete a comment
    const deleteComment = (id) => {
        const newData = commentData.filter((comment) => comment.id !== id);
        setCommentData(newData);
    }

    const editComment = (id, newValue) => {
        const updatedData = commentData.map((comment) =>
            comment.id === id ? { ...comment, message: newValue } : comment
        );
        setCommentData(updatedData);
    };

    const addComment = (message) => {
        const newComment = {
            id: commentData.length + 1,
            name: profile,
            message: message,
            avatar: profileImage,
        };
        const newCommentData = [...commentData, newComment];
        setCommentData(newCommentData);

    };
    return (
        <div>
            <div
                className="flex-1 space-y-6 overflow-y-auto rounded-xl  p-4 text-sm leading-6  text-black sm:text-base sm:leading-7"
            >
                {commentData.map((comment) => (
                    comment.name === profile ? <FromMessage comment={comment} deleteComment={deleteComment} editComment={editComment} /> : <ToMessage comment={comment} />
                ))}


            </div>
                <div className='flex'>

                <label htmlFor="prompt" className="sr-only">Enter your prompt</label>
                <div>
                    <button
                        className=" sm:p-2"
                        type="button"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M12 5l0 14"></path>
                            <path d="M5 12l14 0"></path>
                        </svg>
                        <span className="sr-only">Attach file</span>
                    </button>
                </div>
                <textarea
                    id="prompt"
                    rows="1"
                    className="mx-2 flex min-h-full w-full rounded-md border border-slate-300 bg-slate-200 p-2 text-base text-slate-900 placeholder-slate-400 outline-none"
                    placeholder="Enter your prompt"
                    value={newCommentMessage}
                    onChange={(e) => setNewCommentMessage(e.target.value)}
                />
                <div>
                    <button
                        className="inline-flex text-slate-400 hover:text-blue-600 sm:p-2"
                        onClick={()=>{addComment(newCommentMessage);}}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M10 14l11 -11"></path>
                            <path
                                d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"
                            ></path>
                        </svg>
                        <span className="sr-only">Send message</span>
                    </button>
                </div>
                </div>
            
        </div>
    )
}

const ToMessage = ({ comment }) => {
    console.log("c", comment);
    return (
        <div className="flex items-start">
            <img
                className="mr-2 h-8 w-8 rounded-full"
                src={comment.avatar}
            />
            <div
                className="flex rounded-b-xl rounded-tr-xl bg-slate-200 p-4  sm:max-w-md md:max-w-2xl"
            >
                <p>Explain quantum computing in simple terms</p>
            </div>
        </div>
    )
}

const FromMessage = ({ comment, deleteComment, editComment }) => {
    return (
        <div className="flex flex-row-reverse items-start">
            <img
                className="ml-2 h-8 w-8 rounded-full"
                src={comment.avatar}
            />

            <div
                className="flex min-h-[85px] rounded-b-xl rounded-tl-xl bg-slate-200 p-4 sm:min-h-0 sm:max-w-md md:max-w-2xl"
            >
                <textarea type="text" value={comment.message} onChange={(e) => editComment(comment.id, e.target.value)} className='bg-transparent outline-none' />
            </div>
            <div
                className="mr-2 mt-1 flex flex-col-reverse gap-2 text-slate-500 sm:flex-row"
            >
                <button className="hover:text-blue-600" type="button" onClick={() => { deleteComment(comment.id) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>


            </div>
        </div>
    )
}
export default Comments