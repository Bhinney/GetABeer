import Tag from '../Tag';
import Image from 'next/image';

export interface MiddleCardInfo {
  beerId: number;
  thumbnail: string;
  korName: string;
  category: string[];
  country: string;
  abv: number;
  ibu: number;
  totalStarCount: number;
  totalAverageStars: number;
  beerTags: string[];
}

export const testBeer: MiddleCardInfo = {
  beerId: 1,
  thumbnail:
    'http://assabeer.com/web/product/big/20200324/0be547eff075d3cdc5c48afd483af272.jpg',
  korName: '제주 슬라이스',
  category: ['ALE', 'IPA'],
  country: '한국',
  abv: 4.5,
  ibu: 28,
  totalStarCount: 25,
  totalAverageStars: 4.3,
  beerTags: ['금색', '단맛', '과일향', '탄산 강'],
};

export default function MiddleCard({ cardProps }: any) {
  return (
    <div className="flex rounded-lg bg-white text-y-black border border-y-lightGray px-3 py-5 m-2">
      <Image
        className="pt-3"
        alt={cardProps?.korName}
        src={cardProps?.thumbnail}
        width={100}
        height={200}
      />
      <div className="flex flex-col justify-center">
        <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl">
          {cardProps?.korName}
        </h1>
        <div className="text-xs sm:text-sm lg:text-lg">
          <span>{cardProps?.country}</span>
          <span>
            /
            {cardProps?.category.map((el: string, idx: number) => {
              return (
                <span className="mx-0.5" key={idx}>
                  {el}
                </span>
              );
            })}
          </span>
          <span>/ {cardProps?.abv}%</span>
          <span>/ {cardProps?.ibu} IBU</span>
        </div>
        <div className="my-2">
          <span className="font-semibold sm:text-xl lg:text-2xl">
            ⭐️ {cardProps?.totalAverageStars}
          </span>
          <span className="text-y-gray ml-1 text-xs sm:text-sm lg:text-lg">
            ({cardProps?.totalStarCount} ratings)
          </span>
        </div>
        <div>
          {cardProps?.beerTags.map((el: string, idx: number) => {
            return <Tag key={idx}>{el}</Tag>;
          })}
        </div>
      </div>
    </div>
  );
}
