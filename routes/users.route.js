import { Router } from "express";
import { users } from "../storage/user.store.js";
import { getRandomId, getRandomToken } from "../utils/random.js";

const router = Router();

router.post("/", (req, res) => {
  const id = getRandomId();
  const name = req.body.name;

  const user = {
    id,
    name,
  };

  users.push(user);
  req.session.userId = id;
  req.session.loggedin = true;

  res.status(201).json({
    user: user,
  });
});

router.get("/status", (req, res) => {
  console.log("test");
  res.json({
    loggedin: !!req.session.loggedin,
  });
});

router.get("/:id", (req, res) => {
  const userId = req.params.id;
  const foundUser = users.find((user) => user.id === +userId);
  if (foundUser) {
    res.status(200).json({
      user: foundUser,
    });
  } else {
    res.status(404).json({
      error_message: "not found user",
    });
  }
});

router.delete("/", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(404).json({
        error_message: "failed to logout",
      });
    } else {
      res.json({
        message: "logged out successfully",
      });
    }
  });
});

export default router;
