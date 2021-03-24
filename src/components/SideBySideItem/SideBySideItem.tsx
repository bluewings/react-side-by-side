import React, { useState, useLayoutEffect, useContext, useMemo } from 'react';
import useMeasure from 'react-use-measure';
import { LocalContext } from '../SideBySide/LocalContext';
import styles from './SideBySideItem.module.scss';

interface ISideBySideItemProps {
  /**
   * Prop Description
   */
  // message?: string;
  [key: string]: any;

}

/**
 * Component Description
 */
function SideBySideItem(props: ISideBySideItemProps) {
  const { top, maxHeight, offsetTop, clientHeight, setMax } = useContext(LocalContext);
  const randomId = useRandomId();
  // const ref = useRef<HTMLDivElement>(null);
  // useLayoutEffect(() => {

  //   // if (document.)
  //   if (ref.current) {
  //     // ref.current.
  //   }

  // }, []);
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


  const style: any = useMemo(() => {
    let ty = (maxHeight - bounds.height);
    if (top < offsetTop && ty > 0) {

      if (bounds.height < clientHeight - offsetTop) {
        return {
          position: 'sticky',
          top: offsetTop,
        }

      }


      let percent = Math.min(((top - offsetTop) * -1) / (maxHeight - (clientHeight - offsetTop)), 1);

      //  * top / (maxHeight - clientHeight)
      // if (ty ==

      return {
        // background: 'yellow',
        // transition: 'transform 0.01s linear',
        transform: `translateY(${Math.min(ty) * percent}px)`
      }

    }
    return {};

  }, [top, bounds.height, clientHeight, maxHeight, offsetTop]);


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
