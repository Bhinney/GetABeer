import SubmitBtn from '@/components/button/SubmitBtn';
import Head from 'next/head';
import { IoChevronBack, IoChevronForwardOutline } from 'react-icons/io5';
import { HiPencil } from 'react-icons/hi2';
import GenderBtn from '@/components/signup/GenderBtn';
import AgeBox from '@/components/signup/AgeBox';
import InterestTag from '@/components/signup/ InterestTag';
import BeerCategory from '@/components/signup/BeerCategory';
import { useForm } from 'react-hook-form';

interface IFormValues {
  beerTagType: string;
  gender: string;
  age: string;
  userBeerCategories: string;
}
export default function MyEdit() {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      gender: 'REFUSE',
    },
    mode: 'onChange',
  });
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {};
  return (
    <>
      <Head>
        <title>GetABeer</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <main className="m-auto h-screen max-w-4xl">
        <button className="m-4">
          <IoChevronBack className="w-6 h-6" />
        </button>
        <div className="my-4 text-center text-lg bg-white rounded-lg font-semibold">
          회원정보 수정
        </div>
        <div className="flex flex-col items-center my-6">
          <div className="w-24 h-24 bg-y-cream rounded-2xl"></div>
          <div className="flex justify-center items-center gap-1 mt-2">
            <div className="text-sm">성유미님</div>
            <button className="w-5 h-5 text-y-brown">
              <HiPencil className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="m-auto px-1 pb-5 max-w-md mb-10">
          <div className=" border divide-y divide-gray-200 rounded-xl">
            <div className="flex w-full px-3 py-4 justify-between text-sm">
              <div>닉네임</div>
              <input
                className="text-right"
                type="text"
                placeholder="닉네임"
              ></input>
            </div>
            <GenderBtn register={register} />
            <AgeBox register={register} />
            <BeerCategory register={register} />
            <InterestTag register={register} />
            <button className="flex w-full px-3 py-4 justify-between">
              <div className="text-sm">비밀번호 변경</div>
              <IoChevronForwardOutline className="w-5 h-5 " />
            </button>
            <SubmitBtn onClick={handleClick}>등록하기</SubmitBtn>
          </div>
        </div>
      </main>
    </>
  );
}
