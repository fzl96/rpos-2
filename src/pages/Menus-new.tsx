/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import ListBox from '@/components/ui/listbox';
import MenuCard from '@/components/ui/menus-card';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { BsFileEarmarkImage } from 'react-icons/bs';
import { FiImage } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import { useMenu } from '../context/MenuContext';

const types = [{ name: 'Makanan' }, { name: 'Minuman' }];

function MenusNew() {
  const navigate = useNavigate();
  const { addMenu, addLoading } = useMenu();
  const [selected, setSelected] = useState(types[0]);
  const [image, setImage] = useState<any>();
  const [file] = useState<any>();

  const [item, setItem] = useState({
    name: 'Masukkan nama menu',
    price: 0,
    description: 'Masukkan deskripsi menu',
    image,
    file,
    type: selected.name,
  });

  useEffect(() => {
    document.title = 'POS - Add Menu';
  }, []);

  useEffect(() => {
    setItem({
      ...item,
      type: selected.name,
    });
  }, [selected.name]);

  const onDrop = useCallback((acceptedFiles: any) => {
    // const file = acceptedFiles[0];
    if (acceptedFiles[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setItem({ ...item, image: reader.result, file: acceptedFiles[0] });
      };
      reader.readAsDataURL(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'image/*': [] },
  });

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await addMenu(item);
      navigate('/menus');
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
      console.log(err);
    }
  };

  return (
    <motion.div
      className="grid md:grid-cols-2 grid-cols-1 min-h-full md:gap-2 gap-5 md:mt-10"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex flex-col md:gap-5 border-r md:max-w-sm">
        <div className="flex flex-col md:max-w-xs ">
          <h1 className="text-2xl font-bold">Preview Item</h1>
          <p className="text-gray-500 mb-5">
            Tampilan dibawah merupakan tampilan preview dari menu
          </p>
        </div>
        <div className="flex flex-col gap-5 ">
          <MenuCard {...item} id="a" />
          <div
            {...getRootProps()}
            className="md:max-w-xs h-40 border-2 border-dashed cursor-pointer flex flex-col items-center justify-center rounded-lg"
          >
            <input {...getInputProps()} accept="image/*" />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p className="text-center text-3xl flex flex-col justify-center items-center gap-2">
                <FiImage />
                <span className="text-sm">
                  Drag and drop file, or click to select file
                </span>
              </p>
            )}
          </div>
          {image ? (
            <p className="md:max-w-xs w-fit bg-[#f1f3f5] rounded-md text-sm py-2 px-3 flex items-center gap-2">
              <span className="text-base">
                <BsFileEarmarkImage />
              </span>
              {item.file?.name.length > 35
                ? `${item.file?.name.substr(0, 35)}...`
                : item.file?.name}
            </p>
          ) : null}
        </div>
      </div>
      <div className="">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Detail Item</h1>
          <p className="text-gray-500">Masukkan detail item.</p>
        </div>
        <div className="mt-5">
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <label htmlFor="nama" className="font-semibold">
              Nama
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="py-3 px-6 rounded-lg border-2"
              placeholder="Nama"
              required
              onChange={(e) => setItem({ ...item, name: e.target.value })}
            />
            <label htmlFor="description" className="font-semibold">
              Deskripsi
            </label>
            <input
              type="text"
              name="description"
              id="description"
              className="py-3 px-6 rounded-lg border-2"
              placeholder="Deskripsi"
              required
              onChange={(e) =>
                setItem({ ...item, description: e.target.value })
              }
            />
            <label htmlFor="price" className="font-semibold">
              Harga
            </label>
            <input
              type="number"
              name="price"
              id="price"
              className="py-3 px-6 rounded-lg border-2"
              placeholder="Harga"
              min={1}
              onChange={(e) =>
                setItem({
                  ...item,
                  price: Number.isNaN(Number(e.target.value))
                    ? 0
                    : Number(e.target.value),
                })
              }
            />
            <label htmlFor="type" className="font-semibold">
              Tipe
            </label>
            <ListBox
              selected={selected}
              setSelected={setSelected}
              types={types}
            />
            <button
              type="submit"
              disabled={addLoading}
              className="bg-[#111827]  text-white rounded-lg h-[3rem] px-6 mt-4"
            >
              {addLoading ? (
                <span className="text-center">
                  <PropagateLoader color="#fff" loading size={10} />
                </span>
              ) : (
                'Tambah menu'
              )}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
export default MenusNew;
