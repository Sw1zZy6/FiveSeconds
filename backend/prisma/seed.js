import prisma from "../prismaClient.js";
import bcrypt from "bcrypt";
import env from "dotenv";
env.config();

async function seed() {
  try {
    const hashedPassword = await bcrypt.hash("admin", 3);

    const user = await prisma.user.create({
      data: {
        name: "admin",
        username: "admin1",
        email: "admin@example.com",
        password: hashedPassword,
        roles: ["ADMIN"],
      },
    });

    const quiz = await prisma.quiz.create({
      data: {
        title: "General Knowledge Quiz",
        questions: {
          create: [
            {
              title: "What is the capital of France?",
              options: {
                create: [
                  { text: "Paris", isCorrect: true },
                  { text: "London" },
                  { text: "Rome" },
                  { text: "Berlin" },
                ],
              },
            },
          ],
        },
      },
    });

    await prisma.score.create({
      data: {
        userId: user.id,
        quizId: quiz.id,
        quizScore: 80,
      },
    });

    console.log("✅ Seed data created successfully!");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
