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
};

const SwitchView = (props : SwitchViewTypes) => {
  const {
    trigger,
    current,
    next,
  } = props;

  const enterView = (node: Element) => {
    gsap.to(node, { autoAlpha: 1, duration: 0.5 });
  };

  const leaveView = (node: Element) => {
    gsap.to(node, { autoAlpha: 0, duration: 0.5 });
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
              appear
              timeout={ 500 }
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
              appear
              timeout={ 500 }
            >
              <Next />
            </Transition>
          )
      }
    </TransitionGroup>
  );
};
export default SwitchView;
