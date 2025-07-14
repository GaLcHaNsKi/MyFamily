-- CreateTable
CREATE TABLE "YearlyEvent" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date" DATE NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "YearlyEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "YearlyEvent" ADD CONSTRAINT "YearlyEvent_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
