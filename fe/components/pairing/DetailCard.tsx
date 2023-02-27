import { MdModeEdit } from 'react-icons/md';
import { HiTrash } from 'react-icons/hi';
import ProfileCard from './ProfileCard';
import { useRecoilValue } from 'recoil';
import { noReview, NoReviewTypes } from '@/atoms/noReview';
import { useEffect, useState } from 'react';
import PairingImageCarousel from '@/components/pairing/PairingImageCarousel';
import { TimeHandler } from '@/utils/TimeHandler';
import { CategoryMatcherToKor } from '@/utils/CategryMatcher';
import { useRouter } from 'next/router';
import PairingThumbs from '../PairingThumbs';
import axios from '@/pages/api/axios';
import swal from 'sweetalert';

export default function DetailCard({ pairingProps }: any) {
  const noReviewState = useRecoilValue<NoReviewTypes[]>(noReview);
  let router = useRouter();
  const [curRoute, setCurRoute] = useState<any>();
  const [randomNum, setRandomNum] = useState(0);
  const [date, setDate] = useState<any>('');
  const [isLike, setIsLike] = useState<any>(pairingProps?.isUserLikes);
  const [likeCount, setLikeCount] = useState<any>(pairingProps?.likeCount);
  const initialDate = pairingProps?.createdAt;

  useEffect(() => {
    if (pairingProps !== undefined) {
      setCurRoute(router.query.id);
      setIsLike(pairingProps.isUserLikes);
      setLikeCount(pairingProps.likeCount);
    }
  }, [router, curRoute, pairingProps]);

  useEffect(() => {
    let randomTmp: number = Math.floor(Math.random() * 3);
    setRandomNum(randomTmp);
  }, []);

  useEffect(() => {
    if (initialDate !== undefined) {
      let tmpDate = TimeHandler(initialDate);
      setDate(tmpDate);
    }
  }, [initialDate]);

  const hadleDelte = () => {
    swal({
      title: '삭제하시겠습니까?',
      // text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: ['취소', '삭제'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const TOKEN = localStorage.getItem('accessToken');
        const config = {
          headers: {
            authorization: TOKEN,
            'content-type': 'multipart/form-data',
          },
          withCredentials: true,
        };
        axios
          .delete(`/api/pairings/${curRoute}`, config)
          .then(() => {
            router.back();
          })
          .catch((error) => console.log(error));
      } else {
      }
    });
  };
  const hadleEdit = () => {
    router.replace(`/editpairing/${curRoute}`);
  };

  return (
    <>
      {/*닉네임, 날짜*/}
      <div className="flex justify-between items-center">
        <ProfileCard
          nickname={pairingProps?.nickname}
          date={date}
          src={pairingProps?.userImage}
        />

        <div className="flex px-4">
          <div onClick={hadleEdit}>
            <MdModeEdit className="text-y-brown inline" /> 수정
          </div>
          <div onClick={hadleDelte}>
            <HiTrash className="text-y-brown ml-1 inline" />
            <span>삭제</span>
          </div>
        </div>
      </div>
      {/* 사진,설명 */}
      <div>
        <div className="w-full px-2">
          {pairingProps?.imageList === undefined ? (
            <></>
          ) : (
            <PairingImageCarousel imageList={pairingProps?.imageList} />
          )}
          <div className="p-2 h-fit overflow-hidden w-full leading-6">
            <div className="w-fit px-2 py-[2px] text-xs rounded-md text-white bg-y-gold">
              {CategoryMatcherToKor(pairingProps?.category)}
            </div>
            {pairingProps?.content === undefined ? (
              <div className="text-y-gray">
                {noReviewState[randomNum]?.contents}
              </div>
            ) : (
              <>{pairingProps?.content}</>
            )}
          </div>
        </div>
      </div>

      {/* 코멘트수,엄지수 */}
      <div className="py-2 px-5 flex justify-end items-center text-[8px]">
        <PairingThumbs
          pairingId={pairingProps?.pairingId}
          isLike={isLike}
          setIsLike={setIsLike}
          likeCount={likeCount}
          setLikeCount={setLikeCount}
        />
      </div>
    </>
  );
}
