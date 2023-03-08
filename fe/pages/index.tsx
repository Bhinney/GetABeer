import Head from 'next/head';
import Advertise from '@/components/mainPage/Advertise';
import RecommendBeer from '@/components/smallCards/RecommendBeer';
import BeerCategoryBtn from '@/components/mainPage/BeerCategoryBtn';
import Footer from '@/components/Footer';
import axios from '@/pages/api/axios';
import { useEffect, useState } from 'react';
import PopularBeer from '@/components/smallCards/PopularBeer';
import { useRecoilState } from 'recoil';
import { userNickname } from '@/atoms/login';
import {
  PopularBeerType,
  RecommendBeerType,
} from '@/components/beerPage/BeerDeclare';

export default function Main() {
  const [username] = useRecoilState<string>(userNickname);
  const [popularBeer, setPopularBeer] = useState<PopularBeerType[] | string>();
  const [recommendBeer, setRecommendBeer] = useState<
    RecommendBeerType[] | string
  >('');
  const [recommendFlag, setRecommendFlag] = useState<RecommendBeerType | null>(
    null
  );

  // 인기 많은 맥주
  useEffect(() => {
    axios
      .get(`/api/beers/weekly`)
      .then((response) => setPopularBeer(response.data));
  }, []);

  // 사용자 추천맥주
  useEffect(() => {
    axios
      .get(`/api/beers/recommend`)
      .then((response) => {
        setRecommendBeer(response.data);
        setRecommendFlag(response.data[0].beerId);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <Head>
        <title>GetABeer</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <main className="m-auto h-screen max-w-4xl">
        <Advertise />
        <div className="m-auto">
          <BeerCategoryBtn />
          {popularBeer === '' ? (
            <></>
          ) : (
            <>
              <PopularBeer popularBeer={popularBeer} />
            </>
          )}
          {recommendBeer === '' ? (
            <></>
          ) : recommendFlag === null ? (
            <></>
          ) : (
            <>
              <div className="m-3 mt-6 text-base font-semibold lg:text-xl">
                <span className="text-y-brown mr-1">{username} 님의</span>
                <span className="text-black">추천 맥주</span>
              </div>
              <RecommendBeer recommendBeer={recommendBeer} />
            </>
          )}
        </div>
        <div className="pb-8"></div>
        <Footer />
      </main>
    </>
  );
}
