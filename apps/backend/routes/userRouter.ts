import { Router } from "express";
import { prisma } from "@repo/store/client"; 
import { UserSchema } from "@repo/types/types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    try {
        const parsedData = UserSchema.safeParse({ email, password });
    if (!parsedData.success) {
        res.status(400).json({
            error: "Invalid input",
        });
        return;
    }

    const userInDb = await prisma.user.findUnique({
        where: { email: parsedData.data.email },
    })

    if (userInDb) {
        res.status(400).json({
            error: "User already exists",
        });
        return;
    }

    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);

    const newUser = await prisma.user.create({
        data: {
            email: parsedData.data.email,
            password: hashedPassword,
            name: parsedData.data.name || "",
        },
    });

    res.status(201).json({
        userId: newUser.id,
    })
        
    } catch (error) {
        console.log("Error during signup:", error);
        res.status(500).json({
            error: "Internal server error",
        });
        return;
        
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
   try {
     const parsedData = UserSchema.pick({ email, password }).safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({
            error: "Invalid input",
        });
        return;
    }

    const userInDb = await prisma.user.findUnique({
        where: { email: parsedData.data.email },
    });

    if (!userInDb) {
        res.status(400).json({
            error: "User not found",
        });
        return;
    }

    const isPasswordValid = await bcrypt.compare(parsedData.data.password, userInDb.password);
    if (!isPasswordValid) {
        res.status(400).json({
            error: "Invalid password",
        });
        return;
    }

    const token = jwt.sign({userId: userInDb.id}, process.env.JWT_SECRET!)

    res.status(200).json({
        token,
    });
    
   } catch (error) {
        res.status(500).json({
            error: "Internal server error",
        });
        return;
    }
})

export default router;