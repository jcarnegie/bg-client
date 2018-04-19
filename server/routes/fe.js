import {renderHTML} from "../utils/render";
import {renderAppToString} from "../utils/render.app";
import HTML from "../../client/HTML";

// there is no way to determinate domain on server side rendering
// i.e i can't pass request.headers.host to window.document.location.host
// so i'm switching to client site rendering until we have proper staging

// TODO switch back to 'server' once we have proper staging
const rendering = "client";

export default function renderFE(request, response) {
  if (rendering === "server") {
    renderAppToString(request, response);
  } else { // client
    response.status(200).send(renderHTML("", {
      getState: () => ({})
    }, HTML));
  }
}
