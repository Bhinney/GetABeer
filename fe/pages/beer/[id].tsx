import Head from 'next/head';
import Image from 'next/image';
import SmallCardController from '@/components/smallCards/SmallCardController';
import SmallPairingController from '@/components/smallCards/SmallpairingController';
import SimilarBeerController from '@/components/smallCards/SimilarBeerController';
import RatingTitle from '@/components/beerPage/RatingTitle';
import PairingTitle from '@/components/beerPage/PairingTitle';
import BeerDetailCard from '@/components/beerPage/BeerDetailCard';
import NavBar from '@/components/NavBar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Beer() {
  let router = useRouter();
  const [curRoute, setCurRoute] = useState<any>();
  useEffect(() => {
    setCurRoute(router.query.id);
  }, [router, curRoute]);

  const ratingProps = {
    data: [
      {
        beerId: 1,
        ratingId: 3,
        userId: 2,
        nickname: '닉네임2',
        content: '맥주 향이 좋습니다.',
        ratingTag: ['GOLD', 'SWEET', 'FLOWER', 'MIDDLE'],
        star: 4.5,
        likeCount: 0,
        commentCount: 0,
        isUserLikes: false,
        createdAt: '2023-02-13T16:44:29.882045',
        modifiedAt: '2023-02-13T16:44:29.882045',
      },
      {
        beerId: 1,
        ratingId: 2,
        userId: 2,
        nickname: '닉네임2',
        content: '맥주 향이 좋습니다.',
        ratingTag: ['GOLD', 'SWEET', 'FLOWER', 'MIDDLE'],
        star: 4.5,
        likeCount: 0,
        commentCount: 0,
        isUserLikes: false,
        createdAt: '2023-02-13T16:44:29.312609',
        modifiedAt: '2023-02-13T16:44:29.312609',
      },
      {
        beerId: 1,
        ratingId: 1,
        userId: 2,
        nickname: '닉네임2',
        content: '맥주 향이 좋습니다.',
        ratingTag: ['GOLD', 'SWEET', 'FLOWER', 'MIDDLE'],
        star: 4.5,
        likeCount: 1,
        commentCount: 0,
        isUserLikes: true,
        createdAt: '2023-02-13T16:44:28.578757',
        modifiedAt: '2023-02-13T16:44:34.0661',
      },
    ],
    pageInfo: {
      page: 1,
      size: 5,
      totalElements: 3,
      totalPages: 1,
    },
  };

  const [beerInfo, setBeerInfo] = useState<any>();
  const [commentInfo, setCommentInfo] = useState<any>();
  const [pairingInfo, setPairingInfo] = useState<any>();
  const [similarBeer, setSimilarBeer] = useState<any>();
  useEffect(() => {
    // 특정 맥주 조회
    if (curRoute !== undefined) {
      axios
        .get(`http://localhost:8080/api/beers/${curRoute}`)
        .then((response) => {
          setBeerInfo(response.data);
          setSimilarBeer(response.data.similarBeers);
        })
        .catch((error) => console.log(error));
    }
  }, [curRoute]);

  // useEffect(() => {
  //   // 특정 코멘트 조회
  //   if (curRoute !== undefined) {
  //     axios
  //       .get(`http://localhost:8080/api/pairings/${curRoute}`)
  //       .then((response) => console.log('response', response.data))
  //       .catch((error) => console.log(error));
  //   }
  // }, [curRoute]);

  // useEffect(() => {
  //   // 특정 페어링 조회
  //   if (curRoute !== undefined) {
  //     axios
  //       .get(`http://localhost:8080/api/pairings/${curRoute}`)
  //       .then((response) => console.log('response', response.data))
  //       .catch((error) => console.log(error));
  //   }
  // }, [curRoute]);

  const pairingProps = {
    data: [
      {
        beerId: 1,
        pairingId: 1,
        nickname: '김맥주',
        content: '수정된 페어링',
        thumbnail:
          'https://worldbeermarket.kr/userfiles/prdimg/2301050762_R.jpg',
        category: 'SNACK',
        likeCount: 3,
        commentCount: 0,
        isUserLikes: true,
        createdAt: '2023-02-06T00:29:14.59836',
        modifiedAt: '2023-02-06T00:31:11.1951',
      },
      {
        beerId: 1,
        pairingId: 2,
        nickname: '김맥주',
        content: '페어링 안내',
        thumbnail:
          'https://worldbeermarket.kr/userfiles/prdimg/2102080006_M.jpg',
        category: 'GRILL',
        likeCount: 2,
        commentCount: 0,
        isUserLikes: false,
        createdAt: '2023-02-06T00:35:58.259552',
        modifiedAt: '2023-02-06T00:35:58.259552',
      },
    ],
    pageInfo: {
      page: 1,
      size: 5,
      totalElements: 2,
      totalPages: 1,
    },
  };

  const BeerList = [
    {
      id: 1,
      title: '가든 바이젠',
      category: '에일',
      country: '한국',
      level: 4.1,
      ibu: 17.5,
      image: 'https://worldbeermarket.kr/userfiles/prdimg/2101060009_M.jpg',
    },
    {
      id: 2,
      title: '필라이트',
      category: '에일',
      country: '한국',
      level: 4.1,
      ibu: 17.5,
      image: 'https://worldbeermarket.kr/userfiles/prdimg/2211160004_R.jpg',
    },
    {
      id: 3,
      title: '가든 바이젠',
      category: '에일',
      country: '한국',
      level: 4.1,
      ibu: 17.5,
      image: 'https://worldbeermarket.kr/userfiles/prdimg/2011190018_M.jpg',
    },
  ];

  return (
    <>
      <Head>
        <title>GetABeer</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>

      <main className="m-auto h-screen max-w-4xl relative">
        <Image
          className="w-full h-screen left-0 top-0 fixed -z-10 select-none"
          src="/images/background.png"
          alt="bg"
          width={500}
          height={500}
        />

        <div className="m-3">
          {/* 맥주 등록 이미지 없다. 현재 썸네일 이미지 경로 따로 없는 상태*/}
          <BeerDetailCard cardProps={beerInfo} />
        </div>

        <RatingTitle ratingCount={ratingProps.pageInfo.totalElements} />
        <SmallCardController cardProps={ratingProps.data} />

        <PairingTitle pairngCount={pairingProps.pageInfo.totalElements} />
        <SmallPairingController pairProps={pairingProps.data} />

        <SimilarBeerController beerProps={BeerList} />
        <NavBar />
      </main>
    </>
  );
}
