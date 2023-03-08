import Head from 'next/head';
import WishCard from '@/components/wish/WishCard';
import { useRecoilState } from 'recoil';
import { accessToken, userNickname } from '@/atoms/login';
import { useRouter } from 'next/router';
import axios from '@/pages/api/axios';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Pagenation from '@/components/Pagenation';
import BackBtn from '@/components/button/BackPageBtn';

export default function Wish() {
  const [wishList, setWishList] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [TOKEN] = useRecoilState(accessToken);
  const [username] = useRecoilState(userNickname);
  const router = useRouter();
  useEffect(() => {
    if (TOKEN === '') {
      router.push('/');
    }
  }, [TOKEN, router]);
  useEffect(() => {
    axios.get(`/api/mypage/wishlist?&page=${page}`).then((response) => {
      setWishList(response.data.data);
      setTotalPages(response.data.pageInfo.totalPages);
    });
  }, [page]);

  return (
    <>
      <Head>
        <title>GetABeer</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>

      <main className="m-auto h-screen max-w-4xl">
        <BackBtn />
        <div className=" max-w-4xl m-auto">
          <div className="text-xl mb-10 text-center font-semibold break-keep">
            <span className="text-y-brown">{username}님</span>의 위시 맥주
          </div>

          {wishList.length === 0 ? (
            <div className="noneContent py-8">
              <Image
                className="m-auto pb-3 opacity-50"
                src="/images/logo.png"
                alt="logo"
                width={40}
                height={40}
              />
              등록된 위시 맥주가 없습니다.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 mx-2">
              {wishList?.map((wishProps: any, idx: number) => (
                <WishCard key={idx} wishProps={wishProps} idx={idx + 1} />
              ))}
            </div>
          )}
          {totalPages === 0 ? (
            <></>
          ) : (
            <Pagenation page={page} setPage={setPage} totalPages={totalPages} />
          )}

          <div className="pb-14"></div>
        </div>
      </main>
    </>
  );
}
