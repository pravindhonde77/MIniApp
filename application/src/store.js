import { createStore } from "redux";
import rootred from "./Redux/reducer/main";

const store = createStore(
     rootred 
);

export default store;