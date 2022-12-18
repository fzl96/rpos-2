import { FiImage } from 'react-icons/fi';
import BasicMenu from '../menu';

interface MenuCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

function MenuCard({ id, name, price, description, image }: MenuCardProps) {
  return (
    <div className="md:max-w-xs bg-white rounded-lg border border-gray-200 shadow-md ">
      {image ? (
        <img
          className="rounded-t-lg h-[10rem] w-full object-cover"
          src={image}
          alt={name}
        />
      ) : (
        <div className="w-full h-[10rem] flex flex-col items-center justify-center text-5xl">
          <FiImage />
          {/* <span className="text-sm">No image</span> */}
        </div>
      )}
      <div className="p-5">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
          {name}
        </h5>
        <p className="mb-3 font-normal text-sm text-gray-700">{description}</p>
        <p className="flex justify-between items-center">
          <span className="font-bold text-lg text-gray-900">
            {price.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            })}
          </span>
          <BasicMenu id={id} />
        </p>
      </div>
    </div>
  );
}
export default MenuCard;
