const router = require("express").Router();

const departmentController = require("../Controllers/departmentController");

router.get("/", departmentController.AllDepartmentsInfo);
router.post("/:id", departmentController.createDepartment);
router.put("/:id", departmentController.departmentUpdate);
router.delete("/:id", departmentController.deleteDepartment);

module.exports = router;
