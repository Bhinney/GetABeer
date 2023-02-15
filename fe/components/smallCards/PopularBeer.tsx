import { BeerInfo } from './PopularBeerController';
import Image from 'next/image';

export default function PopularBeer(props: {
  popularBeer: BeerInfo;
  idx: number;
}) {
  return (
    <div className="rounded-2xl w-full m-2 border bg-white text-y-black drop-shadow-lg text-[5px]  overflow-hidden">
      <div
        className={`${
          props.idx % 2 === 0 ? 'bg-y-cream' : 'bg-y-lemon'
        } p-4 rounded-t-2xl`}
      >
        <div className="text-base font-semibold">{props.popularBeer.title}</div>
        <div>{`${props.popularBeer.category} / ${props.popularBeer.country} ${props.popularBeer.level}% ${props.popularBeer.ibu}IBU`}</div>
      </div>
      <Image
        className="pt-3 rounded-2xl m-auto select-none"
        alt="Beer"
        src={`${props.popularBeer.image}`}
        width={300}
        height={200}
        priority
      />
    </div>
  );
}
