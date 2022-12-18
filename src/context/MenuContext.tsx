/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { db, storage } from '../config/firebase';

export interface MenuProps {
  name: string;
  price: number;
  description: string;
  file: File;
  type: string;
}

export interface MenuType {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  type: string;
}

// create interface for menu context
interface MenuContextType {
  menu: MenuType[];
  loading: boolean;
  addLoading: boolean;
  addMenu: (menu: MenuProps) => void;
  deleteMenu: (id: string) => void;
}

// create menu context
const MenuContext = createContext<MenuContextType>({
  menu: [],
  loading: true,
  addLoading: false,
  addMenu: () => {},
  deleteMenu: async () => {},
});

// create type for children
type Props = {
  children: React.ReactNode;
};

export function MenuProvider({ children }: Props) {
  // create state for menu
  const [menu, setMenu] = useState<MenuType[]>([]);
  const [loading, setLoading] = useState(true);
  const [addLoading, setAddLoading] = useState(false);

  // create a function that will add menu to firebase
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const addMenu = (menu: MenuProps) => {
    // return promise
    return new Promise((resolve, reject) => {
      try {
        // set add loading to true
        setAddLoading(true);
        // create a reference to the storage location
        const storageRef = ref(storage, `menu/${menu.file.name}`);
        // upload the file to the storage location
        const uploadTask = uploadBytesResumable(storageRef, menu.file);
        // listen to the upload task
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // get the progress of the upload
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            // catch any errors
            setAddLoading(false);
            reject(error);
          },
          () => {
            // get the download url
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              // add the menu to the database
              addDoc(collection(db, 'menu'), {
                name: menu.name,
                price: menu.price,
                description: menu.description,
                image: downloadURL,
                type: menu.type,
              });
              // set add loading to false
              setAddLoading(false);
              resolve(true);
            });
          }
        );
      } catch (error) {
        // catch any errors
        setAddLoading(false);
        reject(error);
      }
    });
  };

  const deleteMenu = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'menu', id));
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'menu'), (snapshot) => {
      const menu: any = [];
      snapshot.forEach((doc) => {
        menu.push({ ...doc.data(), id: doc.id });
      });
      setMenu(menu);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <MenuContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ menu, loading, addMenu, deleteMenu, addLoading }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export const useMenu = () => useContext(MenuContext);
