import { Router } from "./depress.js";

const router = new Router();

router.get("/1", (req, res) => {
  res.end("You reached GET /cars");
});

export default router;
