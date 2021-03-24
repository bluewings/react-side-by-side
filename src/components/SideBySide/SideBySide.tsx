import React, { useLayoutEffect, useMemo, useState, useRef } from 'react';
import { LocalContext } from './LocalContext';
import styles from './SideBySide.module.scss';
import Item from '../SideBySideItem';

interface ISideBySideProps {
  /**
   * Prop Description
   */
  // message?: string;
  // [key: string]: any;
  children?: any;
  offsetTop?: number;
}

/**
 * Component Description
 */
function SideBySide({ offsetTop = 0, children }: ISideBySideProps) {
  const [max, setMax] = useState<any>({});

  // const [ref, bounds] = useMeasure();

  const [top, setTop] = useState(0);
  const maxHeight = useMemo(() => {
    return Math.max(...(Object.values(max) as number[]));
  }, [max]);
  const localContext = useMemo(() => {
    return {
      top,
      clientHeight: document.documentElement.clientHeight,
      maxHeight,
      setMax,
      offsetTop
    };
  }, [top, maxHeight, setMax, offsetTop]);


  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const handleScroll = () => {

      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setTop(() => rect.top);
      }
    }
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);
  return (
    <LocalContext.Provider value={localContext}>
      {/* <pre>{JSON.stringify(bounds, null, 2)}</pre> */}
      <div className={styles.root} ref={ref}>
        {/* <h1>SideBySide</h1> */}
        {children}
      </div>
    </LocalContext.Provider>
  );
}

export default SideBySide;

SideBySide.Item = Item;
