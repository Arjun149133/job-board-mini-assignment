import { PrismaClient, JobType, JobStatus, JobCategory, ApplicationStatus } from '../generated/prisma';
const prisma = new PrismaClient();

async function main() {
  // Create users
  const user1 = await prisma.user.create({
    data: {
      email: "alice@example.com",
      name: "Alice",
      password: "hashedpassword1", // Ideally use a hash
    }
  });

  const user2 = await prisma.user.create({
    data: {
      email: "bob@example.com",
      name: "Bob",
      password: "hashedpassword2",
    }
  });

  // Create job postings
  const job1 = await prisma.jobPosting.create({
    data: {
      title: "Frontend Developer",
      description: "Build amazing UIs with React.",
      company: "TechCorp",
      location: "Remote",
      type: JobType.REMOTE,
      category: JobCategory.FULL_TIME,
      status: JobStatus.OPEN,
      salary: "12 LPA",
      requirements: "3+ years experience with React",
      responsibilities: "Develop UI components",
      skills: "React, TypeScript, HTML, CSS",
      postedById: user1.id
    }
  });

  const job2 = await prisma.jobPosting.create({
    data: {
      title: "Backend Developer",
      description: "Work with Node.js and PostgreSQL.",
      company: "DevWorks",
      location: "Bangalore",
      type: JobType.ONSITE,
      category: JobCategory.CONTRACT,
      status: JobStatus.OPEN,
      salary: "15 LPA",
      requirements: "5+ years Node.js",
      responsibilities: "Build backend APIs",
      skills: "Node.js, PostgreSQL, Prisma",
      postedById: user2.id
    }
  });

  // Create job applications
  await prisma.jobApplication.create({
    data: {
      jobPostingId: job1.id,
      userId: user2.id,
      status: ApplicationStatus.APPLIED,
      resume: "https://example.com/resume-bob.pdf",
      coverLetter: "I am excited about this opportunity."
    }
  });

  await prisma.jobApplication.create({
    data: {
      jobPostingId: job2.id,
      userId: user1.id,
      status: ApplicationStatus.INTERVIEWED,
      resume: "https://example.com/resume-alice.pdf",
      coverLetter: "Looking forward to working with you."
    }
  });

  console.log("Seeding complete ✅");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
