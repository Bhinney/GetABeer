import React, { useState } from 'react';
import { BiUser } from 'react-icons/bi';

export default function SpeechBalloon({ props }: any) {
  return (
    <div className="mx-5 mb-4">
      <div className="w-full h-fit relative ml-4 p-4 rounded-r-lg rounded-b-lg bg-y-cream after:border-t-[30px] after:border-l-[33px] after:border-t-y-cream after:border-l-transparent after:absolute after:top-0 after:-left-8">
        <div className="flex">
          <BiUser className=" bg-y-brown text-white rounded-full w-10 h-10 ml-1" />
          <div className="flex flex-col ml-2">
            <span>{props.nickname}</span>
            <span className="text-xs text-y-gray">{props.createdAt}</span>
          </div>
        </div>
        <div className="m-3 mt-5 text-sm font-light leading-6">
          {props.content}
        </div>
      </div>
    </div>
  );
}
