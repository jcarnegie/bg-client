import React from 'react'; /* eslint-disable-line no-unused-vars */
import { featureOn } from '@/shared/utils';

const FeatureFlag = ({ flag, off = false, children }) => {
  const matchesFlag = featureOn(flag);
  return (matchesFlag && !off) ? (<>{children}</>) : null;
};

export default FeatureFlag;
