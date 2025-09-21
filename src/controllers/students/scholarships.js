const prisma = require("../../prismaClient");
const STATUS = require("../../enums/status")


const createStudentForm = async (req, res) => {
  try {
    const { userId, scholarshipId, data, isDraft } = req.body;

    if (!userId || !scholarshipId || !data) {
      return res
        .status(400)
        .json({ message: "userId, scholarshipId, and data are required" });
    }


    const scholarship = await prisma.scholarships.findUnique({
      where: { id: scholarshipId },
    });

    if (!scholarship) {
      return res.status(404).json({ message: "Scholarship not found" });
    }


    const formattedData = {};
    for (const key in data) {
      formattedData[key] = {
        value: data[key],
        type: scholarship.formFormat[key] || "text",
      };
    }

    const newForm = await prisma.studentFormData.create({
      data: {
        userId,
        scholarshipId,
        data: formattedData,
        isDraft: isDraft ?? true,
        schoolStatus: STATUS.PENDING,
      },
    });

    res.status(201).json({
      msg: "Student form created",
      data: newForm,
    });
  } catch (error) {
    console.error("Error creating student form:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { createStudentForm };
