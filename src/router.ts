import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from "./utils/middleware";

const router = Router();

// Product routes
router.get("/product", (req, res, next) => {
  res.status(200).json({ message: "Success" });
});
router.get("/product/:id", () => {});
router.put(
  "/product/:id",
  [body("name").isString()],
  handleInputErrors,
  (req, res, next) => {}
);
router.post(
  "/product",
  [body("name").isString()],
  handleInputErrors,
  (req, res, next) => {}
);
router.delete("/product/:id", () => {});

// Update routes
router.get("/update", () => {});
router.get("/update/:id", () => {});
router.put(
  "/update/:id",
  [
    body("body").optional(),
    body("title").optional(),
    body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
    body("version").optional(),
  ],
  handleInputErrors,
  (req, res, next) => {}
);
router.post(
  "/update",
  [body("title").exists().isString(), body("body").exists().isString()],
  handleInputErrors,
  (req, res, next) => {}
);
router.delete("/update/:id", () => {});

// Updatepoint routes
router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.put(
  "/updatepoint/:id",
  [
    body("name").optional().isString(),
    body("description").optional().isString(),
  ],
  handleInputErrors,
  (req, res, next) => {}
);
router.post(
  "/updatepoint",
  [
    body("name").isString(),
    body("description").isString(),
    body("updateId").exists().isString(),
  ],
  handleInputErrors,
  (req, res, next) => {}
);
router.delete("/updatepoint/:id", () => {});

export default router;
