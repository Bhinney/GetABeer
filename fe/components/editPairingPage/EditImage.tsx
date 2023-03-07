import Image from 'next/image';
import { AiOutlinePlus, AiOutlineCloseCircle } from 'react-icons/ai';
import imageCompression from 'browser-image-compression';
import { useState } from 'react';
import Loading from '@/components/postPairingPage/Loading';
import Swal from 'sweetalert2';

export default function EditImage({
  imageData,
  setImageData,
  url,
  setUrl,
  type,
  setType,
}: any) {
  const [showModal, setShowModal] = useState(false);
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files !== null) {
      let imageFile = e.target.files[0];
      const options = {
        //옵션 설정 필요
        maxSizeMB: 4,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      if (
        imageFile.type.toLowerCase() === 'image/heic' ||
        imageFile.name.toLowerCase().includes('.heic')
      ) {
        setShowModal(true);
        const heic2any = require('heic2any');
        heic2any({ blob: imageFile, toType: 'image/jpeg', quality: 1 }).then(
          async (response: any) => {
            imageFile = response;
            try {
              const compressedFile = await imageCompression(imageFile, options);
              setImageData([...imageData, compressedFile]);
              let tmpUrl = URL.createObjectURL(compressedFile);
              setUrl([...url, tmpUrl]);
              setType([...type, 'file']);
              setShowModal(false);
            } catch (error) {
              setShowModal(false);
              Swal.fire({
                title: 'Sorry!',
                text: '지원하지 않는 형식의 파일입니다.',
                confirmButtonColor: '#F1B31C',
                confirmButtonText: '확인',
              });
            }
          }
        );
      } else {
        try {
          const compressedFile = await imageCompression(imageFile, options);
          setImageData([...imageData, compressedFile]);
          let tmpUrl = URL.createObjectURL(compressedFile);
          setUrl([...url, tmpUrl]);
          setType([...type, 'file']);
        } catch (error) {
          Swal.fire({
            title: 'Sorry!',
            text: '지원하지 않는 형식의 파일입니다.',
            confirmButtonColor: '#F1B31C',
            confirmButtonText: '확인',
          });
        }
      }
    }
  }

  // 파일 삭제
  const handleDelete = (e: React.MouseEvent<HTMLElement>, idx: number) => {
    e.preventDefault();

    const copyUrl = url.slice();
    const copyUploadUrl = imageData.slice();
    const copyType = type.slice();

    copyUrl.splice(idx, 1);
    copyUploadUrl.splice(idx, 1);
    copyType.splice(idx, 1);

    setUrl(copyUrl);
    setImageData(copyUploadUrl);
    setType(copyType);
  };

  // 썸네일 사진 선택
  const selectThumnail = (idx: number) => {
    let copyUrl = url.slice();
    let copyUploadUrl = imageData.slice();
    let copyType = type.slice();

    let selectUrl = copyUrl.splice(idx, 1);
    let selectUploadUrl = copyUploadUrl.splice(idx, 1);
    let selectType = copyType.splice(idx, 1);

    setUrl([...selectUrl, ...copyUrl]);
    setImageData([...selectUploadUrl, ...copyUploadUrl]);
    setType([...selectType, ...copyType]);
  };

  return (
    <div className="m-2">
      <div className="mt-4 mb-2 text-base font-semibold">사진</div>

      <form className="grid grid-cols-3 gap-2 h-[105px] md:h-64 sm:h-48">
        {/* first Image */}
        <div className="bg-y-cream flex justify-center items-center rounded-xl overflow-hidden relative">
          {url[0] === undefined ? (
            <>
              <label htmlFor="file">
                <AiOutlinePlus className="w-10 h-10" />
              </label>
              <input
                type="file"
                id="file"
                accept="image/*;camera"
                className="hidden"
                onChange={handleImageUpload}
              />
            </>
          ) : (
            <>
              <Image src={url[0]} alt="bg" width={500} height={500} priority />
              <span className="absolute bg-y-gold py-1 px-2 rounded-md text-xs left-1 top-1 text-white">
                대표
              </span>
              <span
                onClick={(e) => {
                  handleDelete(e, 0);
                }}
                className="absolute right-1 top-1 text-y-gold bg-y-cream rounded-full"
              >
                <AiOutlineCloseCircle className="w-6 h-6" />
              </span>
            </>
          )}
        </div>
        {/* second Image */}
        {url[0] === undefined ? (
          <div className="border-2 border-y-lightGray border-dashed flex justify-center items-center rounded-xl"></div>
        ) : (
          <div className="bg-y-cream flex justify-center items-center rounded-xl overflow-hidden relative">
            {url[1] !== undefined ? (
              <>
                <Image
                  src={url[1]}
                  alt="bg"
                  width={500}
                  height={500}
                  onClick={() => selectThumnail(1)}
                  priority
                />
                <span
                  onClick={(e) => {
                    handleDelete(e, 1);
                  }}
                  className="absolute right-1 top-1 text-y-gold bg-y-cream rounded-full"
                >
                  <AiOutlineCloseCircle className="w-6 h-6" />
                </span>
              </>
            ) : (
              <>
                <label htmlFor="file">
                  <AiOutlinePlus className="w-10 h-10" />
                </label>
                <input
                  type="file"
                  id="file"
                  accept="image/*;camera"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </>
            )}
          </div>
        )}

        {/* third Image */}
        {url[1] === undefined ? (
          <div className="border-2 border-y-lightGray border-dashed flex justify-center items-center rounded-xl"></div>
        ) : (
          <div className="bg-y-cream flex justify-center items-center rounded-xl overflow-hidden relative">
            {url[2] !== undefined ? (
              <>
                <Image
                  src={url[2]}
                  alt="bg"
                  width={500}
                  height={500}
                  onClick={() => selectThumnail(2)}
                  priority
                />
                <span
                  onClick={(e) => {
                    handleDelete(e, 2);
                  }}
                  className="absolute right-1 top-1 text-y-gold bg-y-cream rounded-full"
                >
                  <AiOutlineCloseCircle className="w-6 h-6" />
                </span>
              </>
            ) : (
              <>
                <label htmlFor="file">
                  <AiOutlinePlus className="w-10 h-10" />
                </label>
                <input
                  type="file"
                  id="file"
                  accept="image/*;camera"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </>
            )}
          </div>
        )}
      </form>
      {showModal ? (
        <div className="inset-0 flex justify-center items-center fixed z-10 bg-[rgb(0,0,0,0.3)]">
          <div className="w-fit m-2 p-5 z-[11] bg-white text-base lg:text-lg text-y-gold rounded-lg">
            <Loading />
            <div className="mt-5 text-center text-y-brown">
              <div>heic 파일을 변환 중입니다.</div>
              <div>잠시만 기다려 주세요</div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
