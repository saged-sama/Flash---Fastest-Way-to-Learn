import SpringBase from "./springbase/springbase";

export const springbase = new SpringBase(process.env.PUBLIC_API_ROOT as string);