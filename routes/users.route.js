import { Router } from "express";
import { users } from "../storage/user.store.js";
import { getRandomId, getRandomToken } from "../utils/random.js";

const router = Router();

router.post("/", (req, res) => {
  const id = getRandomId();
  const name = req.body.name;
  const token = getRandomToken();

  const user = {
    id,
    name,
    token,
  };

  users.push(user);

  res.status(201).json({
    user: user,
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

export default router;
