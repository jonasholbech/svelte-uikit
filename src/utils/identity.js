import netlifyIdentity from "netlify-identity-widget";
import {
  firstVisit,
  user,
  isLoggedIn,
  role,
  identityChecksDone,
} from "../stores/user";
export const setupIdentity = () => {
  netlifyIdentity.on("init", async (user) => {
    console.log("init ran, doing nothing", user);
  });
  netlifyIdentity.on("login", async (authUser) => {
    console.log("login ran", authUser);
    identityChecksDone.set(true);
    user.set(authUser);
    isLoggedIn.set(true);
    const resp = await getUser(authUser);
    if (
      authUser.email === "jofh@kea.dk" ||
      authUser.email === "jh@jonasholbech.dk"
    ) {
      role.set("admin");
    } else if (authUser.email.includes("@kea.dk")) {
      role.set("moderator");
    } else {
      // if (authUser.email.includes("@stud.kea.dk")){
      role.set("student");
    }

    firstVisit.set(resp.firstVisit);
    netlifyIdentity.refresh().then((jwt) => {});
  });
  netlifyIdentity.on("logout", async () => {
    console.log("logout ran");
    identityChecksDone.set(true);
    user.set(null);
    isLoggedIn.set(false);
  });
  netlifyIdentity.on("error", (err) => console.error("Error", err));
  netlifyIdentity.on("open", () => console.log("Widget opened"));
  netlifyIdentity.on("close", () => console.log("Widget closed"));
  //apparently, register eventlisteners before init
  netlifyIdentity.init();
  netlifyIdentity.close(); //Hack, ved ikke hvorfor den pludseligt åbner sig
  console.log("init");
};
async function getUser(authUser) {
  //console.log(authUser);
  const resp = await fetch("/api/getUser", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authUser.token.access_token}`,
    },
  });
  return await resp.json();
}
export const canAccess = (role, target) => {
  const order = ["visitor", "student", "moderator", "admin"];
  const roleIndex = order.indexOf(role);
  const targetIndex = order.indexOf(target);
  return roleIndex >= targetIndex;
};
