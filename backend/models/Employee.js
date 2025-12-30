import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Employee = sequelize.define("Employee", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  department: { type: DataTypes.STRING },
  salary: { type: DataTypes.FLOAT },
  role: { type: DataTypes.STRING, defaultValue: "Employee" }
});

export default Employee;