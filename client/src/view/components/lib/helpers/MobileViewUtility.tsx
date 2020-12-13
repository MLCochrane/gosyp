import React, {
  useEffect,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { MobileCheck } from './windowEvents';
import {
  setNeedsResize,
  setShouldResize,
  mobileDetect,
} from 'store/actions/globalActions';

const MobileViewUtility = () => {
  const [smallScreen] = MobileCheck();
  const { needsResize, isMobile } = useSelector((state: any) => state.global);

  const dispatch = useDispatch();
  /**
   * On load we'll check if mobile and run an initial resizing if so.
   */
  useEffect(() => {
    if (smallScreen) {
      dispatch(mobileDetect(true));
      dispatch(setNeedsResize());
    } else {
      dispatch(mobileDetect(false));
    }
  }, [dispatch, smallScreen]);

  /**
   * This should check to make sure we're only resizing
   * content when the page has actually changed.
   *
   * There can be timing discrepencies between when the
   * resizing is called and when the actual browser window
   * has changed. For example, setting the new height as
   * soon as a form has focus will set the height BEFORE
   * the mobile keyboard is active.
   *
   * Definitely open to doing this a different way, but don't
   * think there's any great way to determine when mobile
   * keyboards are open or not..
   */
  useEffect(() => {
    if (needsResize && isMobile) {

      console.log('Howdy');
      let iterationCount = 0;
      let prevHeight = window.innerHeight;
      let heightCheckInterval: NodeJS.Timeout;

      heightCheckInterval = setInterval(() => {
        const currentHeight = window.innerHeight;
        // if we've run this 50 times then stop
        if (iterationCount >= 50) clearInterval(heightCheckInterval);

        // If change detected than resize with our new height
        if (currentHeight !== prevHeight) {
          console.log('will set shouldresize')
          dispatch(setShouldResize());
          clearInterval(heightCheckInterval);
        } else {
          // Can just increment our counter and keep prevHeight as is
          iterationCount++;
        }
      }, 10);}
  }, [needsResize, isMobile, dispatch]);
  return (
    <>
    </>
  );
}
export default MobileViewUtility;
