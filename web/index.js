// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import path from "path";

import cors from "cors";
import mongoose from "mongoose";
import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import PrivacyWebhookHandlers from "./privacy.js";
import TrustBadge from "./model/badge.model.js";

mongoose
  .connect(
    "mongodb+srv://nevin:cszzvIA7IPwByC1a@cluster0.nbb5xhp.mongodb.net/badges?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: PrivacyWebhookHandlers })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());
app.use(express.static("public"));

app.use(cors());

app.get("/api/products/count", async (_req, res) => {
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});

app.get("/badge/get", async (_req, res) => {
  try {
    const allBadges = await TrustBadge.find();

    if (allBadges) {
      res.status(200).json({
        message: "success",
        badges: allBadges,
      });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post("/api/badge/create", async (req, res) => {
  try {
    const newProduct = {
      store: req.body.badge.store,
      name: req.body.badge.name,
      url: req.body.badge.url,
    };

    console.log("New product: ", req.body.badge);

    const newBadge = await TrustBadge.create(newProduct);

    if (newBadge) {
      res.status(201).json({
        status: "success",
        data: newBadge,
      });

      console.log("Successfully created new badge");
    } else {
      res.status(500).send({ error: "Something went wrong" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post("/badge/update", async (req, res) => {
  try {
    const doc = await TrustBadge.findOneAndUpdate(
      { store: req.body.store },
      {
        store: req.body.store,
        name: req.body.name,
        url: req.body.url,
      }
    );

    if (doc) {
      res.status(200).json({
        status: true,
        data: doc,
      });
    }
  } catch (error) {
    console.log("Error from updateUser" + error);
  }
});

app.delete("/badge/delete", async (req, res) => {
  try {
    const doc = await TrustBadge.findOneAndDelete({ store: req.body.store });

    if (doc) {
      res.status(200).json({
        status: true,
        data: doc,
      });
    }
  } catch (error) {
    console.log("Error from deleteUser" + error);
  }
});

app.post("/getuser", async (req, res) => {
  try {
    const doc = await TrustBadge.find({ store: req.body.store });

    if (doc) {
      res.status(200).json({
        status: true,
        data: doc,
      });
    }
  } catch (error) {
    console.log("Error from getUser" + error.message);
  }
});

app.get("/api/products/create", async (_req, res) => {
  let status = 200;
  let error = null;

  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(express.static(path.join(__dirname, "public")));

app.get("/showBadge", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/build/index.html"));
});

app.use("/*", async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

console.log("Port is " + PORT);

app.listen(PORT);
