import PageContainer from '@/components/PageContainer';
import Image from 'next/image';
import PairingCardController from '@/components/pairing/PairingCardController';
import axios from '@/pages/api/axios';
import { useEffect, useState } from 'react';
import { IoChevronBack } from 'react-icons/io5';
import Pagenation from '@/components/Pagenation';
import { useRouter } from 'next/router';
import { accessToken } from '@/atoms/login';
import { useRecoilState } from 'recoil';
import BackBtn from '@/components/button/BackPageBtn';

export default function Pairing() {
  const [pariginCardPops, setPairingCardProps] = useState<any>();
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [TOKEN] = useRecoilState(accessToken);
  const [username, setUserName] = useState('');

  useEffect(() => {
    if (TOKEN !== '') {
      const config = {
        headers: { Authorization: TOKEN, 'Content-Type': 'application/json' },
        withCredentials: true,
      };
      axios
        .get(`/api/mypage/pairing`, config)
        .then((response) => {
          setPairingCardProps(response.data.data);
          setTotalPages(response.data.pageInfo.totalPages);
          setUserName(response.data.nickname);
        })
        .catch((error) => console.log(error));
    }
  }, [TOKEN]);

  return (
    <PageContainer>
      <main className="m-auto h-screen max-w-4xl relative">
        <BackBtn />
        <div className="mb-4 text-center text-xl bg-white rounded-lg max-w-4xl font-semibold">
          <div className="text-y-brown inline">{username}님</div>의 페어링
        </div>
        <PairingCardController pairingCardProps={pariginCardPops} />
        {pariginCardPops?.length ? (
          <Pagenation page={page} setPage={setPage} totalPages={totalPages} />
        ) : (
          <div className="noneContent py-8">
            <Image
              className="m-auto pb-3 opacity-50"
              src="/images/logo.png"
              alt="logo"
              width={40}
              height={40}
            />
            등록된 페어링이 없습니다.
          </div>
        )}
        <div className="pb-24"></div>
      </main>
    </PageContainer>
  );
}
