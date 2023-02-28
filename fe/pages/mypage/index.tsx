import Head from 'next/head';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { accessToken, userId, userNickname } from '@/atoms/login';
import { useEffect, useState } from 'react';
import axios from '@/pages/api/axios';
import Link from 'next/link';
import {
  IoHeartOutline,
  IoChevronForwardOutline,
  IoChatboxEllipsesOutline,
  IoLogOutOutline,
} from 'react-icons/io5';
import {
  HiPencil,
  HiOutlinePencil,
  HiOutlineChartPie,
  HiOutlineMapPin,
} from 'react-icons/hi2';
import swal from 'sweetalert2';

export default function Mypage() {
  const [, setAccessToken] = useRecoilState(accessToken);
  const [, setUserId] = useRecoilState(userId);
  const [userName, setUserName] = useRecoilState(userNickname);
  const [userImge, setUserImge] = useState('');
  const fetchUser = () => {
    axios
      .get('/api/user')
      .then((res) => {
        setUserName(res.data.nickname);
        setUserImge(res.data.imageUrl);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const handleClickLogout = () => {
    swal
      .fire({
        title: 'Get A Beer',
        text: '로그아웃 하시겠습니까?',
        showCancelButton: true,
        confirmButtonColor: '#F1B31C',
        cancelButtonColor: '#DDDDDD',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
      })
      .then((result) => {
        if (result.value) {
          axios
            .post('/api/user/logout')
            .then((res) => {
              console.log(res);
              setAccessToken('');
              setUserId('');
              delete axios.defaults.headers.Authorization;
              window.location.href = '/login';
            })
            .catch((err) => {
              console.log(err);
            });
          setAccessToken('');
          setUserId('');
          delete axios.defaults.headers.Authorization;
          window.location.href = '/login';
        }
      });
  };

  return (
    <>
      <Head>
        <title>GetABeer</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <main className="m-auto h-screen max-w-4xl ">
        <div className="my-4 text-center text-xl bg-white font-semibold">
          마이 페이지
        </div>
        <div className="flex flex-col items-center my-6">
          <Image
            unoptimized
            className="h-20 w-20 rounded-full"
            alt="프로필사진"
            src={userImge}
            width={80}
            height={80}
          />
          <div className="flex justify-center items-center gap-1 mt-2">
            <div className="text-sm">{userName}님</div>
            <Link href={'/myedit'} className="hover:text-y-brown">
              <button className="w-5 h-5 text-y-brown">
                <HiPencil className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
        <div className="m-auto max-w-md px-3 pb-5">
          <div className="border divide-y divide-gray-200 rounded-xl text-sm">
            <Link
              href={'/mypage/wish'}
              className="flex w-full p-5 rounded-t-xl justify-between hover:bg-gray-200 "
            >
              <div className="flex gap-2">
                <IoHeartOutline className="self-center w-5 h-5" />
                위시 페이지
              </div>
              <IoChevronForwardOutline className="w-5 h-5 " />
            </Link>
            <Link
              href={'/mypage/rating'}
              className="flex w-full p-5 justify-between hover:bg-gray-200 "
            >
              <div className="flex gap-2 ">
                <HiOutlinePencil className="self-center w-5 h-5" />
                나의 평가
              </div>
              <IoChevronForwardOutline className="w-5 h-5" />
            </Link>
            <Link
              href={'/mypage/pairing'}
              className="flex w-full p-5 justify-between hover:bg-gray-200 "
            >
              <div className="flex gap-2 ">
                <HiOutlineChartPie className="self-center w-5 h-5" />
                나의 페어링
              </div>
              <IoChevronForwardOutline className="w-5 h-5" />
            </Link>
            <Link
              href={'/mypage/comment'}
              className="flex w-full p-5 justify-between hover:bg-gray-200"
            >
              <div className="flex gap-2 ">
                <IoChatboxEllipsesOutline className="self-center w-5 h-5" />
                나의 댓글
              </div>
              <IoChevronForwardOutline className="w-5 h-5" />
            </Link>
            <button className="flex w-full p-5 justify-between hover:bg-gray-200">
              <div className="flex gap-2 ">
                <HiOutlineMapPin className="self-center w-5 h-5" />
                관심 가게
              </div>
              <IoChevronForwardOutline className="w-5 h-5" />
            </button>
            <button
              onClick={handleClickLogout}
              className="flex w-full p-5 rounded-b-xl justify-between hover:bg-gray-200"
            >
              <div className="flex gap-2 ">
                <IoLogOutOutline className="self-center w-5 h-5" />
                로그아웃
              </div>
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
