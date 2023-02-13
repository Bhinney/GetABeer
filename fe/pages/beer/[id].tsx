import Head from 'next/head';
import Image from 'next/image';
import SmallCardController from '@/components/smallCards/SmallCardController';
import SmallPairingController from '@/components/smallCards/SmallpairingController';
import SimilarBeerController from '@/components/smallCards/SimilarBeerController';
import RatingTitle from '@/components/beerPage/RatingTitle';
import PairingTitle from '@/components/beerPage/PairingTitle';
import BeerDetailCard, { testBeer } from '@/components/beerPage/BeerDetailCard';
import NavBar from '@/components/NavBar';

export default function Beer() {
  const cardProps = [
    {
      id: 1,
      star: 4.0,
      nickName: '유진님사진',
      description: '라마바사아자차가나사아자차가나나사아자차가나나',
      date: '2023.41.30',
      comments: 5,
      thumbs: 10,
      tags: ['맛 태그', '향 태그', '강 탄산', '색 태그'],
    },
    {
      id: 2,
      star: 4.222,
      nickName: '테스트',
      description:
        '가나다라마바사아자차가나다라마바사아자차가나다라마바사아자차가나다라마바사아자차가나가나다라마바사아자차가나다라마바사아자차가나다라마바사아자차가나다라마바사아자차가나가나다라마바사아자차가나다라마바사아자차가나다라마바사아자차가나다라마바사아자차가가나다라마바사아자차가나다라마바사아자차가나다라마바사아자차가나다라마바사아자차가나나',
      date: '2023.41.30',
      comments: 5,
      thumbs: 10,
      tags: ['맛 태그', '향 태그', '탄산', '색 태그'],
    },
  ];
  const pairProps = [
    {
      id: 1,
      pairing: '튀김',
      nickName: '유진님',
      description:
        '펠롱은 반짝이라 의미제주 사투리 입니 의미의 제주 사투리 입니다,sss제주 사투리 입니다제주 사투리 입니다제주 사투리 입니다',
      date: '2023.41.30',
      comments: 5,
      thumbs: 10,
    },
    {
      id: 2,
      pairing: '구이',
      nickName: '테스트',
      date: '2023.41.30',
      comments: 5,
      thumbs: 10,
      image: 'https://worldbeermarket.kr/userfiles/prdimg/2101060009_M.jpg',
    },
  ];
  const beerProps = [
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
    {
      id: 4,
      title: '가든 바이젠',
      category: '에일',
      country: '한국',
      level: 4.1,
      ibu: 17.5,
      image: 'https://worldbeermarket.kr/userfiles/prdimg/2101060009_M.jpg',
    },
    {
      id: 5,
      title: '필라이트',
      category: '에일',
      country: '한국',
      level: 4.1,
      ibu: 17.5,
      image: 'https://worldbeermarket.kr/userfiles/prdimg/2211160004_R.jpg',
    },
  ];
  let ratingCount = 35;
  let pairngCount = 3;

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
          className="w-full h-screen left-0 top-0 fixed -z-10"
          src="/images/background.png"
          alt="bg"
          width={500}
          height={500}
          priority
        />

        <div className="m-3">
          <BeerDetailCard cardProps={testBeer} />
        </div>

        <RatingTitle ratingCount={ratingCount} />
        <SmallCardController cardProps={cardProps} />

        <PairingTitle pairngCount={pairngCount} />
        <SmallPairingController pairProps={pairProps} />

        <SimilarBeerController beerProps={beerProps} />
        <NavBar />
      </main>
    </>
  );
}
