import { Router } from "express";
import { prisma } from "@repo/store/client";
import { authMiddleware } from "../middleware";
import { JobSchema } from "@repo/types/types";

const router = Router();

router.get("/", authMiddleware, async (req, res) => {
    try {
        const jobs = await prisma.jobPosting.findMany();

        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({
            error: "Internal server error",
        });
        return;
    }
})

router.post("/", authMiddleware, async (req, res) => {
    const job: JobSchema = req.body;

    const parsedData = JobSchema.safeParse(job);
    if (!parsedData.success) {
        res.status(400).json({
            error: "Invalid input",
        });
        return;
    }

    try {
        const newJob = await prisma.jobPosting.create({
            data: {
                title: job.title,
                description: job.description,
                company: job.company,
                location: job.location,
                type: job.type,
                category: job.category,
                status: job.status,
                salary: job.salary || null,
                postedById: req.userId!, 
            },
        });

        res.status(201).json({id: newJob.id});
    } catch (error) {
        res.status(500).json({
            error: "Internal server error",
        });
        return;
    }
})

//fetch a specific job by ID
router.get("/:id", authMiddleware, async (req, res) => {
    const jobId = req.params.id;

    try {
        const job = await prisma.jobPosting.findUnique({
            where: { id: jobId },
            include: {
                applications: true
            }
        });

        if (!job) {
            res.status(404).json({
                error: "Job not found",
            });
            return;
        }

        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({
            error: "Internal server error",
        });
        return;
    }
})

//update a specific job by ID
router.put("/:id", authMiddleware, async (req, res) => {
    const jobId = req.params.id;
    const job: JobSchema = req.body;

    const parsedData = JobSchema.safeParse(job);
    if (!parsedData.success) {
        res.status(400).json({
            error: "Invalid input",
        });
        return;
    }

    try {
        const existingJob = await prisma.jobPosting.findUnique({
            where: { id: jobId },
        })

        if (!existingJob) {
            res.status(404).json({
                error: "Job not found",
            });
            return;
        }

        const updatedJob = await prisma.jobPosting.update({
            where: { id: jobId },
            data: {
                title: job.title,
                description: job.description,
                company: job.company,
                location: job.location,
                type: job.type,
                category: job.category,
                status: job.status,
                salary: job.salary || null,
            },
        });

        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(500).json({
            error: "Internal server error",
        });
        return;
    }
})

//delete a specific job by ID
router.delete("/:id", authMiddleware, async (req, res) => {
    const jobId = req.params.id;   
    try {
        const existingJob = await prisma.jobPosting.findUnique({
            where: { id: jobId },
        });

        if (!existingJob) {
            res.status(404).json({
                error: "Job not found",
            });
            return;
        }

        const deletedJob = await prisma.jobPosting.delete({
            where: { id: jobId },
        });

        res.status(200).json(deletedJob);
    } catch (error) {
        res.status(500).json({
            error: "Internal server error",
        });
        return;
    }
})


export default router;