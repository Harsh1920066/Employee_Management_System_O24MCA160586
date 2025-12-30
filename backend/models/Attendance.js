import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Employee from "./Employee.js";

const Attendance = sequelize.define("Attendance", {
  date: { type: DataTypes.DATEONLY, allowNull: false },
  checkIn: { type: DataTypes.TIME },
  checkOut: { type: DataTypes.TIME },
});

Employee.hasMany(Attendance);
Attendance.belongsTo(Employee);

export default Attendance;
