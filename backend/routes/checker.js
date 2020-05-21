const router = require("express").Router();
let Checker = require("../models/checker");

router.route("/add").post((req, res) => {
  const input = Number(req.body.input);

  const newCheckerBoard = new Checker({
    input,
  });

  newCheckerBoard
    .save()
    .then(() => res.json("input added!"))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

router.route("/update/:id").post((req, res) => {
  Checker.findById(req.params.id)
    .then((checker) => {
      console.log("checker", checker);
      checker.input = Number(req.body.input);

      checker
        .save()
        .then(() => res.json("Checker Board updated!"))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(500).json(`Error: ${err}`));
});

router.route("/").get((req, res) => {
  Checker.find()
    .then((checker) => res.json(checker))
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
