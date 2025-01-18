import SpringBase from "./springbase/springbase";

export const springbase = new SpringBase(process.env.backend_api_url || "http://localhost:8080");