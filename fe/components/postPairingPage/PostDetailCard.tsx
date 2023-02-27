import Tag from '../Tag';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  BeerCountryMatcherToKor,
  BeerCategoryMatcherToKor,
} from '@/utils/BeerMatcher';

export default function PostDetailCard(props: any) {
  const [beerInfo, setBeerInfo] = useState(props);
  useEffect(() => {
    if (props.beerInfo !== undefined) setBeerInfo(props.beerInfo);
  }, [props]);

  return (
    <div className="flex rounded-lg bg-white text-y-black border border-y-lightGray px-3 py-5 my-2">
      {beerInfo?.beerDetailsBasic?.thumbnail.includes('.') ? (
        <Image
          className="pt-3 w-[100px] h-auto"
          alt={beerInfo?.beerDetailsBasic?.korName}
          src={beerInfo?.beerDetailsBasic?.thumbnail}
          width={100}
          height={200}
        />
      ) : (
        <>x</>
      )}

      <div className="flex flex-col justify-center">
        <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl">
          {beerInfo?.beerDetailsBasic?.korName}
        </h1>
        <div className="text-xs sm:text-sm lg:text-lg">
          <span>
            {BeerCountryMatcherToKor(beerInfo?.beerDetailsBasic?.country)}
          </span>
          <span>
            /
            {beerInfo?.beerCategoryTypes === undefined ? (
              <></>
            ) : (
              beerInfo?.beerCategoryTypes?.map((el: string, idx: number) => {
                return (
                  <span className="mx-0.5" key={idx}>
                    {el}
                  </span>
                );
              })
            )}
          </span>
          <span>/ {beerInfo?.beerDetailsBasic?.abv}%</span>
          <span>/ {beerInfo?.beerDetailsBasic?.ibu} IBU</span>
        </div>
        <div className="my-2">
          <span className="font-semibold sm:text-xl lg:text-2xl">
            ⭐️ {beerInfo?.beerDetailsStars?.totalAverageStars}
          </span>
          <span className="text-y-gray ml-1 text-xs sm:text-sm lg:text-lg">
            ({beerInfo?.beerDetailsCounts?.ratingCount} ratings)
          </span>
        </div>
        <div>
          {beerInfo?.beerDetailsTopTags === null ? (
            <></>
          ) : (
            beerInfo?.beerDetailsTopTags?.map((el: string, idx: number) => {
              return <Tag key={idx}>{BeerCategoryMatcherToKor(el)}</Tag>;
            })
          )}
        </div>
      </div>
    </div>
  );
}
