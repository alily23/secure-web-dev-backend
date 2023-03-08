const recosService = require("./recommandations.service");
const recosModel = require("./recommandations.model");
const { NotFoundError } = require("../custom-errors/not-found.error");

jest.mock("./recommandation.model");

test("Should get all recommandation", async () => {
  recosModel.find.mockResolvedValue([]);
  expect(await recosService.findAll()).toEqual([]);
  expect(recosModel.find).toHaveBeenCalledTimes(1);
});

describe("Recommandation FindOne", () => {
  it("Should find a recommandation", async () => {
    const mockRecommandation = { _id: "639835cd66d2e8465807e711" };
    recosModel.findById.mockResolvedValue(mockRecommandation);
    expect(recosModel.findById).toHaveBeenCalledTimes(1);
    expect(await recosService.findOne("639835cd66d2e8465807e711")).toEqual(
        mockRecommandation
    );
  });

  it("Should throw NotFoundError", async () => {
    const mockRecommandation = null;
    recosModel.findById.mockResolvedValue(mockRecommandation);
    expect(
        async () => await recosService.findOne("639835cd66d2e8465807e711")
    ).rejects.toThrowError(NotFoundError);
    expect(recosModel.findById).toHaveBeenCalledTimes(1);
  });
});
