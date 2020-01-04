import {useEffect, useState} from 'react';
import {windowExist} from '@/index';

const useFocusTitle = (init: string, lostFocusTitle: string, factor?: any) => {
  const [title, setTitle] = useState<string>(init);

  useEffect(() => {
    if (windowExist) {
      setTitle(`${init} - vnhomestay.vn`);
      document.title = title;
    }
  }, [factor, title]);

  useEffect(() => {
    if (windowExist) {
      window.onblur  = () => {
        document.title = lostFocusTitle;
      };
      window.onfocus = () => {
        document.title = title;
      };
    }

    return () => {
      if (windowExist) {
        window.onblur  = () => false;
        window.onfocus = () => false;
        document.title = title;
      }
    };
  }, [factor, title]);

};

export default useFocusTitle;
