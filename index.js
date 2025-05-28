import { Depress, Router } from "./depress.js";
import carRouter from "./car.router.js";

const app = new Depress();

app.use("/cars", carRouter);

app.get("/home", (req, res) => {
  res.end("You reached GET /home");
});

app.post("/test", (req, res) => {
  res.end("You reached POST /test");
});

app.listen(8000, () => {
  console.log("server is running");
  console.log(app.ROUTES_POOL);
});










