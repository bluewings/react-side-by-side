import React, { useLayoutEffect, useMemo, useState, useRef } from 'react';
import { LocalContext } from './LocalContext';
import styles from './SideBySide.module.scss';
import Item from '../SideBySideItem';

interface ISideBySideProps {
  children?: any;
  offsetTop?: number;
}

function SideBySide({ offsetTop = 0, children }: ISideBySideProps) {
  const [max, setMax] = useState<any>({});

  const [top, setTop] = useState(0);
  const maxHeight = useMemo(() => {
    return Math.max(...(Object.values(max) as number[]));
  }, [max]);

  const totalDist = maxHeight - document.documentElement.clientHeight + offsetTop;
  const dist = Math.min(Math.max(offsetTop - top, 0), totalDist);
  const localContext = useMemo(() => {
    const clientHeight = document.documentElement.clientHeight;
    return {
      top,
      clientHeight,
      maxHeight,
      setMax,
      offsetTop,
      // 총 이동 범위 : 전체 높이 - 클라이언트 높이 + 오프셋 탑
      // totalDist: maxHeight - clientHeight + offsetTop,
      totalDist,
      dist,
      // 현재 이동 거리
      // totalDist: maxHeight - clientHeight + offsetTop,
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
      <div className={styles.root} ref={ref}>
        {children}
      </div>
    </LocalContext.Provider>
  );
}

export default SideBySide;

SideBySide.Item = Item;
