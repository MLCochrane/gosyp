import React, { ComponentType } from 'react';
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

const SwitchView = (props : SwitchViewTypes) => {
  const {
    trigger,
    current,
    next,
    useAnimation = true,
  } = props;

  const enterView = (node: Element) => {
    if (useAnimation) {
      const tl = gsap.timeline();
      tl
        .set(node, { autoAlpha: 0, x: 100 }, 0)
        .to(node, { autoAlpha: 1, x: 0, duration: 0.5 }, 0);
        // .set(node, { clearProps: 'all' }, 0.5);
    }
  };

  const leaveView = (node: Element) => {
    if (useAnimation) {
      const tl = gsap.timeline();
      tl
        .set(node, { position: 'absolute', top: 0, }, 0)
        .to(node, { autoAlpha: 0, x: -100, duration: 0.5 }, 0);
    }
  };
  const Current = current;
  const Next = next;
  return (
    <TransitionGroup
      className="switch-wrapper"
    >
      {
        !trigger
          ? (
            <Transition
              unmountOnExit
              in={ !trigger }
              key="loaderKey"
              // appear
              timeout={ useAnimation ? 500 : 0 }
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
              // appear
              timeout={ useAnimation ? 500 : 0 }
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
