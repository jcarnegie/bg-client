import Router from "next/router";
import {USER_SHOW_REGISTER_WORKFLOW} from "@/shared/constants/actions";

export function userLoginRouteGuard({store, res}) {
  const user = store.getState().user;

  if (!user.data) {
    store.dispatch({type: USER_SHOW_REGISTER_WORKFLOW, payload: true});
    if (res) {
      res.redirect("/");
    } else {
      Router.push("/");
    }
  }
}
