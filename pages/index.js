import {featureOn} from "@/shared/utils";

const LandingPage = featureOn("landing_v2") ? require("./landing").default : require("./games").default;

export default LandingPage;
