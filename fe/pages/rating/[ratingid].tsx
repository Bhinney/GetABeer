import { IoChevronBack } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from '@/pages/api/axios';
import RatingCard, {
  RatingCardProps,
} from '@/components/middleCards/RatingCard';
import CommentInput from '@/components/inputs/CommentInput';
import PageContainer from '@/components/PageContainer';
import SpeechBalloon from '@/components/SpeechBalloon';
import { RatingComment } from '@/components/SpeechBalloon';
import { useRecoilValue } from 'recoil';
import { accessToken } from '@/atoms/login';
import Swal from 'sweetalert2';

export default function Rating() {
  const router = useRouter();
  const ratingId = router.query.ratingid;
  const TOKEN = useRecoilValue(accessToken);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (TOKEN === '') {
    } else {
      setIsLogin(true);
    }
  }, [TOKEN]);
  const [cardProps, setCardProps] = useState<RatingCardProps>();
  const [inputState, setInputState] = useState<string>('');
  const [ratingCommentList, setRatingCommentList] = useState<
    RatingComment[] | null
  >(null);

  useEffect(() => {
    if (ratingId !== undefined) {
      axios
        .get(`/api/ratings/${ratingId}`)
        .then((res) => {
          setCardProps(res.data);
          setRatingCommentList(res.data.ratingCommentList);
        })
        .catch((err) => console.log(err));
    }
  }, [ratingId]);

  const postRatingComment = () => {
    if (inputState !== '') {
      const reqBody = {
        ratingId: Number(ratingId),
        content: inputState,
      };
      axios
        .post('/api/ratings/comments', reqBody)
        .then((res) => {
          if (ratingCommentList === null) {
            setRatingCommentList([res.data]);
          } else {
            setRatingCommentList([res.data, ...ratingCommentList]);
          }
          setInputState('');
        })
        .catch((err) => console.log(err));
    }
  };

  const deleteRatingComment = (ratingCommentId: number) => {
    axios
      .delete(`/api/ratings/comments/${ratingCommentId}`)
      .then((res) => {
        if (ratingCommentList !== null) {
          const filtered = ratingCommentList.filter((el) => {
            return el.ratingCommentId !== ratingCommentId;
          });
          setRatingCommentList(filtered);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <PageContainer>
      <div className="px-2">
        <IoChevronBack
          onClick={() => router.back()}
          className="text-xl text-y-gray my-2"
        />
        <div className="flex justify-center mb-4 mt-8">
          <h1 className="text-xl lg:text-2xl font-bold">
            {cardProps?.korName}
          </h1>
        </div>
        <div className="border border-y-lightGray rounded-lg px-3 py-4 m-2">
          {cardProps !== undefined ? (
            <RatingCard
              cardProps={cardProps}
              isMine={true}
              count={ratingCommentList ? ratingCommentList?.length : 0}
            />
          ) : null}
          <div className="my-5">
            <CommentInput
              inputState={inputState}
              setInputState={setInputState}
              postFunc={
                isLogin
                  ? postRatingComment
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
          <div>
            {ratingCommentList === null
              ? null
              : ratingCommentList.map((el) => {
                  return (
                    <SpeechBalloon
                      key={el.ratingCommentId}
                      props={el}
                      isMine={true}
                      deleteFunc={deleteRatingComment}
                    />
                  );
                })}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
