import React, { ComponentType } from 'react';
import {
  makeStyles,
} from '@material-ui/core';
import {
  Transition,
  TransitionGroup,
} from 'react-transition-group';
import {
  gsap,
  CSSPlugin,
} from 'gsap';

gsap.registerPlugin(CSSPlugin);

type SwitchViewTypes = {
  trigger: boolean,
  current: ComponentType,
  next: ComponentType,
  useAnimation?: boolean,
};

const useStyles = makeStyles(() => ({
  switchWrapper: {
    flexGrow: 1,
    height: '100%',
    overflow: 'hidden',
  },
}));

const SwitchView = ({
  trigger,
  current,
  next,
  useAnimation = true,
}: SwitchViewTypes): JSX.Element => {
  const classes = useStyles();
  const enterView = (node: Element) => {
    if (useAnimation) {
      const tl = gsap.timeline();
      tl
        .set(node, { autoAlpha: 0, y: 100 }, 0)
        .to(node, { autoAlpha: 1, y: 0, duration: 0.3 }, 0);
    }
  };

  const leaveView = (node: Element) => {
    if (useAnimation) {
      const tl = gsap.timeline();
      tl
        .set(node, { position: 'absolute', width: '100%', top: 0 }, 0)
        .to(node, { autoAlpha: 0, y: -100, duration: 0.3 }, 0);
    }
  };
  const Current = current;
  const Next = next;
  return (
    <TransitionGroup
      className={ classes.switchWrapper }
    >
      {
        !trigger
          ? (
            <Transition
              unmountOnExit
              in={ !trigger }
              key="loaderKey"
              timeout={ useAnimation ? 300 : 0 }
              onEnter={ (node: Element) => enterView(node) }
              onExit={ (node: Element) => leaveView(node) }
            >
              <Current />
            </Transition>
          )
          : (
            <Transition
              unmountOnExit
              in={ trigger }
              key="childKey"
              timeout={ useAnimation ? 300 : 0 }
              onEnter={ (node: Element) => enterView(node) }
              onExit={ (node: Element) => leaveView(node) }
            >
              <Next />
            </Transition>
          )
      }
    </TransitionGroup>
  );
};
export default SwitchView;
SwitchView.defaultProps = {
  useAnimation: true,
};
