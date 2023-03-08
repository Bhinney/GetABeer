import Head from 'next/head';
import DetailCard from '@/components/pairing/DetailCard';
import SpeechBalloon from '@/components/SpeechBalloon';
import CommentInput from '@/components/inputs/CommentInput';
import axios from '@/pages/api/axios';
import { IoChevronBack } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PairingComment } from '@/components/SpeechBalloon';
import { useRecoilValue } from 'recoil';
import { accessToken, userId } from '@/atoms/login';
import Swal from 'sweetalert2';
import { PairingCardProps } from '@/components/beerPage/BeerDeclare';
import BackBtn from '@/components/button/BackPageBtn';

export default function PairingDetail() {
  let router = useRouter();
  const TOKEN = useRecoilValue(accessToken);
  const USERID = useRecoilValue(userId);
  const [isLogin, setIsLogin] = useState(false);
  const [isMine, setIsMine] = useState(false);

  useEffect(() => {
    if (TOKEN === '') {
    } else {
      setIsLogin(true);
    }
  }, [TOKEN]);
  const [curRoute, setCurRoute] = useState<number | undefined>();
  const [pairingProps, setPairingProps] = useState<PairingCardProps>();
  const [inputState, setInputState] = useState<string>('');
  const [pairingCommentList, setPairingCommentList] = useState<
    PairingComment[] | null
  >(null);

  useEffect(() => {
    setCurRoute(Number(router.query.id));
  }, [router, curRoute]);

  useEffect(() => {
    // 특정 페어링 조회
    if (curRoute !== undefined) {
      axios
        .get(`/api/pairings/${curRoute}`)
        .then((response) => {
          setPairingProps(response.data);
          setPairingCommentList(response.data.commentList);
          if (response.data.userId === USERID) {
            setIsMine(true);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [curRoute, USERID]);

  const postPairingComment = () => {
    if (inputState !== '') {
      const reqBody = {
        pairingId: Number(curRoute),
        content: inputState,
      };
      axios
        .post('/api/pairings/comments', reqBody)
        .then((res) => {
          if (pairingCommentList === null) {
            setPairingCommentList([res.data]);
          } else {
            setPairingCommentList([res.data, ...pairingCommentList]);
          }
          setInputState('');
        })
        .catch((err) => console.log(err));
    }
  };

  const deletePairingComment = (pairingCommentId: number) => {
    axios.delete(`/api/pairings/comments/${pairingCommentId}`).then((res) => {
      if (pairingCommentList !== null) {
        const filtered = pairingCommentList.filter((el) => {
          return el.pairingCommentId !== pairingCommentId;
        });
        setPairingCommentList(filtered);
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
      <main className="m-auto h-screen max-w-4xl relative">
        <BackBtn />

        <div className="text-xl mt-4 mb-3 text-center font-semibold">
          {pairingProps?.korName}
        </div>

        <div className="rounded-lg bg-white text-y-black text-xs border-2 mx-2">
          <DetailCard
            pairingProps={pairingProps}
            count={pairingCommentList ? pairingCommentList?.length : 0}
          />
          <div className="px-4 my-5">
            <CommentInput
              inputState={inputState}
              setInputState={setInputState}
              postFunc={
                isLogin
                  ? postPairingComment
                  : () => {
                      Swal.fire({
                        text: '로그인이 필요한 서비스 입니다.',
                        showCancelButton: true,
                        confirmButtonColor: '#f1b31c',
                        cancelButtonColor: '#A7A7A7',
                        confirmButtonText: '로그인',
                        cancelButtonText: '취소',
                      }).then((result) => {
                        if (result.isConfirmed) {
                          router.push({
                            pathname: '/login',
                          });
                        }
                      });
                    }
              }
            />
          </div>
          <div className="mr-3">
            {pairingCommentList === null
              ? null
              : pairingCommentList.map((el) => {
                  return (
                    <SpeechBalloon
                      key={el.pairingCommentId}
                      props={el}
                      isMine={USERID === el.userId}
                      deleteFunc={deletePairingComment}
                    />
                  );
                })}
          </div>
        </div>
        <div className="pb-16"></div>
      </main>
    </>
  );
}
