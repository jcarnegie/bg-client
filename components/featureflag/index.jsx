import React, { PureComponent, Component } from "react";
import { featureOn, featureRouteGuard } from "@/shared/utils";

const FeatureFlag = ({flag, children}) => {
      return featureOn(flag) ? (<>{children}</>) : null;
}

export default FeatureFlag; 