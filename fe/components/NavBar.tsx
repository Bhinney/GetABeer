import Link from 'next/link';
import { AiOutlineTrophy, AiOutlineHome } from 'react-icons/ai';
import { FiMapPin } from 'react-icons/fi';
import { BiUser } from 'react-icons/bi';
import CameraModal from './modal/CameraModal';
export default function NavBar() {
  return (
    <>
      <nav className="w-full m-auto fixed bottom-0 z-[9] border-gray-200 select-none">
        <div className="max-w-4xl m-auto border-t grid grid-cols-5 px-5 bg-white text-center py-1">
          {/* <div className="pt-12"></div> */}

          <Link href={'/'} className="hover:text-y-brown">
            <AiOutlineHome className="m-auto text-3xl py-[1px]" />
            <div className="text-[8px]">홈</div>
          </Link>

          <Link href={'/monthly'} className="hover:text-y-brown">
            <AiOutlineTrophy className="m-auto text-3xl py-[1px]" />
            <div className="text-[8px]">이달의 맥주</div>
          </Link>

          <CameraModal />

          <Link href={'/map/store'} className="hover:text-y-brown">
            <FiMapPin className="m-auto text-3xl py-[1px]" />
            <div className="text-[8px]">지도</div>
          </Link>

          <Link href={'/mypage'} className="hover:text-y-brown">
            <BiUser className="m-auto text-3xl py-[1px]" />
            <div className="text-[8px]">마이페이지</div>
          </Link>
        </div>
      </nav>
    </>
  );
}
