import Api from "./Api";

export default {
  register(form) {
    return Api().post("/auth/register", form);
  },
  login(form) {
    return Api().post("/auth/login", form);
  },
  auth() {
    return Api().get("/profile");
  },
/*
  resetPassword(id, pass) {
    return Api().patch("/users/" + id, pass);
  },
  addWidget(id, widget) {
    return Api().post("/widgets/" + id, { widget });
  } */

};