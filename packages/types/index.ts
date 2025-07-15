import z, { email } from "zod";

export const UserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long."),
    name: z.string().optional(),
})

export const JobSchema = z.object({
    title: z.string().min(1, "Title is required."),
    description: z.string().min(1, "Description is required."),
    company: z.string().min(1, "Company name is required."),
    location: z.string().min(1, "Location is required."),
    category: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "FREELANCE", "TEMPORARY", "VOLUNTEER", "OTHER"]).default("FULL_TIME"),
    type: z.enum(["REMOTE", "ONSITE", "HYBRID"]).default("REMOTE"),
    status: z.enum(["OPEN", "CLOSED", "PENDING", "FILLED"]).default("OPEN"),
    salary: z.string().optional(),
});

export const ApplicationSchema = z.object({
    jobPostingId: z.string().min(1, "Job Posting ID is required."),
    resume: z.string().optional(),
    coverLetter: z.string().optional(),
    status: z.enum(["APPLIED", "INTERVIEWED", "HIRED", "REJECTED"]).default("APPLIED"),
})

//export type of UserSchema and JobSchema
export type UserSchema = z.infer<typeof UserSchema>;
export type JobSchema = z.infer<typeof JobSchema>;
export type ApplicationSchema = z.infer<typeof ApplicationSchema>;