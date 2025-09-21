const prisma = require("../../prismaClient");

const createScholarship = async (req, res) => {
  try {
    const { name, formFormat, lastDate, isActive } = req.body;

    if (!name || !formFormat) {
      return res
        .status(400)
        .json({ message: "Name and formFormat are required" });
    }

    if (typeof formFormat !== "object" || Array.isArray(formFormat)) {
      return res
        .status(400)
        .json({ message: "formFormat must be a valid object" });
    }

    const newScholarship = await prisma.scholarships.create({
      data: {
        name,
        formFormat,
        lastDate: lastDate ? new Date(lastDate) : null,
        isActive: isActive ?? true,
      },
    });

    res.status(201).json({
      msg: "ScholarShip form initiated",
      data: newScholarship,
    });
  } catch (error) {
    console.error("Error creating scholarship:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const editScholarship = async (req, res) => {
  try {
    const { id, ...updates } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Scholarship id is required" });
    }

    if (updates.lastDate) {
      updates.lastDate = new Date(updates.lastDate);
    }

    const updatedScholarship = await prisma.scholarships.update({
      where: { id: Number(id) },
      data: updates,
    });

    res.status(200).json({
      msg: "Scholarship updated successfully",
      data: updatedScholarship,
    });
  } catch (error) {
    console.error("Error updating scholarship:", error);
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Scholarship not found" });
    }
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { createScholarship, editScholarship };
