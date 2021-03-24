import React, { useState, useLayoutEffect, useContext, useMemo } from 'react';
import useMeasure from 'react-use-measure';
import { LocalContext } from '../SideBySide/LocalContext';
import styles from './SideBySideItem.module.scss';

interface ISideBySideItemProps {
  [key: string]: any;

}

function SideBySideItem(props: ISideBySideItemProps) {
  const { top, maxHeight, offsetTop, clientHeight, setMax,
    totalDist,
    dist,
  } = useContext(LocalContext);
  const randomId = useRandomId();

  const [ref, bounds] = useMeasure();

  useLayoutEffect(() => {
    setMax((state: any) => {
      return {
        ...state,
        [randomId]: bounds.height,
      }
    })
    return () => {
      setMax((state: any) => {
        let next = { ...state };
        delete next[randomId];
        return next;
      })
    }
  }, [randomId, bounds.height]);

  let ty = (maxHeight - bounds.height);

  const style: any = useMemo(() => {

    if (top < offsetTop && ty > 0) {
      // if ()

      if (bounds.height < clientHeight - offsetTop) {
        return {
          // background: 'orange',
          // position: 'sticky',
          top: offsetTop,
        }

      }

      const gap = maxHeight - bounds.height;
      // if (offsetTop - top > maxHeight - bounds.height) {
      const moving = gap * dist / totalDist;
      if (dist > gap) {
        return {
          // background: 'lightyellow',
          top: offsetTop,

          // background: 'yellow',
          // transition: 'transform 0.01s linear',
          transform: `translateY(${moving - gap}px)`
        }

      }
      return {
        // background: 'yellow',
        top: offsetTop,
        transform: `translateY(${moving - dist}px)`
      }
    }


    return {};

  }, [top, bounds.height, clientHeight, maxHeight, offsetTop,
    // 총 이동 범위 : 전체 높이 - 클라이언트 높이 + 오프셋 탑
    // totalDist: maxHeight - clientHeight + offsetTop,
    totalDist,
    dist,
    // 현재 이동 거리
  ]);


  return (
    <div className={styles.root} ref={ref} style={style}>
      {props.children}
    </div>
  );
}

export default SideBySideItem;

const random = () => Math.random().toString(36).substr(-6);

function useRandomId() {
  const [randomId] = useState(random);
  return randomId;
}
