// backend/routes/employee.js
import express from "express";
import Employee from "../models/Employee.js"; // Sequelize model
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/", async (req,res) => res.json(await Employee.findAll()));
router.post("/", async (req,res) => res.json(await Employee.create(req.body)));
router.put("/:id", async (req,res) => {
  const emp = await Employee.findByPk(req.params.id);
  if(emp) res.json(await emp.update(req.body));
  else res.status(404).json({error: "Employee not found"});
});
router.delete("/:id", async (req,res) => {
  const emp = await Employee.findByPk(req.params.id);
  if(emp) { await emp.destroy(); res.json({message:"Deleted"}); }
  else res.status(404).json({error:"Employee not found"});
});

export default router;
