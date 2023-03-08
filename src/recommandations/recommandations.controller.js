// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require("express").Router();
const recommandationService = require("./recommandations.service");
const authorizationMiddleware = require("../authorization/authorization.middleware");
const httpErrorHelper = require("../custom-errors/http-error.helper");

async function controllerCreateOneRecommmandation(req, res) {
  const newRecommandation = await recommandationService.createOne(req.body);
  return res.status(201).send(newRecommandation);
}

router.post(
    "/",
    authorizationMiddleware.canAccess(["admin"]),
    controllerCreateOneRecommmandation
);

async function controllerGetAllRecommandations(req, res) {
  const limit = req.query.limit || 20;
  const offset = req.query.offset || 0;
  const recos = await recommandationService.findAll(limit, offset);
  return res.status(200).send(recos);
}

router.get("/", controllerGetAllRecommandations);

async function controllerGetOneRecommandation(req, res, next) {
  try {
    const reco = await recommandationService.findOne(req.params.id);
    return res.status(200).send(reco);
  } catch (err) {
    return httpErrorHelper(err, req, res, next);
  }
}

router.get("/:id", controllerGetOneRecommandation);

async function controllerUpdateOneRecommandation(req, res, next) {
  try {
    const reco = await recommandationService.updateOne(req.params.id, req.body);
    return res.status(200).send(reco);
  } catch (err) {
    return httpErrorHelper(err, req, res, next);
  }
}

router.patch(
    "/:id",
    authorizationMiddleware.canAccess(["admin"]),
    controllerUpdateOneRecommandation
);

async function controllerDeleteOneReco(req, res, next) {
  try {
    const reco = await recom.deleteOne(req.params.id);
    return res.status(200).send(reco);
  } catch (err) {
    return httpErrorHelper(err, req, res, next);
  }
}

router.delete(
    "/:id",
    authorizationMiddleware.canAccess(["admin"]),
    controllerDeleteOneReco
);

module.exports = router;
