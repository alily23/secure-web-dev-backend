// This file holds the Business-Logic layer, interacting with Data Layer

const Recommandation = require("./recommandations.model");
const { NotFoundError } = require("../custom-errors/not-found.error");
const { ValidationError } = require("../custom-errors/validation.error");

async function createOne(recommandationData) {
  const recommandation = new Recommandation(recommandationData);
  return recommandation.save();
}

/**
 * Find multiple recommandation with custom limit and offset (pagination)
 * @param limit
 * @param offset
 * @returns {Query<Array<HydratedDocument<unknown, {}, {}>>, Document<unknown, any, unknown> & unknown extends {_id?: infer U} ? IfAny<U, {_id: Types.ObjectId}, Required<{_id: U}>> : {_id: Types.ObjectId} & {}, {}, unknown> & {}}
 */
function findAll(limit = 20, offset = 0) {
  return Recommandation.find().limit(limit).skip(offset);
}

async function findOne(id) {
  let recommandation;
  try {
    recommandation = await Recommandation.findById(id);
  } catch (e) {
    console.error(e);
    throw new ValidationError(e.message);
  }
  if (!recommandation) {
    throw new NotFoundError("Recommandation not found");
  }
  return recommandation;
}

async function updateOne(id, recommandationData) {
  const recommandation = await findOne(id);
  for (const recommandationElementKey in recommandationData) {
    if (
        recommandationElementKey[0] !== "_" &&
        recommandationData.hasOwnProperty(recommandationElementKey)
    ) {
      recommandation[recommandationElementKey] = recommandationDataData[recommandationElementKey];
    }
  }
  await recommandation.save();
  return await findOne(id);
}

async function deleteOne(id) {
  const recommandation = await findOne(id);
  return recommandation.remove();
}

module.exports = { createOne, findAll, findOne, updateOne, deleteOne };
