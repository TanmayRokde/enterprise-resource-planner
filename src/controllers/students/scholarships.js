const prisma = require("../../prismaClient");
const STATUS = require("../../enums/status");

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

    // Handle unique constraint violation (user already submitted form for this scholarship)
    if (
      error.code === "P2002" &&
      error.meta?.target?.includes("userId") &&
      error.meta?.target?.includes("scholarshipId")
    ) {
      return res.status(409).json({
        message: "Form already submitted for this scholarship",
      });
    }

    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


const editStudentForm = async (req, res) => {
  try {
    const { id, data, ...updates } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Form id is required" });
    }

    const form = await prisma.studentFormData.findUnique({
      where: { id: Number(id) },
      include: { scholarship: true }, 
    });

    if (!form) {
      return res.status(404).json({ message: "Student form not found" });
    }

    let updatedData = form.data;


    if (data) {
      updatedData = { ...form.data };
      for (const key in data) {
        updatedData[key] = {
          value: data[key],
          type: form.scholarship.formFormat[key] || "text",
        };
      }
    }

    const updatedForm = await prisma.studentFormData.update({
      where: { id: Number(id) },
      data: {
        ...updates,
        data: updatedData,
      },
    });

    res.status(200).json({
      msg: "Student form updated",
      data: updatedForm,
    });
  } catch (error) {
    console.error("Error editing student form:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { createStudentForm, editStudentForm };
