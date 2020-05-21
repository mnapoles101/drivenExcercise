const router = require("express").Router();
let Checker = require("../models/checker");

router.route("/").get((request, response) => {
  Checker.find()
    .then((checker) => response.json(checker))
    .catch((error) => response.status(400).json("Error:" + error));
});

router.route("/add").post((request, response) => {
  const input = Number(request.body.input);

  const newCheckerBoard = new Checker({
    input,
  });

  router.route("/update/:id").post((request, response) => {
    Checker.findById(request.params.id)
      .then((checker) => {
        console.log("checker", checker);
        checker.input = Number(request.body.input);

        checker
          .save()
          .then(() => response.json("Checker Board updated!"))
          .catch((error) => response.status(400).json(`Error: ${error}`));
      })
      .catch((error) => response.status(500).json(`Error: ${error}`));
  });

  newCheckerBoard
    .save()
    .then(() => response.json("input added!"))
    .catch((error) => response.status(400).json(`Error ${error}`));
});

module.exports = router;
