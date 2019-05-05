// @flow

// TODO: Figure out a way for this to be DRYer
export type PositionTypeBase = 'bottom' | 'left' | 'right' | 'top';
export type PositionType = 'bottom' | 'left' | 'right' | 'top' | 'mouse';
export type FakeMouseElement = {
  getBoundingClientRect: () => {
    top: number,
    left: number,
    bottom: number,
    right: number,
    width: 0,
    height: 0,
  },
  clientWidth: 0,
  clientHeight: 0,
};
