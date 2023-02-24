import Image from 'next/image';
import Link from 'next/link';
import { HiPencil, HiChartPie, HiShare } from 'react-icons/hi';
import WishHeart from '@/components/WishHeart';
import StarScore from './StarScore';
import KakaoShareButton from './KakaoShareButton';

export default function BeerDetailCard({ cardProps }: any) {
  return (
    <div className="flex rounded-xl bg-white text-y-black border border-y-lightGray py-2 my-2 relative">
      <div className="flex m-auto">
        <div className="w-[122px] select-none">
          {cardProps?.beerDetailsBasic.thumbnail.includes('.') ? (
            <Image
              className="pt-3 w-full h-auto select-none"
              alt={cardProps?.beerDetailsBasic.korName}
              src={cardProps?.beerDetailsBasic.thumbnail}
              width={100}
              height={100}
              priority
            />
          ) : (
            <>x</>
          )}
        </div>
        <div className="flex flex-col justify-center ml-1">
          <h1 className="font-bold text-2xl">
            {cardProps?.beerDetailsBasic.korName}
          </h1>
          {/* <WishHeart /> */}
          <div className="text-xs flex flex-wrap">
            <span>
              {cardProps?.beerCategoryTypes.map((el: string, idx: number) => {
                return (
                  <span className="mr-0.5" key={idx}>
                    {el}
                  </span>
                );
              })}
            </span>
            <span className="mx-[1px]">
              / {cardProps?.beerDetailsBasic.country}
            </span>
            <span className="mx-[1px]">
              {cardProps?.beerDetailsBasic.abv}% /
            </span>
            {cardProps?.beerDetailsBasic.ibu !== null ? (
              <span>{cardProps?.beerDetailsBasic.ibu} IBU</span>
            ) : (
              <></>
            )}
          </div>
          <div className="my-1 flex items-end">
            <StarScore score={cardProps?.beerDetailsStars.totalAverageStars} />
            <span className="text-xs text-y-gray">
              ({cardProps?.beerDetailsStars.totalAverageStars})
            </span>
          </div>
          <div className="mb-2 text-xs flex">
            <div className="mr-4">
              <Image
                src="/images/star.png"
                alt="star"
                width={13}
                height={13}
                className="mr-1 mb-[3px] text-y-gold drop-shadow-md inline"
              />
              {cardProps?.beerDetailsStars.femaleAverageStars} 여성
            </div>
            <div>
              <Image
                src="/images/star.png"
                alt="star"
                width={13}
                height={13}
                className="mr-1 mb-[3px] text-y-gold drop-shadow-md inline"
              />
              {cardProps?.beerDetailsStars.maleAverageStars} 남성
            </div>
          </div>
          <div className="text-xs">
            <Link href={'/postrating'} className="hover:text-y-gold mr-1">
              <HiPencil className="inline" /> 평가하기
            </Link>
            <Link href={'/postpairing'} className="hover:text-y-gold mr-1">
              <span className="mr-1">
                <HiChartPie className="inline" /> 페어링
              </span>
            </Link>

            <KakaoShareButton
              imageUrl={cardProps?.beerDetailsBasic?.thumbnail}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
