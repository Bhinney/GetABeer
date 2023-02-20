import SubmitBtn from '@/components/button/SubmitBtn';
import { Input } from '@/components/inputs/Input';
import Head from 'next/head';
import { IoClose } from 'react-icons/io5';
import { useForm } from 'react-hook-form';

interface IFormValues {
  email: string;
  password: string;
  name: string;
  text: string;
  passwordConfirm: string;
}
export default function PwEdit() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IFormValues>({ mode: 'onChange' });
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
          <IoClose className="w-6 h-6" />
        </button>
        <div className="my-4 text-center text-lg bg-white rounded-lg font-semibold">
          비밀번호 변경
        </div>
        <div className="m-auto max-w-md">
          <Input
            name="password"
            type="password"
            placeholder="현재 비밀번호 입력"
            register={register}
          />
          <Input
            name="password"
            type="password"
            placeholder="변경할 비밀번호 입력"
            register={register}
          />
          <Input
            name="password"
            type="password"
            placeholder="변경할 비밀번호 확인"
            register={register}
          />
          <SubmitBtn onClick={handleClick}> 로그인 </SubmitBtn>
        </div>
      </main>
    </>
  );
}
