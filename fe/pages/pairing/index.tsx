import Head from 'next/head';
import NavBar from '@/components/NavBar';
import SortBox from '@/components/selectBox/SortBox';
import PairingBox from '@/components/selectBox/PairingBox';
import PairingCardController from '@/components/pairing/pairingCardController';

export default function Pairing() {
  const pairingCardProps = [
    {
      id: 1,
      title: '제주펠롱에일',
      nickname: '에일',
      date: '2023.41.30',
      comment: 4,
      thumb: 17,
      image: 'https://worldbeermarket.kr/userfiles/prdimg/2101060009_M.jpg',
      description:
        '펠롱은 반짝이라는 의미의 제주 사투리 입니다.펠롱은 반짝이라는 의미제주 사투리 입니다,펠롱은 반짝이라는 의미의 제주 사투리 입니다,펠롱은반짝이라는 의미의 제주 사투리 입니다',
    },
    {
      id: 2,
      title: '제주펠롱에일',
      nickname: '에일리',
      date: '2023.41.30',
      comment: 40,
      thumb: 170,
      description:
        '펠롱은 반짝이라는 의미의 제주 사투리 입니다.펠롱은 반짝이라는 의미제주 사투리 입니다,펠롱은 반짝이라는 의미의 제주 사투리 입니다,펠롱은반짝이라는 의미의 제주 사투리 입니다',
    },
    {
      id: 3,
      title: '제주펠롱에일',
      nickname: '안유진',
      date: '2023.41.30',
      comment: 40,
      thumb: 170,
      image: 'https://worldbeermarket.kr/userfiles/prdimg/2211160004_R.jpg',
      description:
        '펠롱은 반짝이라는 의미의 제주 사투리 입니다.펠롱은 반짝이라는 의미제주 사투리 입니다,펠롱은 반짝이라는 의미의 제주 사투리 입니다,펠롱은반짝이라는 의미의 제주 사투리 입니다',
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
      <main className="m-auto h-screen max-w-4xl border">
        <div className="mt-4 text-center bg-white rounded-lg max-w-4xl font-semibold">
          제주슬라이스
        </div>
        <div className="m-auto flex">
          <SortBox /> <PairingBox />
        </div>
        <PairingCardController pairingCardProps={pairingCardProps} />
        <div className="pb-32"></div>
        <NavBar />
      </main>
    </>
  );
}
