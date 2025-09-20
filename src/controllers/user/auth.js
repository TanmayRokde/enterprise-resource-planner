const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { PrismaClient } = require("../../generated/prisma");

const USER_TYPE = require("../../enums/userType");

const {
  JWT_SECRET_STUDENT,
  JWT_SECRET_SCHOOL,
  JWT_SECRET_SCERT,
  JWT_EXPIRES_IN,
} = process.env;

const prisma = new PrismaClient();

const signup = async (req, res) => {
  try {
    const { name, email, password, schoolId } = req.body;

    if (!name || !email || !password || !schoolId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        schoolId,
        userType: USER_TYPE.student,
      },
    });

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET_STUDENT,
      {
        expiresIn: JWT_EXPIRES_IN,
      }
    );

    res.status(201).json({ message: "User created successfully", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const JWT_SECRETS = {
      [USER_TYPE.student]: JWT_SECRET_STUDENT,
      [USER_TYPE.school]: JWT_SECRET_SCHOOL,
      [USER_TYPE.scert]: JWT_SECRET_SCERT,
    };
    
    const USER_JWT_SECRET = JWT_SECRETS[user.userType];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      USER_JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      userName: user.name,
      userEmail: user.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signup,
  login,
};
