import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from "./utils/middleware";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update";

const router = Router();

// Product routes
router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
router.put(
  "/product/:id",
  [body("name").isString()],
  handleInputErrors,
  updateProduct
);
router.post(
  "/product",
  [body("name").isString()],
  handleInputErrors,
  createProduct
);
router.delete("/product/:id", deleteProduct);

// Update routes
router.get("/update", getUpdates);
router.get("/update/:id", getOneUpdate);
router.put(
  "/update/:id",
  [
    body("body").optional(),
    body("title").optional(),
    body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
    body("version").optional(),
  ],
  handleInputErrors,
  updateUpdate
);
router.post(
  "/update",
  [
    body("title").exists().isString(),
    body("body").exists().isString(),
    body("productId").exists().isString(),
  ],
  handleInputErrors,
  createUpdate
);
router.delete("/update/:id", deleteUpdate);

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

// error handler for subroutes
router.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "Unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "Invalid input" });
  } else {
    res.status(500).json({ message: "Ooops something went wrong" });
  }
});
export default router;
