import { useState, useEffect } from 'react';
import { GoTriangleDown } from 'react-icons/go';
import { CategoryMatcherToEng } from '@/utils/CategryMatcher';
export type Category =
  | 'ALL'
  | 'FRIED'
  | 'GRILL'
  | 'STIR'
  | 'FRESH'
  | 'DRY'
  | 'SNACK'
  | 'SOUP'
  | 'ETC';

export default function PairingBox({ setCategory }: any) {
  type Props = {
    setSort: React.Dispatch<React.SetStateAction<Category>>;
  };

  const categoryList = [
    '전체',
    '튀김/부침',
    '구이/오븐',
    '볶음/조림',
    '생식/회',
    '마른안주/견과',
    '과자/디저트',
    '국/찜/찌개/탕',
    '기타',
  ];
  const [showModal, setShowModal] = useState(false);
  const [pairingState, setPairingState] = useState<string | undefined>('전체');

  const onCategoryChange = (select: string) => {
    setPairingState(select);
    let tmpPairing = CategoryMatcherToEng(select);
    setCategory(tmpPairing);
    setShowModal(false);
  };

  return (
    <div className="m-2">
      <button
        onClick={() => setShowModal(!showModal)}
        className="flex items-center w-32 border border-y-gray pl-2 pr-3 py-1 text-xs rounded-md text-black"
      >
        <GoTriangleDown className="w-3 h-3 mb-[2px] mr-1 text-y-gray" />
        <span>{pairingState}</span>
      </button>
      {showModal ? (
        <div className="relative w-32 h-0">
          <ul className="bg-white border-2 w-full text-xs rounded-lg x-20 z-20 absolute right-0">
            {categoryList.map((el: string, idx: number) => (
              <li
                key={idx.toString()}
                onClick={() => {
                  onCategoryChange(el);
                }}
                className="pl-3 py-1"
              >
                {el}
              </li>
            ))}
          </ul>
          <button
            className="inset-0 fixed cursor-default"
            onClick={() => setShowModal(false)}
          ></button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
