//
import React from 'react'
import { colors } from '@atlaskit/theme'

import { Skeleton } from '../src'
import { Block, Gap } from '../examples-util/helpers'

export default () => (
  <div>
    <Block heading="Circle">
      <Skeleton name="xxlarge" size="xxlarge" />
      <Gap />
      <Skeleton name="xlarge" size="xlarge" />
      <Gap />
      <Skeleton name="large" size="large" />
      <Gap />
      <Skeleton name="medium" size="medium" />
      <Gap />
      <Skeleton name="small" size="small" />
      <Gap />
      <Skeleton name="xsmall" size="xsmall" />
    </Block>
    <Block heading="Square">
      <Skeleton appearance="square" size="xxlarge" />
      <Gap />
      <Skeleton appearance="square" size="xlarge" />
      <Gap />
      <Skeleton appearance="square" size="large" />
      <Gap />
      <Skeleton appearance="square" size="medium" />
      <Gap />
      <Skeleton appearance="square" size="small" />
      <Gap />
      <Skeleton appearance="square" size="xsmall" />
    </Block>
    <Block heading="Coloured via inheritance">
      <div style={{ color: colors.P500 }}>
        <Skeleton name="xxlarge" size="xxlarge" />
        <Gap />
        <Skeleton name="xlarge" size="xlarge" />
        <Gap />
        <Skeleton name="large" size="large" />
        <Gap />
        <Skeleton name="medium" size="medium" />
        <Gap />
        <Skeleton name="small" size="small" />
        <Gap />
        <Skeleton name="xsmall" size="xsmall" />
      </div>
    </Block>
    <Block heading="Coloured using props">
      <Skeleton color={colors.Y500} name="xxlarge" size="xxlarge" />
      <Gap />
      <Skeleton color={colors.G500} name="xlarge" size="xlarge" />
      <Gap />
      <Skeleton color={colors.B300} name="large" size="large" />
      <Gap />
      <Skeleton color={colors.R500} name="medium" size="medium" />
      <Gap />
      <Skeleton color={colors.N200} name="small" size="small" />
      <Gap />
      <Skeleton color={colors.T500} name="xsmall" size="xsmall" />
    </Block>
    <Block heading="With a strong weight">
      <Skeleton
        color={colors.Y500}
        name="xxlarge"
        size="xxlarge"
        weight="strong"
      />
      <Gap />
      <Skeleton
        color={colors.G500}
        name="xlarge"
        size="xlarge"
        weight="strong"
      />
      <Gap />
      <Skeleton color={colors.B300} name="large" size="large" weight="strong" />
      <Gap />
      <Skeleton
        color={colors.R500}
        name="medium"
        size="medium"
        weight="strong"
      />
      <Gap />
      <Skeleton color={colors.N200} name="small" size="small" weight="strong" />
      <Gap />
      <Skeleton
        color={colors.T500}
        name="xsmall"
        size="xsmall"
        weight="strong"
      />
    </Block>
  </div>
)
