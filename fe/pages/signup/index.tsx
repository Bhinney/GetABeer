import SubmitBtn from '@/components/button/SubmitBtn';
import { Input } from '@/components/inputs/Input';
import Head from 'next/head';
import Link from 'next/link';
import { IoChevronBack } from 'react-icons/io5';
import { BiErrorAlt } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import axios from '@/pages/api/axios';
import { useRouter } from 'next/router';
import Router from 'next/router';

interface IFormValues {
  email: string;
  password: string;
  name: string;
  text: string;
  passwordConfirm: string;
  editpassword: string;
}
export default function Signup() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IFormValues>({ mode: 'onChange' });
  const onValid = (data: any) => {
    // 기본으로 data 가져오기
    // console.log(data);
    const { name, password } = getValues();
    signUpClick(name, password);
  };

  const signUpClick = (name: string, password: string) => {
    const reqBody = {
      email: router.query.email,
      nickname: name,
      password: password,
    };
    axios
      .post('/api/register/user', reqBody)
      .then((res) => {
        // console.log(res);
        Router.push({
          pathname: '/signup/information',
          query: { user_id: res.data },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Head>
        <title>GetABeer</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <main className="m-auto h-screen max-w-4xl">
        <Link href={'/signup/email'}>
          <button className="m-4">
            <IoChevronBack className="w-6 h-6" />
          </button>
        </Link>
        <div className="my-4 text-center text-lg bg-white rounded-lg font-semibold">
          회원가입
        </div>

        <div className="m-auto max-w-md">
          <div className="m-2 p-2.5 text-sm font-light border border-y-gray rounded-xl">
            {router.query.email}
          </div>
          <form onSubmit={handleSubmit(onValid)}>
            <Input
              name="name"
              type="text"
              placeholder="닉네임 (2~10자)"
              register={register}
              rules={{
                required: '필수 입력 항목입니다.',
                minLength: {
                  value: 2,
                  message: '2자 이상 입력해주세요',
                },
                maxLength: {
                  value: 10,
                  message: '10자 이하로 입력해주세요.',
                },
              }}
            />
            {errors.name && (
              <p className="flex text-xs mx-3 gap-0.5 text-red-500 font-light">
                <BiErrorAlt />
                {errors.name.message}
              </p>
            )}
            <Input
              name="password"
              type="password"
              placeholder="비밀번호"
              register={register}
              rules={{
                required: '필수 입력 항목입니다.',
                pattern: {
                  value:
                    /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/,
                  message:
                    '비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.',
                },
              }}
            />
            {errors.password && (
              <p className="flex text-xs mx-3 gap-0.5 text-red-500 font-light">
                <BiErrorAlt />
                {errors.password.message}
              </p>
            )}

            <Input
              name="passwordConfirm"
              type="password"
              placeholder="비밀번호 확인"
              register={register}
              rules={{
                required: '확인을 위해 비밀번호를 한 번 더 입력해주세요.',
                validate: {
                  matchesPreviousPassword: (value) => {
                    const { password } = getValues();
                    return (
                      password === value || '비밀번호가 일치하지 않습니다!'
                    );
                  },
                },
              }}
            />

            {errors.passwordConfirm && (
              <p className="flex text-xs mx-3 gap-0.5 text-red-500 font-light">
                <BiErrorAlt />
                {errors.passwordConfirm.message}
              </p>
            )}

            <SubmitBtn onClick={undefined}> 가입하기 </SubmitBtn>
          </form>
          <div className="my-3 flex justify-center gap-1.5 text-sm">
            <div className="text-y-gray font-light">이미 계정이 있다면?</div>
            <Link href={'/login'}>
              <button className="flex text-y-brown">로그인</button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
