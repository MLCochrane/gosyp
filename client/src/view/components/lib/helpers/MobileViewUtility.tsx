import React, {
  useEffect,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { MobileCheck, ResizeHandler } from './windowEvents';
import {
  setNeedsResize,
  setShouldResize,
  mobileDetect,
} from 'store/actions/globalActions';

const MobileViewUtility = () => {
  const [smallScreen] = MobileCheck();
  const [isResizing] = ResizeHandler();
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
   * The resize event should be called on mobile when
   * the keyboard opens/closes and changes the window
   * size, so we don't need any additional logic for
   * that.
   */
  useEffect(() => {
    if (needsResize && isMobile && isResizing) {
      setShouldResize();
    }
  }, [needsResize, isMobile, isResizing, dispatch]);
  return (
    <>
    </>
  );
}
export default MobileViewUtility;
