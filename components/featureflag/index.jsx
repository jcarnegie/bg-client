import React from "react";
import {featureOn} from "@/shared/utils";

const FeatureFlag = ({flag, children}) => {
  return featureOn(flag) ? (<>{children}</>) : null;
};

export default FeatureFlag;
