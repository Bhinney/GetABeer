import { UseFormRegister, RegisterOptions } from 'react-hook-form';
interface IFormValues {
  beerTagType: string;
  gender: string;
  age: string;
  userBeerCategories: string;
}
type InputProps = {
  register: UseFormRegister<IFormValues>;
  rules?: RegisterOptions;
};

export default function InterestTag({ rules, register }: InputProps) {
  const interestList = [
    {
      type: 'STRAW',
      text: '짚색',
    },
    {
      type: 'GOLD',
      text: '금색',
    },
    {
      type: 'BROWN',
      text: '갈색',
    },
    {
      type: 'BLACK',
      text: '흑색',
    },
    {
      type: 'FRUITY',
      text: '과일향',
    },
    {
      type: 'FLOWER',
      text: '꽃향',
    },
    {
      type: 'MALTY',
      text: '몰트향',
    },
    {
      type: 'HOPPY',
      text: '홉향',
    },
    {
      type: 'WEAK',
      text: '탄산 약',
    },
    {
      type: 'MIDDLE',
      text: '탄산 중',
    },
    {
      type: 'STRONG',
      text: '탄산 강',
    },
    {
      type: 'NO_CARBONATION',
      text: '탄산 無',
    },
    {
      type: 'SWEET',
      text: '단맛',
    },
    {
      type: 'SOUR',
      text: '신맛',
    },
    {
      type: 'BITTER',
      text: '쓴맛',
    },
    {
      type: 'ROUGH',
      text: '떫은맛',
    },
  ];

  return (
    <div className="px-2 pt-2">
      <div className="text-sm">관심 태그 (최대 4개까지 선택 가능)</div>
      <div className="grid grid-cols-4 my-2 gap-1 w-full items-center">
        {interestList.map((el: any, idx: number) => (
          <div key={idx.toString()}>
            <input
              type="checkbox"
              id={el.type}
              value={el.type}
              className="peer hidden"
              {...(register && register('beerTagType', rules))}
            />
            <label
              htmlFor={el.type}
              className="text-xs h-10 w-full inline-flex items-center justify-center cursor-pointer select-none rounded-xl p-1 text-center peer-checked: border-2 peer-checked:border-y-brown"
            >
              {el.text}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
