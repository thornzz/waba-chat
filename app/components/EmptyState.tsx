import Image from "next/image";
const EmptyState = () => {
  return (
    <div className="px-4 py-10 sm:px-6 lg:ps-8 h-full flex justify-center items-center bg-gray-100">
      <div className="text-center items-center flex flex-col">
        <Image
          alt="Logo"
          height="75"
          width="75"
          className="mx-auto w-auto"
          src="/images/logo.png"
        />
        <h3 className="mt-2 text-2xl font-semibold text-gray-900">
          K2M Whatsapp Business Entegrasyonu
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;
