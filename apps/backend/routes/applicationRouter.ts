import { Router } from "express";
import { prisma } from "@repo/store/client";
import { authMiddleware } from "../middleware";
import { ApplicationSchema } from "@repo/types/types";

const router = Router();

// get all the applications for a given jobId
router.get("/", authMiddleware, async (req, res) => {
    const jobId = req.query.jobId as string;

    if (!jobId) {
        res.status(400).json({
            error: "Job ID is required",
        });
        return;
    }

    try {
        const jobInDb = await prisma.jobPosting.findUnique({
        where: {
            id: jobId,
        }
        })

        if (!jobInDb) {
            res.status(404).json({
                error: "Job not found",
            });
            return;
        }

        if (req.userId !== jobInDb.postedById) {
            res.status(403).json({
                error: "Forbidden",
            });
            return;
        }

        const applications = await prisma.jobApplication.findMany({
            where: {
                jobPostingId: jobId,
            }
        })

        res.status(200).json(applications);        
    } catch (error) {
        res.status(500).json({
            error: "Internal server error",
        });
        return;
        
    }
})

// get all the applications applied by the given userId
router.get("/user", authMiddleware, async (req, res) => {
    try {
        const applications = await prisma.jobApplication.findMany({
            where: {
                userId: req.userId!,
            },
            include: {
                user: true,
                jobPosting: true,
            }
        });

        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({
            error: "Internal server error",
        });
        return;
    }
})

// create a new application for a job
router.post("/", authMiddleware, async (req, res) => {
    const jobApplication = req.body;

    const parsedData = ApplicationSchema.safeParse(jobApplication);
    if (!parsedData.success) {
        res.status(400).json({
            error: "Invalid input",
        });
        return;
    }

    try {
        const jobInDb = await prisma.jobPosting.findUnique({
            where: {
                id: parsedData.data.jobPostingId,
            }
        })

        if (!jobInDb) {
            res.status(404).json({
                error: "Job not found",
            });
            return;
        }

        if (req.userId === jobInDb.postedById) {
            res.status(403).json({
                error: "You cannot apply to your own job",
            });
            return;
        }

        //already applied to this job
        const existingApplication = await prisma.jobApplication.findFirst({
            where: {
                jobPostingId: parsedData.data.jobPostingId,
                userId: req.userId!,
            }
        })

        if (existingApplication) {
            res.status(400).json({
                error: "You have already applied to this job",
            });
            return;
        }

        const newApplication = await prisma.jobApplication.create({
            data: {
                jobPostingId: parsedData.data.jobPostingId,
                userId: req.userId!,
                resume: parsedData.data.resume || null,
                coverLetter: parsedData.data.coverLetter || null,
                status: parsedData.data.status,
            },
        });

        res.status(201).json({
            id: newApplication.id,
        });        
    } catch (error) {
        res.status(500).json({
            error: "Internal server error",
        });
        return;        
    }

    
})

// get a specific application by ID
router.get("/:id", authMiddleware, async (req, res) => {
    const applicationId = await req.params.id;

    try {
        const application = await prisma.jobApplication.findUnique({
            where: { id: applicationId },
            include: {
                jobPosting: true,
                user: true,
            }
        });

        if (!application) {
            res.status(404).json({
                error: "Application not found",
            });
            return;
        }

        if (req.userId !== application.userId && req.userId !== application.jobPosting.postedById) {
            res.status(403).json({
                error: "Forbidden",
            });
            return;
        }

        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({
            error: "Internal server error",
        });
        return;
    }
})

//delete application
router.delete("/:id", authMiddleware, async (req, res) => {
    const applicationId = req.params.id;

    try {
        const application = await prisma.jobApplication.findUnique({
            where: { id: applicationId },
            include: {
                jobPosting: true,
            }
        });

        if (!application) {
            res.status(404).json({
                error: "Application not found",
            });
            return;
        }

        if (req.userId !== application.userId && req.userId !== application.jobPosting.postedById) {
            res.status(403).json({
                error: "Forbidden",
            });
            return;
        }

        await prisma.jobApplication.delete({
            where: { id: applicationId },
        });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            error: "Internal server error",
        });
        return;
    }
})

export default router;